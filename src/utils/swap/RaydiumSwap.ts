import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Transaction,
  VersionedTransaction,
  TransactionMessage,
} from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import {
  Liquidity,
  Token,
  TokenAmount,
  TOKEN_PROGRAM_ID,
  Percent,
  LiquidityPoolKeysV4,
  TokenAccount,
  SPL_ACCOUNT_LAYOUT,
  jsonInfo2PoolKeys,
  TxVersion,
} from "@raydium-io/raydium-sdk";

interface PoolInfo {
  baseReserve: BN;
  quoteReserve: BN;
  baseDecimals: number;
  quoteDecimals: number;
  baseMint: PublicKey;
  quoteMint: PublicKey;
}

async function fetchPoolInfo(
  connection: Connection,
  poolId: PublicKey
): Promise<PoolInfo> {
  const poolData = await fetchPoolsData(poolId.toString());

  if (!poolData) {
    throw new Error(`Pool ${poolId.toString()} not found`);
  }

  // Convert amounts based on decimals
  const baseDecimals = poolData.mintA.decimals;
  const quoteDecimals = poolData.mintB.decimals;
  const baseReserve = new BN(
    Math.floor(poolData.mintAmountA * Math.pow(10, baseDecimals))
  );
  const quoteReserve = new BN(
    Math.floor(poolData.mintAmountB * Math.pow(10, quoteDecimals))
  );

  return {
    baseReserve,
    quoteReserve,
    baseDecimals,
    quoteDecimals,
    baseMint: new PublicKey(poolData.mintA.address),
    quoteMint: new PublicKey(poolData.mintB.address),
  };
}

async function calculateSwapAmount(
  connection: Connection,
  poolId: PublicKey,
  inputMint: PublicKey,
  outputMint: PublicKey,
  amount: number,
  slippageTolerance: number = 0.5 // 0.5%
): Promise<{
  amountOut: number;
  minAmountOut: number;
  priceImpact: number;
}> {
  console.log({
    connection,
    poolId,
    inputMint,
    outputMint,
    amount,
    slippageTolerance,
  });

  const poolInfo = await fetchPoolInfo(connection, poolId);

  console.log({ poolInfo });

  // Determine if we're swapping base to quote or quote to base
  const isBaseToQuote = inputMint.equals(poolInfo.baseMint);

  const inputDecimals = isBaseToQuote
    ? poolInfo.baseDecimals
    : poolInfo.quoteDecimals;
  const outputDecimals = isBaseToQuote
    ? poolInfo.quoteDecimals
    : poolInfo.baseDecimals;

  const inputReserve = isBaseToQuote
    ? poolInfo.baseReserve
    : poolInfo.quoteReserve;
  const outputReserve = isBaseToQuote
    ? poolInfo.quoteReserve
    : poolInfo.baseReserve;

  // Convert input amount to raw amount (considering decimals)
  const rawInputAmount = new BN(amount * Math.pow(10, inputDecimals));

  // Calculate output amount using constant product formula (x * y = k)
  const k = inputReserve.mul(outputReserve);
  const newInputReserve = inputReserve.add(rawInputAmount);
  const newOutputReserve = k.div(newInputReserve);
  const rawOutputAmount = outputReserve.sub(newOutputReserve);

  // Convert raw amounts to decimal amounts
  const outputAmount =
    rawOutputAmount.toNumber() / Math.pow(10, outputDecimals);
  const minOutputAmount = outputAmount * (1 - slippageTolerance / 100);

  // Calculate price impact
  const priceImpact =
    (rawOutputAmount.toNumber() / outputReserve.toNumber() - 1) * 100;

  return {
    amountOut: outputAmount,
    minAmountOut: minOutputAmount,
    priceImpact: Math.abs(priceImpact),
  };
}

// Cache for pool data
let poolsCache: Map<string, any> = new Map();
let lastFetchTime: Map<string, number> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchPoolsData(poolId: string) {
  const now = Date.now();
  if (poolsCache.has(poolId) && lastFetchTime.has(poolId)) {
    const lastFetch = lastFetchTime.get(poolId)!;
    if (now - lastFetch < CACHE_DURATION) {
      return poolsCache.get(poolId);
    }
  }

  try {
    const response = await fetch(
      `https://api-v3.raydium.io/pools/info/ids?ids=${poolId}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch pool data: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success || !result.data || result.data.length === 0) {
      throw new Error(`Pool ${poolId} not found`);
    }

    const poolData = result.data[0];
    poolsCache.set(poolId, poolData);
    lastFetchTime.set(poolId, now);

    return poolData;
  } catch (error) {
    console.error("Failed to load pool data:", error);
    throw new Error(`Failed to load Raydium pool data for pool ${poolId}`);
  }
}

async function getPoolKeys(poolId: PublicKey): Promise<any> {
  const poolData = await fetchPoolsData(poolId.toString());

  if (!poolData) {
    throw new Error(`Pool ${poolId.toString()} not found in Raydium pools`);
  }

  // Convert pool data to pool keys format
  return {
    id: new PublicKey(poolData.id),
    baseMint: new PublicKey(poolData.mintA.address),
    quoteMint: new PublicKey(poolData.mintB.address),
    programId: new PublicKey(poolData.programId),
    // Add other necessary pool key fields based on your needs
  };
}

async function executeSwap(
  connection: Connection,
  wallet: any,
  poolId: PublicKey,
  inputMint: PublicKey,
  outputMint: PublicKey,
  amount: number,
  slippageTolerance: number = 0.5,
  useVersionedTx: boolean = false
): Promise<string> {
  if (!wallet?.publicKey || !wallet?.signTransaction) {
    throw new Error("Wallet not connected properly");
  }

  try {
    // 1. Get pool data and validate
    const poolData = await fetchPoolsData(poolId.toString());
    if (!poolData) {
      throw new Error("Invalid pool");
    }

    // 2. Create pool keys from API data with all required properties
    const poolKeys: LiquidityPoolKeysV4 = {
      id: new PublicKey(poolData.id),
      baseMint: new PublicKey(poolData.mintA.address),
      quoteMint: new PublicKey(poolData.mintB.address),
      lpMint: new PublicKey(poolData.lpMint.address),
      programId: new PublicKey(poolData.programId),
      // For Standard pools, we need to derive these values
      authority: PublicKey.findProgramAddressSync(
        [Buffer.from("Raydium")],
        new PublicKey(poolData.programId)
      )[0],
      baseVault: PublicKey.findProgramAddressSync(
        [
          new PublicKey(poolData.id).toBuffer(),
          new PublicKey(poolData.mintA.address).toBuffer(),
          Buffer.from("base_vault"),
        ],
        new PublicKey(poolData.programId)
      )[0],
      quoteVault: PublicKey.findProgramAddressSync(
        [
          new PublicKey(poolData.id).toBuffer(),
          new PublicKey(poolData.mintB.address).toBuffer(),
          Buffer.from("quote_vault"),
        ],
        new PublicKey(poolData.programId)
      )[0],
      baseDecimals: poolData.mintA.decimals,
      quoteDecimals: poolData.mintB.decimals,
      lpDecimals: poolData.lpMint.decimals,
      version: 4,
      marketId: new PublicKey(poolData.marketId),
      marketProgramId: new PublicKey(
        "srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX"
      ), // OpenBook program ID
      marketAuthority: PublicKey.findProgramAddressSync(
        [new PublicKey(poolData.marketId).toBuffer()],
        new PublicKey("srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX")
      )[0],
      lookupTableAccount: PublicKey.default,
      // Additional required fields for Standard pools
      openOrders: PublicKey.findProgramAddressSync(
        [new PublicKey(poolData.id).toBuffer(), Buffer.from("open_orders")],
        new PublicKey(poolData.programId)
      )[0],
      targetOrders: PublicKey.findProgramAddressSync(
        [new PublicKey(poolData.id).toBuffer(), Buffer.from("target_orders")],
        new PublicKey(poolData.programId)
      )[0],
      withdrawQueue: PublicKey.findProgramAddressSync(
        [new PublicKey(poolData.id).toBuffer(), Buffer.from("withdraw_queue")],
        new PublicKey(poolData.programId)
      )[0],
      lpVault: PublicKey.findProgramAddressSync(
        [new PublicKey(poolData.id).toBuffer(), Buffer.from("lp_vault")],
        new PublicKey(poolData.programId)
      )[0],
      marketVersion: 3,
      // These will be derived from the market
      marketBaseVault: PublicKey.default,
      marketQuoteVault: PublicKey.default,
      marketBids: PublicKey.default,
      marketAsks: PublicKey.default,
      marketEventQueue: PublicKey.default,
    };

    // 3. Setup tokens with proper decimals
    const isBaseToQuote = inputMint.toString() === poolData.mintA.address;
    const inputToken = new Token(
      TOKEN_PROGRAM_ID,
      inputMint,
      isBaseToQuote ? poolData.mintA.decimals : poolData.mintB.decimals
    );
    const outputToken = new Token(
      TOKEN_PROGRAM_ID,
      outputMint,
      isBaseToQuote ? poolData.mintB.decimals : poolData.mintA.decimals
    );

    // 4. Create amount in with proper decimal handling
    const amountIn = new TokenAmount(
      inputToken,
      new BN(Math.floor(amount * Math.pow(10, inputToken.decimals)))
    );

    // 5. Calculate minimum amount out based on slippage
    const slippagePercent = new Percent(
      Math.floor(slippageTolerance * 100),
      10000
    ); // Convert to basis points

    // 6. Get pool info for amount out calculation
    const poolInfo = await Liquidity.fetchInfo({
      connection,
      poolKeys,
    });

    // 7. Calculate expected amount out
    const { amountOut, minAmountOut } = Liquidity.computeAmountOut({
      poolKeys,
      poolInfo,
      amountIn,
      currencyOut: outputToken,
      slippage: slippagePercent,
    });

    // 8. Get user token accounts
    const tokenAccounts = await connection.getTokenAccountsByOwner(
      wallet.publicKey,
      { programId: TOKEN_PROGRAM_ID }
    );

    if (!tokenAccounts.value.length) {
      throw new Error("No token accounts found for the wallet");
    }

    const formattedTokenAccounts: TokenAccount[] = tokenAccounts.value.map(
      ({ pubkey, account }) => ({
        pubkey,
        programId: TOKEN_PROGRAM_ID,
        accountInfo: SPL_ACCOUNT_LAYOUT.decode(account.data),
      })
    );

    // 9. Create swap instruction
    const { innerTransactions } = await Liquidity.makeSwapInstructionSimple({
      connection,
      poolKeys,
      userKeys: {
        tokenAccounts: formattedTokenAccounts,
        owner: wallet.publicKey,
      },
      amountIn,
      amountOut: minAmountOut, // Use calculated minAmountOut instead of null
      fixedSide: "in",
      makeTxVersion: useVersionedTx ? TxVersion.V0 : TxVersion.LEGACY,
      computeBudgetConfig: {
        microLamports: 5000,
        units: 200000,
      },
    });

    if (!innerTransactions?.[0]?.instructions) {
      throw new Error("Failed to create swap instructions");
    }

    // 10. Create and send transaction
    let signature: string;

    if (useVersionedTx) {
      // Handle versioned transaction
      const messageV0 = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
        instructions: innerTransactions[0].instructions,
      }).compileToV0Message();

      const transaction = new VersionedTransaction(messageV0);
      signature = await wallet.signAndSendTransaction(transaction);
    } else {
      // Handle legacy transaction
      const transaction = new Transaction();

      for (const innerTx of innerTransactions) {
        for (const instruction of innerTx.instructions) {
          if (instruction) {
            transaction.add(instruction);
          }
        }
      }

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      signature = await wallet.sendTransaction(transaction, connection);
    }

    // 11. Confirm transaction
    const confirmation = await connection.confirmTransaction({
      signature,
      blockhash: (await connection.getLatestBlockhash()).blockhash,
      lastValidBlockHeight: (
        await connection.getLatestBlockhash()
      ).lastValidBlockHeight,
    });

    if (confirmation.value.err) {
      throw new Error(`Transaction failed: ${confirmation.value.err}`);
    }

    return signature;
  } catch (error) {
    console.error("Swap execution failed:", error);
    throw error;
  }
}

// Example usage with proper error handling
const swapSolana = async (
  connection: Connection,
  wallet: any,
  poolId: string,
  inputMint: string,
  outputMint: string,
  amount: number,
  simulate: boolean = false,
  useVersionedTx: boolean = false
): Promise<any> => {
  try {
    if (
      !connection ||
      !wallet ||
      !poolId ||
      !inputMint ||
      !outputMint ||
      !amount
    ) {
      throw new Error("Missing required parameters for swap");
    }

    // Validate inputs
    const poolIdPubkey = new PublicKey(poolId);
    const inputMintPubkey = new PublicKey(inputMint);
    const outputMintPubkey = new PublicKey(outputMint);

    // First get the swap calculation
    const calculation = await calculateSwapAmount(
      connection,
      poolIdPubkey,
      inputMintPubkey,
      outputMintPubkey,
      amount
    );

    console.log({ calculation });

    // If simulation only, return the calculation
    if (simulate) {
      return {
        ...calculation,
        success: true,
        simulated: true,
      };
    }

    // Execute the actual swap
    const signature = await executeSwap(
      connection,
      wallet,
      poolIdPubkey,
      inputMintPubkey,
      outputMintPubkey,
      amount,
      0.5, // slippage tolerance
      useVersionedTx
    );

    return {
      ...calculation,
      signature,
      success: true,
      simulated: false,
    };
  } catch (error: any) {
    console.error("Swap failed:", error);
    return {
      success: false,
      error: error.message || "Unknown error occurred during swap",
      details: error,
    };
  }
};

export { calculateSwapAmount, fetchPoolInfo, swapSolana };
