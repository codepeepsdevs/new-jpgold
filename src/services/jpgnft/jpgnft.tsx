/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AnchorProvider,
  BN,
  BorshCoder,
  EventParser,
  Program,
  Wallet,
} from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import idl from "./jpgnft.idl.json";
import { NftManager } from "./jpgnft.types";
import { getClusterURL } from "@/utils/utilityFunctions";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  transfer,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

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

// interface FractionalizeNFTArgs {
//   discriminant: BN;
//   part_a: {
//     name: string;
//     symbol: string;
//     uri: string;
//     weight: BN;
//   };
//   part_b: {
//     name: string;
//     symbol: string;
//     uri: string;
//     weight: BN;
//   };
// }

/**
 * Fractionalizes an NFT and finalizes the fractionalization.
 */
export const fractionalizeNft = async (
  program: Program<any>,
  discriminant: BN,
  fractionalizeArgs: any
): Promise<string> => {
  if (!program.provider.publicKey) {
    throw new Error("Wallet not connected");
  }

  const signer = program.provider.publicKey;

  console.log("Fractionalizing NFT with discriminant:", discriminant.toString());

  try {
    // Step 1: Fractionalize the NFT
    const fractionalizeSignature = await program.methods
      .fractionalizeNft(fractionalizeArgs)
      .accounts({
        signer,
      })
      .rpc();

    console.log("NFT fractionalized:", fractionalizeSignature);

    // Step 2: Finalize the fractionalization
    const finalizeSignature = await program.methods
      .finalizeFractionalizeNft(discriminant)
      .accounts({
        signer,
      })
      .rpc();

    console.log("Fractionalization finalized:", finalizeSignature);

    return finalizeSignature;
  } catch (error) {
    console.error("Error in NFT fractionalization process:", error);
    throw error;
  }
};

export const transferNft = async (
  program: Program<NftManager>,
  mintAddress: string,
  recipientAddress: string
): Promise<{
  txSignature: string;
  mint: string;
}> => {
  if (!program.provider.publicKey) {
    throw new Error("Wallet not connected");
  }

  const signer = program.provider.publicKey;
  const connection = program.provider.connection;

  try {
    console.log(`Transferring NFT ${mintAddress} to ${recipientAddress}`);

    // Create PublicKeys
    const mintPubkey = new PublicKey(mintAddress);
    const recipientPubkey = new PublicKey(recipientAddress);

    // Get the user's associated token address for this NFT
    const sourceATA = await getAssociatedTokenAddress(
      mintPubkey,
      signer,
      false, // allowOwnerOffCurve
      TOKEN_2022_PROGRAM_ID // Using Token-2022 program like the backend
    );

    // Create or get the destination token account for recipient
    const destinationATA = await getOrCreateAssociatedTokenAccount(
      connection,
      program.provider as any, // Need sender to pay for account creation if needed
      mintPubkey,
      recipientPubkey,
      false, // allowOwnerOffCurve
      "confirmed", // commitment
      undefined, // confirmOptions
      TOKEN_2022_PROGRAM_ID
    );

    console.log("Source token account:", sourceATA.toString());
    console.log(
      "Destination token account:",
      destinationATA.address.toString()
    );

    // Execute the transfer
    const txSignature = await transfer(
      connection,
      program.provider as any, // Provider needs to have the signTransaction method
      sourceATA,
      destinationATA.address,
      signer,
      1, // NFTs have amount=1
      [],
      undefined,
      TOKEN_2022_PROGRAM_ID
    );

    console.log("NFT transfer successful:", txSignature);

    return {
      txSignature,
      mint: mintAddress,
    };
  } catch (error) {
    console.error("Error in NFT minting process:", error);
    throw error;
  }
};
