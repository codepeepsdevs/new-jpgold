import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
  TransactionMessage,
} from "@solana/web3.js";
import {
  Liquidity,
  LiquidityPoolKeys,
  jsonInfo2PoolKeys,
  LiquidityPoolJsonInfo,
  TokenAccount,
  Token,
  TokenAmount,
  TOKEN_PROGRAM_ID,
  Percent,
  SPL_ACCOUNT_LAYOUT,
} from "@raydium-io/raydium-sdk";
import fs from "fs";
import path from "path";

import { fileOpen, fileSave } from "browser-fs-access";

/**
 * Interface for wallet adapters
 */
export interface WalletAdapterRaydium {
  publicKey: PublicKey;
  payer?: PublicKey;
  signTransaction(
    transaction: Transaction | VersionedTransaction
  ): Promise<Transaction | VersionedTransaction>;
  sendTransaction?(
    transaction: Transaction | VersionedTransaction
  ): Promise<string>;
}

/**
 * Class representing a Raydium Swap operation.
 */
class RaydiumSwap {
  allPoolKeysJson: LiquidityPoolJsonInfo[] = [
    {
      id: "58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2",
      baseMint: "So11111111111111111111111111111111111111112",
      quoteMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      lpMint: "8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu",
      baseDecimals: 9,
      quoteDecimals: 6,
      lpDecimals: 9,
      version: 4,
      programId: "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8",
      authority: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
      openOrders: "HmiHHzq4Fym9e1D4qzLS6LDDM3tNsCTBPDWHTLZ763jY",
      targetOrders: "CZza3Ej4Mc58MnxWA385itCC9jCo3L1D7zc3LKy1bZMR",
      baseVault: "DQyrAcCrDXQ7NeoqGgDCZwBvWDcYmFCjSb9JtteuvPpz",
      quoteVault: "HLmqeL62xR1QoZ1HKKbXRrdN1p3phKpxRMb2VVopvBBz",
      withdrawQueue: "11111111111111111111111111111111",
      lpVault: "11111111111111111111111111111111",
      marketVersion: 4,
      marketProgramId: "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX",
      marketId: "8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6",
      marketAuthority: "CTz5UMLQm2SRWHzQnU62Pi4yJqbNGjgRBHqqp6oDHfF7",
      marketBaseVault: "CKxTHwM9fPMRRvZmFnFoqKNd9pQR21c5Aq9bh5h9oghX",
      marketQuoteVault: "6A5NHCj1yF6urc9wZNe6Bcjj4LVszQNj5DwAWG97yzMu",
      marketBids: "5jWUncPNBMZJ3sTHKmMLszypVkoRK6bfEQMQUHweeQnh",
      marketAsks: "EaXdHx7x3mdGA38j5RSmKYSXMzAFzzUXCLNBEDXDn1d5",
      marketEventQueue: "8CvwxZ9Db6XbLD46NZwwmVDZZRDy7eydFcAGkXKh9axa",
      // lookupTableAccount: "3q8sZGGpPESLxurJjNmr7s7wcKS5RPCCHMagbuHP9U2W",
    },
  ];
  connection: Connection;
  wallet: WalletAdapterRaydium;

  /**
   * Create a RaydiumSwap instance.
   * @param {string} RPC_URL - The RPC URL for connecting to the Solana blockchain.
   * @param {WalletAdapter} wallet - The connected wallet adapter from frontend.
   */
  constructor(RPC_URL: string, wallet: WalletAdapterRaydium) {
    this.connection = new Connection(RPC_URL, { commitment: "confirmed" });
    this.wallet = wallet;
  }

  // constructor(wallet: WalletAdapterRaydium & { connection?: Connection }) {
  //   if (!wallet.connection) {
  //     throw new Error("Wallet adapter must provide a connection");
  //   }

  //   this.connection = wallet.connection;
  //   this.wallet = wallet;
  // }

  /**
   * Loads all the pool keys available from a JSON configuration file.
   * @async
   * @returns {Promise<void>}
   */
  // async loadPoolKeys(liquidityFile: string) {
  //   let liquidityJson;
  //   if (liquidityFile.startsWith("http")) {
  //     const liquidityJsonResp = await fetch(liquidityFile);
  //     if (!liquidityJsonResp.ok) return;
  //     liquidityJson = await liquidityJsonResp.json();
  //   } else {
  //     liquidityJson = JSON.parse(
  //       fs.readFileSync(path.join(__dirname, liquidityFile), "utf-8")
  //     );
  //   }
  //   const allPoolKeysJson = [
  //     ...(liquidityJson?.official ?? []),
  //     ...(liquidityJson?.unOfficial ?? []),
  //   ];

  //   this.allPoolKeysJson = allPoolKeysJson;
  // }

  async loadPoolKeys(liquidityFile: string) {
    let liquidityJson;

    if (liquidityFile.startsWith("http")) {
      // Remote file case (unchanged)
      const response = await fetch(liquidityFile);
      if (!response.ok) return;
      liquidityJson = await response.json();
    } else {
      try {
        // Local file case using browser-fs-access
        const blob = await fileOpen({
          mimeTypes: ["application/json"],
          extensions: [".json"],
          description: "Raydium Pool Data",
        });

        // Read the file contents
        liquidityJson = JSON.parse(await blob.text());

        // Optional: Save the file handle for future use
        if ("showSaveFilePicker" in window) {
          // Save a reference to the file for faster future access
          localStorage.setItem(
            "lastPoolFileHandle",
            JSON.stringify({
              name: blob.name,
              lastModified: blob.lastModified,
            })
          );
        }
      } catch (error) {
        console.error("File open cancelled or failed:", error);
        return;
      }
    }

    this.allPoolKeysJson = [
      ...(liquidityJson?.official ?? []),
      ...(liquidityJson?.unOfficial ?? []),
    ];
  }

  /**
   * Finds pool information for the given token pair.
   * @param {string} mintA - The mint address of the first token.
   * @param {string} mintB - The mint address of the second token.
   * @returns {LiquidityPoolKeys | null} The liquidity pool keys if found, otherwise null.
   */
  findPoolInfoForTokens(mintA: string, mintB: string) {
    const poolData = this.allPoolKeysJson.find(
      (i) =>
        (i.baseMint === mintA && i.quoteMint === mintB) ||
        (i.baseMint === mintB && i.quoteMint === mintA)
    );

    if (!poolData) return null;

    return jsonInfo2PoolKeys(poolData) as LiquidityPoolKeys;
  }

  /**
   * Retrieves token accounts owned by the wallet.
   * @async
   * @returns {Promise<TokenAccount[]>} An array of token accounts.
   */
  async getOwnerTokenAccounts() {
    if (!this.wallet.publicKey) {
      throw new Error("Wallet not connected");
    }

    const walletTokenAccount = await this.connection.getTokenAccountsByOwner(
      this.wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );

    return walletTokenAccount.value.map((i) => ({
      pubkey: i.pubkey,
      programId: i.account.owner,
      accountInfo: SPL_ACCOUNT_LAYOUT.decode(i.account.data),
    }));
  }

  /**
   * Builds a swap transaction.
   * @async
   * @param {string} toToken - The mint address of the token to receive.
   * @param {number} amount - The amount of the token to swap.
   * @param {LiquidityPoolKeys} poolKeys - The liquidity pool keys.
   * @param {number} [maxLamports=100000] - The maximum lamports to use for transaction fees.
   * @param {boolean} [useVersionedTransaction=true] - Whether to use a versioned transaction.
   * @param {'in' | 'out'} [fixedSide='in'] - The fixed side of the swap ('in' or 'out').
   * @returns {Promise<Transaction | VersionedTransaction>} The constructed swap transaction.
   */
  async getSwapTransaction(
    toToken: string,
    amount: number,
    poolKeys: LiquidityPoolKeys,
    maxLamports: number = 100000,
    useVersionedTransaction = true,
    fixedSide: "in" | "out" = "in"
  ): Promise<Transaction | VersionedTransaction> {
    if (!this.wallet.publicKey) {
      throw new Error("Wallet not connected");
    }

    const directionIn = poolKeys.quoteMint.toString() == toToken;
    const { minAmountOut, amountIn } = await this.calcAmountOut(
      poolKeys,
      amount,
      directionIn
    );
    console.log({ minAmountOut, amountIn });
    const userTokenAccounts = await this.getOwnerTokenAccounts();
    const swapTransaction = await Liquidity.makeSwapInstructionSimple({
      connection: this.connection,
      makeTxVersion: useVersionedTransaction ? 0 : 1,
      poolKeys: {
        ...poolKeys,
      },
      userKeys: {
        tokenAccounts: userTokenAccounts,
        owner: this.wallet.publicKey,
      },
      amountIn: amountIn,
      amountOut: minAmountOut,
      fixedSide: fixedSide,
      config: {
        bypassAssociatedCheck: false,
      },
      computeBudgetConfig: {
        microLamports: maxLamports,
      },
    });

    const recentBlockhashForSwap = await this.connection.getLatestBlockhash();
    const instructions =
      swapTransaction.innerTransactions[0].instructions.filter(Boolean);

    if (useVersionedTransaction) {
      const versionedTransaction = new VersionedTransaction(
        new TransactionMessage({
          payerKey: this.wallet.publicKey,
          recentBlockhash: recentBlockhashForSwap.blockhash,
          instructions: instructions,
        }).compileToV0Message()
      );

      // Sign transaction with wallet
      return await this.wallet.signTransaction(versionedTransaction);
    }

    const legacyTransaction = new Transaction({
      blockhash: recentBlockhashForSwap.blockhash,
      lastValidBlockHeight: recentBlockhashForSwap.lastValidBlockHeight,
      feePayer: this.wallet.publicKey,
    });

    legacyTransaction.add(...instructions);

    // Sign transaction with wallet
    return await this.wallet.signTransaction(legacyTransaction);
  }

  /**
   * Sends a versioned transaction.
   * @async
   * @param {VersionedTransaction} tx - The versioned transaction to send.
   * @returns {Promise<string>} The transaction ID.
   */
  async sendVersionedTransaction(
    tx: VersionedTransaction,
    maxRetries?: number
  ) {
    const txid = await this.connection.sendTransaction(tx, {
      skipPreflight: true,
      maxRetries: maxRetries,
    });

    return txid;
  }

  /**
   * Simulates a versioned transaction.
   * @async
   * @param {VersionedTransaction} tx - The versioned transaction to simulate.
   * @returns {Promise<any>} The simulation result.
   */
  async simulateLegacyTransaction(tx: Transaction) {
    // Convert legacy transaction to versioned transaction
    const versionedTx = new VersionedTransaction(
      new TransactionMessage({
        payerKey: this.wallet.publicKey,
        recentBlockhash: tx.recentBlockhash!,
        instructions: tx.instructions,
      }).compileToV0Message()
    );

    return await this.connection.simulateTransaction(versionedTx);
  }

  /**
   * Sends a legacy transaction.
   * @async
   * @param {Transaction} tx - The transaction to send.
   * @returns {Promise<string>} The transaction ID.
   */
  async sendLegacyTransaction(tx: Transaction, maxRetries?: number) {
    // Create a minimal signer object using the payer or fallback to publicKey
    const signer = {
      publicKey: this.wallet.payer || this.wallet.publicKey,
      secretKey: new Uint8Array(), // Empty since we won't actually use it for signing
    };

    const txid = await this.connection.sendTransaction(
      tx,
      [signer], // Proper Signer array
      {
        skipPreflight: true,
        maxRetries: maxRetries,
      }
    );

    return txid;
  }

  /**
   * Simulates a versioned transaction.
   * @async
   * @param {VersionedTransaction} tx - The versioned transaction to simulate.
   * @returns {Promise<any>} The simulation result.
   */
  async simulateVersionedTransaction(tx: VersionedTransaction) {
    const txid = await this.connection.simulateTransaction(tx);

    return txid;
  }

  /**
   * Sends a transaction using connected wallet or connection.
   * @async
   * @param {Transaction | VersionedTransaction} tx - The transaction to send.
   * @returns {Promise<string>} The transaction ID.
   */
  async sendTransaction(
    tx: Transaction | VersionedTransaction,
    maxRetries?: number
  ) {
    if (this.wallet.sendTransaction) {
      // If wallet adapter has sendTransaction method, use it
      return await this.wallet.sendTransaction(tx);
    } else {
      // Otherwise use connection (this requires transaction to be already signed)
      // return await this.connection.sendTransaction(tx, [], {
      //   skipPreflight: true,
      //   maxRetries: maxRetries,
      // });

      throw new Error("wallet adapter does not support sendTransaction");
    }
  }

  /**
   * Simulates a transaction.
   * @async
   * @param {Transaction | VersionedTransaction} tx - The transaction to simulate.
   * @returns {Promise<any>} The simulation result.
   */
  async simulateTransaction(tx: Transaction | VersionedTransaction) {
    if (tx instanceof Transaction) {
      return await this.connection.simulateTransaction(tx);
    } else {
      return await this.connection.simulateTransaction(tx);
    }
  }

  /**
   * Gets a token account by owner and mint address.
   * @param {PublicKey} mint - The mint address of the token.
   * @returns {TokenAccount} The token account.
   */
  getTokenAccountByOwnerAndMint(mint: PublicKey) {
    return {
      programId: TOKEN_PROGRAM_ID,
      pubkey: PublicKey.default,
      accountInfo: {
        mint: mint,
        amount: 0,
      },
    } as unknown as TokenAccount;
  }

  /**
   * Calculates the amount out for a swap.
   * @async
   * @param {LiquidityPoolKeys} poolKeys - The liquidity pool keys.
   * @param {number} rawAmountIn - The raw amount of the input token.
   * @param {boolean} swapInDirection - The direction of the swap (true for in, false for out).
   * @returns {Promise<Object>} The swap calculation result.
   */
  async calcAmountOut(
    poolKeys: LiquidityPoolKeys,
    rawAmountIn: number,
    swapInDirection: boolean
  ) {
    const poolInfo = await Liquidity.fetchInfo({
      connection: this.connection,
      poolKeys,
    });

    let currencyInMint = poolKeys.baseMint;
    let currencyInDecimals = poolInfo.baseDecimals;
    let currencyOutMint = poolKeys.quoteMint;
    let currencyOutDecimals = poolInfo.quoteDecimals;

    if (!swapInDirection) {
      currencyInMint = poolKeys.quoteMint;
      currencyInDecimals = poolInfo.quoteDecimals;
      currencyOutMint = poolKeys.baseMint;
      currencyOutDecimals = poolInfo.baseDecimals;
    }

    const currencyIn = new Token(
      TOKEN_PROGRAM_ID,
      currencyInMint,
      currencyInDecimals
    );
    const amountIn = new TokenAmount(currencyIn, rawAmountIn, false);
    const currencyOut = new Token(
      TOKEN_PROGRAM_ID,
      currencyOutMint,
      currencyOutDecimals
    );
    const slippage = new Percent(5, 100); // 5% slippage

    const {
      amountOut,
      minAmountOut,
      currentPrice,
      executionPrice,
      priceImpact,
      fee,
    } = Liquidity.computeAmountOut({
      poolKeys,
      poolInfo,
      amountIn,
      currencyOut,
      slippage,
    });

    return {
      amountIn,
      amountOut,
      minAmountOut,
      currentPrice,
      executionPrice,
      priceImpact,
      fee,
    };
  }
}

export default RaydiumSwap;
