/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AnchorProvider,
  BN,
  BorshCoder,
  EventParser,
  Program,
  Wallet,
} from "@coral-xyz/anchor";
import { Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";
import idl from "./jpgnft.idl.json";
import { NftManager } from "./jpgnft.types";
import { getClusterURL } from "@/utils/utilityFunctions";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  transfer,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createTransferInstruction,
  getAccount,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import { sign } from "crypto";

const CLUSTER: string = process.env.NEXT_PUBLIC_CLUSTER || "devnet";
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY;

// Function to get Helius RPC URL based on the cluster
const getHeliusRpcUrl = (cluster: string): string => {
  if (!HELIUS_API_KEY) {
    console.warn("No Helius API key provided, falling back to default RPC");
    return getClusterURL(cluster);
  }

  switch (cluster.toLowerCase()) {
    case "mainnet":
    case "mainnet-beta":
      return `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
    case "devnet":
      return `https://devnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;
    default:
      return getClusterURL(cluster); // Fallback to original function for unsupported networks
  }
};

const RPC_URL: string = getHeliusRpcUrl(CLUSTER);

export const getProvider = (
  publicKey: PublicKey | null,
  signTransaction: any,
  sendTransaction: any
): Program<NftManager> | null => {
  if (!publicKey || !signTransaction) {
    console.error("Wallet not connected or missing signTransaction");
    return null;
  }

  const connection = new Connection(RPC_URL, "confirmed");
  const provider = new AnchorProvider(
    connection,
    { publicKey, signTransaction, sendTransaction } as unknown as Wallet,
    { commitment: "processed" }
  );

  return new Program<NftManager>(idl as any, provider);
};

export const getProviderReadonly = (): Program<NftManager> => {
  const connection = new Connection(RPC_URL, "confirmed");

  const wallet = {
    publicKey: PublicKey.default,
    signTransaction: async () => {
      throw new Error("Read-only provider cannot sign transactions.");
    },
    signAllTransaction: async () => {
      throw new Error("Read-only provider cannot sign transactions.");
    },
  };

  const provider = new AnchorProvider(connection, wallet as unknown as Wallet, {
    commitment: "processed",
  });

  return new Program<NftManager>(idl as any, provider);
};

/**
 * Finalizes an NFT mint using the provided discriminant
 */
export const finalizeMintNft = async (
  program: Program<NftManager>,
  discriminant: BN
): Promise<string> => {
  if (!program.provider.publicKey) {
    throw new Error("Wallet not connected");
  }

  const signer = program.provider.publicKey;

  console.log(
    "Finalizing NFT mint with discriminant:",
    discriminant.toString()
  );

  // Call finalizeMintNft with the extracted discriminant and only the signer account
  const finalizeSignature = await program.methods
    .finalizeMintNft(discriminant)
    .accounts({
      signer,
    })
    .rpc();

  console.log("NFT mint finalized:", finalizeSignature);
  return finalizeSignature;
};

export const mintNft = async (
  program: Program<NftManager>,
  name: string,
  symbol: string,
  uri: string,
  weight: number
): Promise<{
  txSignature: string;
  finalizeSignature: string;
  mint: string;
}> => {
  if (!program.provider.publicKey) {
    throw new Error("Wallet not connected");
  }

  const signer = program.provider.publicKey;
  const goldPriceAddress = process.env.NEXT_PUBLIC_NFT_GOLD_PRICE_ADDRESS;
  const solanaPriceAddress = process.env.NEXT_PUBLIC_NFT_SOLANA_PRICE_ADDRESS;

  if (!goldPriceAddress || !solanaPriceAddress) {
    throw new Error("Price feed addresses not provided");
  }

  const goldPriceUpdate = new PublicKey(goldPriceAddress);
  const solPriceUpdate = new PublicKey(solanaPriceAddress);

  const formattedWeight = weight * 10;

  try {
    // Get the mint instruction
    const mintIx = program.methods
      .mintNft({
        name,
        symbol,
        uri,
        weight: new BN(formattedWeight),
      })
      .accounts({
        goldPriceUpdate,
        solPriceUpdate,
        signer,
      });

    // Send the transaction and get the signature
    const txSignature = await mintIx.rpc();
    console.log("Mint transaction sent:", txSignature);

    // Wait for transaction confirmation and fetch the transaction details
    const connection = program.provider.connection;
    const txInfo = await connection.getTransaction(txSignature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });

    if (!txInfo || !txInfo.meta || !txInfo.meta.logMessages) {
      throw new Error("Failed to get transaction information");
    }

    console.log("Processing transaction logs to extract NftMinted event...");

    // Create an event parser for the program
    const eventParser = new EventParser(
      program.programId,
      new BorshCoder(program.idl)
    );

    // Parse the transaction logs to extract program events
    const events = eventParser.parseLogs(txInfo.meta.logMessages);

    // Find the NftMinted event
    const nftMintedEvent = events.find(
      (event: any) => event.name === "nftMinted"
    );

    if (!nftMintedEvent) {
      throw new Error("NftMinted event not found in transaction logs");
    }

    console.log("Found NftMinted event:", nftMintedEvent);

    // Extract the required information from the event
    const { mint, finalizeData, discriminant } = nftMintedEvent.data;
    console.log("Mint Address:", mint.toString());
    console.log("Finalize Data Address:", finalizeData.toString());
    console.log("Discriminant:", discriminant.toString());

    // Call the separated finalize function
    const finalizeSignature = await finalizeMintNft(program, discriminant);

    // Return both transaction signatures and the mint address
    return {
      txSignature,
      finalizeSignature,
      mint: mint.toString(),
    };
  } catch (error) {
    console.error("Error in NFT minting process:", error);
    throw error;
  }
};

export const transferNft = async (
  wallet: {
    publicKey: PublicKey;
    signTransaction: (tx: Transaction) => Promise<Transaction>;
  },
  mintAddress: string,
  recipientAddress: string
): Promise<{
  txSignature: string;
  mint: string;
}> => {
  try {
    console.log(`Transferring NFT ${mintAddress} to ${recipientAddress}`);

    if (!wallet.publicKey) {
      throw new Error("Wallet not connected");
    }
    const connection = new Connection(RPC_URL, "confirmed");

    // Create PublicKeys
    const mintPubkey = new PublicKey(mintAddress);
    const recipientPubkey = new PublicKey(recipientAddress);

    // Determine which token program to use based on the token mint
    let tokenProgramId = TOKEN_PROGRAM_ID; // Default to standard SPL Token program
    let isToken2022 = false;

    // Try to get the token account with both programs to determine which one is correct
    try {
      // First try with standard token program
      const standardTokenATA = await getAssociatedTokenAddress(
        mintPubkey,
        wallet.publicKey,
        false,
        TOKEN_PROGRAM_ID
      );

      try {
        await getAccount(
          connection,
          standardTokenATA,
          "confirmed",
          TOKEN_PROGRAM_ID
        );
        console.log("Using standard TOKEN_PROGRAM_ID for transfer");
        tokenProgramId = TOKEN_PROGRAM_ID;
      } catch (error) {
        // If standard token account not found, try with Token-2022
        console.log("Standard token account not found, trying Token-2022");
        const token2022ATA = await getAssociatedTokenAddress(
          mintPubkey,
          wallet.publicKey,
          false,
          TOKEN_2022_PROGRAM_ID
        );

        await getAccount(
          connection,
          token2022ATA,
          "confirmed",
          TOKEN_2022_PROGRAM_ID
        );
        console.log("Using TOKEN_2022_PROGRAM_ID for transfer");
        isToken2022 = true;
        tokenProgramId = TOKEN_2022_PROGRAM_ID;
      }
    } catch (error) {
      console.error("Error determining token program:", error);
      throw new Error(
        "Could not determine token program. You may not own this NFT or token account not found."
      );
    }

    // Get source ATA (your wallet's token account)
    const sourceATA = await getAssociatedTokenAddress(
      mintPubkey,
      wallet.publicKey,
      false,
      tokenProgramId
    );

    // Get destination ATA (recipient's token account)
    const destinationATA = await getAssociatedTokenAddress(
      mintPubkey,
      recipientPubkey,
      false,
      tokenProgramId
    );

    console.log("Source token account:", sourceATA.toString());
    console.log("Destination token account:", destinationATA.toString());
    console.log("Using token program:", tokenProgramId.toString());

    // Create transaction
    const transaction = new Transaction();

    // Check if the recipient's token account exists, if not create it
    try {
      await getAccount(connection, destinationATA, "confirmed", tokenProgramId);
      console.log("Recipient's token account exists");
    } catch (error) {
      console.log("Creating recipient's token account");
      transaction.add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          destinationATA, // associatedToken
          recipientPubkey, // owner
          mintPubkey, // mint
          tokenProgramId
        )
      );
    }

    // Add transfer instruction
    transaction.add(
      createTransferInstruction(
        sourceATA, // source
        destinationATA, // destination
        wallet.publicKey, // owner
        1, // amount (1 for NFT)
        [], // multiSigners
        tokenProgramId
      )
    );

    // Get latest blockhash
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    // Sign transaction
    const signedTransaction = await wallet.signTransaction(transaction);

    // Send transaction
    const txSignature = await connection.sendRawTransaction(
      signedTransaction.serialize(),
      { skipPreflight: false, preflightCommitment: "confirmed" }
    );

    // Wait for confirmation
    await connection.confirmTransaction(
      {
        blockhash,
        lastValidBlockHeight,
        signature: txSignature,
      },
      "confirmed"
    );

    console.log("NFT transfer successful:", txSignature);

    return {
      txSignature,
      mint: mintAddress,
    };
  } catch (error: any) {
    console.error("Error in NFT transfer process:", error);

    // Provide more specific error messages
    if (error.message?.includes("insufficient funds")) {
      throw new Error("Insufficient funds to transfer NFT");
    } else if (error.message?.includes("owner does not match")) {
      throw new Error("You do not own this NFT");
    } else if (error.message?.includes("TokenAccountNotFoundError")) {
      throw new Error("Token account not found - you may not own this NFT");
    } else {
      throw error;
    }
  }
};
