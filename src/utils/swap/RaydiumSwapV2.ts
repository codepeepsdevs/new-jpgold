import {
  Connection,
  PublicKey,
  VersionedTransaction,
  TransactionMessage,
} from "@solana/web3.js";
import {
  Token,
  TokenAmount,
  Percent,
  LiquidityPoolKeys,
  TokenAccount,
  jsonInfo2PoolKeys,
  TxVersion,
  Currency,
  CurrencyAmount,
  Price,
  ComputeBudgetConfig,
  Raydium,
} from "@raydium-io/raydium-sdk-v2";
import { BN } from "bn.js";
import Decimal from "decimal.js";
import { am } from "@raydium-io/raydium-sdk-v2/lib/api-6a529105";

interface SwapParams {
  poolId: string;
  inputMint: string;
  outputMint: string;
  amount: number;
  slippage?: number;
}

interface SwapResult {
  amountIn: number;
  amountOut: number;
  minAmountOut: number;
  priceImpact: number;
  fee: number;
  executionPrice: number;
  signature?: string;
}

export class RaydiumSwapV2 {
  private static DEFAULT_SLIPPAGE = 1; // 1%
  private static COMPUTE_BUDGET: ComputeBudgetConfig = {
    microLamports: 5000,
    units: 200000,
  };

  private raydium: Raydium | null = null;
  private connection: Connection;
  private wallet: any;

  constructor(connection: Connection, wallet: any) {
    this.connection = connection;
    this.wallet = wallet;
  }

  async initialize() {
    if (this.raydium) return;

    try {
      // Get all token accounts for the wallet

      // Initialize Raydium SDK
      this.raydium = await Raydium.load({
        connection: this.connection,
        owner: this.wallet.publicKey,
      });

      console.log("Raydium SDK initialized successfully");
    } catch (error: any) {
      console.error("Failed to initialize Raydium SDK:", error);
      throw new Error(`Raydium initialization failed: ${error?.message}`);
    }
  }

  async calculateAmounts({
    poolId,
    inputMint,
    outputMint,
    amount,
    slippage = RaydiumSwapV2.DEFAULT_SLIPPAGE,
  }: SwapParams): Promise<SwapResult> {
    console.log({ slippage });

    if (!this.raydium) {
      throw new Error("Raydium SDK not initialized");
    }

    // Fetch pool data
    const data = await this.raydium.api.fetchPoolById({
      ids: poolId,
    });

    if (!data?.[0]) {
      throw new Error(`Pool ${poolId} not found`);
    }

    const pool = data[0];

    // Determine if we're swapping A to B or B to A
    const isAtoB = inputMint === pool.mintA.address;

    // Get input and output token info
    const inputToken = isAtoB ? pool.mintA : pool.mintB;
    const outputToken = isAtoB ? pool.mintB : pool.mintA;

    // Calculate amounts
    const inputDecimals = Math.pow(10, inputToken.decimals);
    const outputDecimals = Math.pow(10, outputToken.decimals);

    console.log({ inputDecimals, outputDecimals });

    const rawAmountIn = amount * inputDecimals;

    // Calculate output amount using pool price and fee rate
    const feeRate = pool.feeRate || 0.0025; // Default fee rate if not provided
    const amountWithFee = rawAmountIn * (1 - feeRate);

    let amountOut;
    if (isAtoB) {
      amountOut = amountWithFee * pool.price;
    } else {
      amountOut = amountWithFee / pool.price;
    }

    // Calculate minimum amount out with slippage
    const minAmountOut = amountOut * (1 - slippage / 100);

    // Calculate price impact
    const priceImpact = Math.abs(
      (amountOut / inputDecimals / (amount * pool.price) - 1) * 100
    );

    // Calculate fee in output token
    const fee = rawAmountIn * feeRate * (isAtoB ? pool.price : 1 / pool.price);

    return {
      amountIn: amount,
      amountOut: amountOut / inputDecimals,
      minAmountOut: minAmountOut / inputDecimals,
      priceImpact,
      fee: fee / inputDecimals,
      executionPrice: isAtoB ? pool.price : 1 / pool.price,
    };
  }

  async executeSwap({
    poolId,
    inputMint,
    outputMint,
    amount,
    slippage = RaydiumSwapV2.DEFAULT_SLIPPAGE,
  }: SwapParams): Promise<SwapResult> {
    if (!this.raydium) {
      throw new Error("Raydium SDK not initialized");
    }

    // First calculate the amounts
    const amountInfo = await this.calculateAmounts({
      poolId,
      inputMint,
      outputMint,
      amount,
      slippage,
    });

    // Fetch pool data
    const data = await this.raydium.api.fetchPoolById({
      ids: poolId,
    });

    if (!data?.[0]) {
      throw new Error(`Pool ${poolId} not found`);
    }

    const pool = data[0];

    // Determine if we're swapping A to B or B to A
    const isAtoB = inputMint === pool.mintA.address;

    // Get input and output token info
    const inputToken = isAtoB ? pool.mintA : pool.mintB;
    const outputToken = isAtoB ? pool.mintB : pool.mintA;

    // Create proper ComputeAmountOutLayout object

    // Owner info for ATA checks
    const ownerInfo = {
      associatedOnly: true,
      checkCreateATAOwner: true,
    };

    console.log({ pool });

    // const poolInfo = await this.raydium.tradeV2.fetchRoutePoolBasicInfo({
    //   amm: new PublicKey(pool.programId),
    //   clmm: new PublicKey(pool.programId),
    //   cpmm: new PublicKey(pool.programId),
    // });

    // console.log({ poolInfo });

    try {
      const txData = await this.raydium.tradeV2.swap({
        swapInfo: {
          amountIn: {
            amount: amountInfo.amountIn as any,
            fee: amountInfo.fee as any,
            expirationTime: pool.rewardDefaultInfos[0].endTime,
          },
          amountOut: {
            amount: amountInfo.amountOut as any,
            fee: amountInfo.fee as any,
            expirationTime: pool.rewardDefaultInfos[0].endTime,
          },
          minAmountOut: {
            amount: amountInfo.minAmountOut as any,
            fee: amountInfo.fee as any,
            expirationTime: pool.rewardDefaultInfos[0].endTime,
          },
          currentPrice: Decimal(amountInfo.executionPrice) as any,
          executionPrice: Decimal(amountInfo.executionPrice) as any,
          priceImpact: Decimal(amountInfo.priceImpact) as any,
          fee: [],
          routeType: "amm",
          poolInfoList: [],
          remainingAccounts: [],
          poolReady: true,
          poolType: "CLMM",

          // feeConfig: {
          //   feeAmount: BN,
          //   feeAccount: PublicKey,
          // },

          expirationTime: pool.rewardDefaultInfos[0].endTime,

          allTrade: true,
          slippage: 1,
          clmmExPriceX64: [],
        },
        ownerInfo,
        computeBudgetConfig: RaydiumSwapV2.COMPUTE_BUDGET,
        routeProgram: new PublicKey(
          "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
        ),
        txVersion: TxVersion.V0,
        feePayer: this.wallet.publicKey,
      });

      // Sign and send the transaction
      // const signature = await this.raydium.txSender.send(
      //   txData,
      //   this.connection,
      //   this.wallet
      // );

      console.log({ txData });

      return {
        ...amountInfo,
        // txData,
        // signature,
      };
    } catch (error: any) {
      console.error("Swap execution failed:", error);
      throw new Error(`Swap execution failed: ${error.message}`);
    }
  }
}
