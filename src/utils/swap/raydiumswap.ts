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
import { BN } from "@coral-xyz/anchor";

/**
 * Class representing a Raydium Swap operation.
 */
class RaydiumSwap {
  private allPoolKeysJson: LiquidityPoolJsonInfo[] = [];
  private readonly connection: Connection;
  private readonly publicKey: PublicKey;

  /**
   * Create a RaydiumSwap instance.
   * @param {string} RPC_URL - The RPC URL for connecting to the Solana blockchain.
   * @param {PublicKey} publicKey - The public key of the connected user's wallet.
   */
  constructor(RPC_URL: string, address: string) {
    this.connection = new Connection(RPC_URL, {
      commitment: "confirmed",
    });
    this.publicKey = new PublicKey(address);
  }

  /**
   * Loads all the pool keys available from a JSON configuration file.
   * @async
   * @returns {Promise<void>}
   */
  async loadPoolKeys(liquidityFile: string) {
    let liquidityJson;
    if (liquidityFile.startsWith("http")) {
      const liquidityJsonResp = await fetch(liquidityFile);
      if (!liquidityJsonResp.ok) return;
      liquidityJson = await liquidityJsonResp.json();
    } else {
      try {
        const response = await fetch(`/${liquidityFile}`);
        if (!response.ok) throw new Error(`Failed to load ${liquidityFile}`);
        liquidityJson = await response.json();
      } catch (error) {
        console.error("Error loading pool keys:", error);
        return;
      }
    }
    const allPoolKeysJson = [
      ...(liquidityJson?.official ?? []),
      ...(liquidityJson?.unOfficial ?? []),
    ];

    console.log("loade json file", allPoolKeysJson);

    this.allPoolKeysJson = allPoolKeysJson;
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
    const walletTokenAccount = await this.connection.getTokenAccountsByOwner(
      this.publicKey,
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
   * @returns {Promise<Transaction | VersionedTransaction>} The unsigned swap transaction.
   */
  async buildSwapTransaction(
    toToken: string,
    amount: number,
    poolKeys: LiquidityPoolKeys,
    maxLamports: number = 100000,
    useVersionedTransaction = true,
    fixedSide: "in" | "out" = "in"
  ): Promise<Transaction | VersionedTransaction> {
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
        owner: this.publicKey,
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
          payerKey: this.publicKey,
          recentBlockhash: recentBlockhashForSwap.blockhash,
          instructions: instructions,
        }).compileToV0Message()
      );

      // Return unsigned transaction - user will sign it
      return versionedTransaction;
    }

    const legacyTransaction = new Transaction({
      blockhash: recentBlockhashForSwap.blockhash,
      lastValidBlockHeight: recentBlockhashForSwap.lastValidBlockHeight,
      feePayer: this.publicKey,
    });

    legacyTransaction.add(...instructions);

    // Return unsigned transaction - user will sign it
    return legacyTransaction;
  }

  /**
   * Sends a signed legacy transaction.
   * @async
   * @param {Transaction} signedTx - The signed transaction to send.
   * @returns {Promise<string>} The transaction ID.
   */
  async sendSignedLegacyTransaction(
    signedTx: Transaction,
    maxRetries?: number
  ) {
    const txid = await this.connection.sendRawTransaction(
      signedTx.serialize(),
      {
        skipPreflight: true,
        maxRetries: maxRetries,
      }
    );

    return txid;
  }

  /**
   * Sends a signed versioned transaction.
   * @async
   * @param {VersionedTransaction} signedTx - The signed versioned transaction to send.
   * @returns {Promise<string>} The transaction ID.
   */
  async sendSignedVersionedTransaction(
    signedTx: VersionedTransaction,
    maxRetries?: number
  ) {
    const txid = await this.connection.sendRawTransaction(
      signedTx.serialize(),
      {
        skipPreflight: true,
        maxRetries: maxRetries,
      }
    );

    return txid;
  }

  /**
   * Simulates a legacy transaction.
   * @async
   * @param {Transaction} tx - The transaction to simulate.
   * @returns {Promise<any>} The simulation result.
   */
  async simulateLegacyTransaction(tx: Transaction) {
    const txid = await this.connection.simulateTransaction(tx);
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

    console.log("poolInfo", poolInfo);
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

  bnToStringWithDecimals(bn: BN, decimals: number): string {
    const divisor = new BN(10).pow(new BN(decimals));
    const whole = bn.div(divisor).toString();
    const fraction = bn.mod(divisor).toString().padStart(decimals, "0");
    // Remove trailing zeroes from fractional part for cleanliness
    return `${whole}.${fraction.replace(/0+$/, "")}`;
  }
}

export default RaydiumSwap;
