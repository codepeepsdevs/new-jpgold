import { CurrencyAmount, Percent, Token, TradeType } from "@uniswap/sdk-core";
import {
  ERC20_ABI,
  QUOTER_CONTRACT_ADDRESS,
  SWAP_ROUTER_ADDRESS,
  UNISWAP_V3_FACTORY_ADDRESS,
  WRAPPED_NATIVE_TOKEN_ABI,
} from "./uniswapContants";
import { BigNumberish, ethers } from "ethers";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import {
  computePoolAddress,
  FeeAmount,
  Pool,
  Route,
  SwapOptions,
  SwapRouter,
  Trade,
} from "@uniswap/v3-sdk";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import {
  AlphaRouter,
  SwapOptionsSwapRouter02,
  SwapType,
} from "@uniswap/smart-order-router";
import { JsonRpcProvider } from "@ethersproject/providers";
import SwapRouterABI from "@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json";

interface QuoteInfo {
  token0: string;
  token1: string;
  fee: number;
  amountOut: string;
  estimatedGasUsedUSD: string;
  estimatedGasUsed: string;
}

interface TokenInfo {
  in: Token;
  amountIn: number;
  out: Token;
  poolFee: number;
  walletAddress: string;
  chainId: number;
}

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: ethers.BigNumberish;
  liquidity: ethers.BigNumberish;
  tick: number;
}

type TokenTrade = Trade<Token, Token, TradeType>;

export enum TransactionState {
  Failed = "Failed",
  New = "New",
  Rejected = "Rejected",
  Sending = "Sending",
  Sent = "Sent",
}

class UniSwap {
  private provider: ethers.providers.Provider | null = null;
  private readonly READABLE_FORM_LEN = 4;
  private readonly RPC_ENDPOINT: string | null = null;
  private readonly walletAddress: string | null = null;
  private readonly MAX_FEE_PER_GAS = 100000000000;
  private readonly MAX_PRIORITY_FEE_PER_GAS = 100000000000;

  constructor(RPC_ENDPOINT: string, address: string) {
    this.RPC_ENDPOINT = RPC_ENDPOINT;
    this.walletAddress = address;
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    this.provider = provider;
  }

  async quote(
    tokens: TokenInfo,
    setLoading: (value: boolean) => void = () => {}
  ): Promise<QuoteInfo | null> {
    try {
      setLoading(true);

      console.log("input tokens", tokens);
      if (!this.provider || !this.RPC_ENDPOINT) {
        console.error("Provider is not available. Please connect your wallet.");
        setLoading(false);
        return null;
      }

      const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        Quoter.abi,
        this.provider
      );

      const poolConstants = await this.getPoolConstants(tokens);

      if (!poolConstants) {
        console.error("Pool constants are not available.");
        setLoading(false);
        return null;
      }

      const isInputToken0 =
        tokens.in.address.toLowerCase() === poolConstants.token0.toLowerCase();

      let quotedAmountOut;
      if (isInputToken0) {
        quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
          poolConstants.token0,
          poolConstants.token1,
          poolConstants.fee,
          this.fromReadableAmount(
            tokens.amountIn,
            tokens.in.decimals
          ).toString(),
          0
        );
      } else {
        // Reverse direction (pool's token1 → token0)
        quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
          poolConstants.token1,
          poolConstants.token0,
          poolConstants.fee,
          this.fromReadableAmount(
            tokens.amountIn,
            tokens.in.decimals
          ).toString(),
          0
        );
      }

      const outDecimals = isInputToken0
        ? tokens.out.decimals
        : tokens.in.decimals;

      const amountOut = this.toReadableAmount(quotedAmountOut, outDecimals);

      console.log("amountOut", amountOut);

      const options: SwapOptionsSwapRouter02 = {
        recipient: tokens.walletAddress,
        slippageTolerance: new Percent(50, 10_000),
        deadline: Math.floor(Date.now() / 1000 + 1800),
        type: SwapType.SWAP_ROUTER_02,
      };

      const ethersV5Provider = new JsonRpcProvider(this.RPC_ENDPOINT);

      const router = new AlphaRouter({
        chainId: tokens.chainId,
        provider: ethersV5Provider,
      });

      const route = await router.route(
        CurrencyAmount.fromRawAmount(
          tokens.in,
          this.fromReadableAmount(
            tokens.amountIn,
            tokens.in.decimals
          ).toString()
        ),
        tokens.out,
        TradeType.EXACT_INPUT,
        options
      );

      if (!route || !route.methodParameters) {
        setLoading(false);
        console.error("No route loaded");
        return null;
      }

      return {
        token0: poolConstants?.token0,
        token1: poolConstants?.token1,
        fee: poolConstants?.fee,
        amountOut,
        estimatedGasUsedUSD: route.estimatedGasUsedUSD.toFixed(6),
        estimatedGasUsed: route.estimatedGasUsed?.toString() || "0",
      };
    } catch (error) {
      console.log("Error in quote function:", error);
      setLoading(false);
      return null;
    }
  }

  async getPoolConstants(tokens: {
    in: Token;
    out: Token;
    poolFee: number;
  }): Promise<PoolInfo> {
    console.log("Token In ", tokens.in);
    console.log("Token Out", tokens.out);

    const currentPoolAddress = computePoolAddress({
      factoryAddress: UNISWAP_V3_FACTORY_ADDRESS,
      tokenA: tokens.in,
      tokenB: tokens.out,
      fee: tokens.poolFee,
    });

    if (Number(currentPoolAddress).toString() === "0") {
      throw new Error(`No pool ${tokens.in.symbol}-${tokens.out.symbol}`);
    }

    const poolContract = new ethers.Contract(
      currentPoolAddress,
      IUniswapV3PoolABI.abi,
      this.provider!
    );

    console.log("Pool Address: ", currentPoolAddress);
    console.log("Pool Contract: ", poolContract);

    const [token0, token1, fee, tickSpacing, liquidity, slot0] =
      await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
        poolContract.tickSpacing(),
        poolContract.liquidity(),
        poolContract.slot0(),
      ]);

    console.log("Token0: ", token0);
    console.log("Token1: ", token1);
    console.log("Fee: ", fee);

    return {
      token0,
      token1,
      fee,
      tickSpacing,
      liquidity,
      sqrtPriceX96: slot0[0],
      tick: slot0[1],
    };
  }

  async createTrade(tokens: {
    in: Token;
    out: Token;
    amountIn: number;
    poolFee: number;
    walletAddress: string;
    chainId: number;
  }): Promise<TokenTrade> {
    if (!this.provider) {
      throw new Error("No provider found");
    }

    const poolInfo = await this.getPoolConstants({
      in: tokens.in,
      out: tokens.out,
      poolFee: tokens.poolFee,
    });

    console.log("pool info", poolInfo);
    const pool = new Pool(
      tokens.in,
      tokens.out,
      tokens.poolFee,
      poolInfo.sqrtPriceX96.toString(),
      poolInfo.liquidity.toString(),
      poolInfo.tick
    );

    console.log("new pool created", pool);
    const swapRoute = new Route([pool], tokens.in, tokens.out);

    console.log("swapRoute", swapRoute);
    const amountOut = await this.getOutputQuote({
      in: tokens.in,
      out: tokens.out,
      amountIn: tokens.amountIn,
      poolFee: tokens.poolFee,
      walletAddress: tokens.walletAddress,
      chainId: tokens.chainId,
    });

    if (!amountOut) {
      throw new Error("No amount out found from quote");
    }

    console.log("pool info amountOut", amountOut);
    const uncheckedTrade = Trade.createUncheckedTrade({
      route: swapRoute,
      inputAmount: CurrencyAmount.fromRawAmount(
        tokens.in,
        this.fromReadableAmount(tokens.amountIn, tokens.in.decimals).toString()
      ),
      outputAmount: CurrencyAmount.fromRawAmount(
        tokens.out,
        this.fromReadableAmount(amountOut, tokens.out.decimals).toString()
      ),
      tradeType: TradeType.EXACT_INPUT,
    });

    return uncheckedTrade;
  }

  async executeNativeTrade(
    tokens: {
      in: string;
      out: string;
      fee: FeeAmount;
      amountIn: number;
      walletAddress: string;
    },
    provider: ethers.providers.Web3Provider,
    issetReverse: boolean
  ) {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return TransactionState.Failed;
    }

    if (!tokens.walletAddress || !provider) {
      throw new Error("Cannot execute a trade without a connected wallet");
    }

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const router = new ethers.Contract(
      SWAP_ROUTER_ADDRESS,
      SwapRouterABI.abi,
      signer
    );

    const amountIn = ethers.utils.parseEther(tokens.amountIn.toString());
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    if (!issetReverse) {
      const params = {
        tokenIn: tokens.in,
        tokenOut: tokens.out,
        fee: tokens.fee,
        recipient: address,
        deadline: deadline,
        amountIn: amountIn,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
      };

      console.log("Swapping native token to ERC20 with params:", params);
      const tx = await router.exactInputSingle(params, {
        value: amountIn,
        gasLimit: 1000000,
      });

      console.log("Swap transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Swap transaction confirmed:", receipt);
      return TransactionState.Sent;
    } else {
      const tokenContract = new ethers.Contract(tokens.out, ERC20_ABI, signer);

      console.log("Approving tokens...");
      const approveTx = await tokenContract.approve(
        SWAP_ROUTER_ADDRESS,
        this.fromReadableAmount(tokens.amountIn, 18).toString()
      );

      await approveTx.wait();
      console.log("Token approval confirmed");

      const params = {
        tokenIn: tokens.out,
        tokenOut: tokens.in,
        fee: tokens.fee,
        recipient: address,
        deadline: deadline,
        amountIn: amountIn,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0,
      };

      console.log("Sending swap transaction...");
      // Execute the swap - this will give you WMATIC/WPOL
      const tx = await router.exactInputSingle(params, {
        gasLimit: 1000000,
      });
      console.log("Swap transaction sent:", tx.hash);

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log("Swap transaction confirmed:", receipt);

      const wContract = new ethers.Contract(
        tokens.in,
        WRAPPED_NATIVE_TOKEN_ABI,
        signer
      );

      // Get the balance of WTOKEN that we received
      const balanceBefore = await wContract.balanceOf(address);
      const balanceAfter = await wContract.balanceOf(address);
      const amountReceived = balanceAfter.sub(balanceBefore);

      console.log("amountReceived", this.toReadableAmount(amountReceived, 18));
      // Unwrap it to native token
      const unwrapTx = await wContract.withdraw(amountReceived);
      await unwrapTx.wait();
      console.log("Unwrapped to native TOKEN");

      return TransactionState.Sent;
    }
  }

  async executeTrade(
    trade: TokenTrade,
    provider: ethers.providers.Web3Provider,
    amount: number
  ): Promise<TransactionState> {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      console.error("MetaMask is not installed");
      return TransactionState.Failed;
    }

    if (!this.walletAddress || !provider) {
      throw new Error("Cannot execute a trade without a connected wallet");
    }

    // Get signer directly
    const signer = provider.getSigner();

    const token0 = trade.inputAmount.currency;

    // Give approval to the router to spend the token0
    const tokenApproval = await this.getTokenTransferApproval(
      token0,
      amount,
      signer
    );

    // Fail if transfer approvals do not go through
    if (tokenApproval !== TransactionState.Sent) {
      console.error("Token approval failed");
      return TransactionState.Failed;
    }

    const options: SwapOptions = {
      slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
      deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
      recipient: this.walletAddress,
    };

    const methodParameters = SwapRouter.swapCallParameters([trade], options);

    const tx = {
      data: methodParameters.calldata,
      to: SWAP_ROUTER_ADDRESS,
      value: methodParameters.value,
      from: this.walletAddress,
      maxFeePerGas: this.MAX_FEE_PER_GAS,
      maxPriorityFeePerGas: this.MAX_PRIORITY_FEE_PER_GAS,
    };

    try {
      // Send the transaction
      console.log("Sending swap transaction...");
      const txResponse = await signer.sendTransaction(tx);

      console.log("Swap transaction sent:", txResponse.hash);

      // Wait for transaction confirmation
      const receipt = await txResponse.wait();
      console.log("Swap transaction confirmed:", receipt);

      return TransactionState.Sent;
    } catch (error) {
      console.error("Failed to execute swap:", error);
      return TransactionState.Failed;
    }
  }

  async getTokenTransferApproval(
    token: Token,
    amount: number,
    signer: ethers.Signer
  ): Promise<TransactionState> {
    try {
      // Create contract with signer (not provider)
      const tokenContract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        signer // Using signer here is critical
      );

      console.log("Sending approval transaction...");

      // Call approve directly instead of using populateTransaction
      const tx = await tokenContract.approve(
        SWAP_ROUTER_ADDRESS,
        this.fromReadableAmount(amount, token.decimals).toString()
      );

      console.log("Approval transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Approval transaction confirmed:", receipt);

      return TransactionState.Sent;
    } catch (e) {
      console.error("Approval transaction failed:", e);
      return TransactionState.Failed;
    }
  }

  private async getOutputQuote(tokens: {
    in: Token;
    out: Token;
    amountIn: number;
    poolFee: number;
    walletAddress: string;
    chainId: number;
  }) {
    if (!this.provider) {
      throw new Error("Provider required to get pool state");
    }
    const quoterContract = new ethers.Contract(
      QUOTER_CONTRACT_ADDRESS,
      Quoter.abi,
      this.provider
    );

    const poolConstants = await this.getPoolConstants(tokens);

    if (!poolConstants) {
      console.error("Pool constants are not available.");
      return null;
    }

    const isInputToken0 =
      tokens.in.address.toLowerCase() === poolConstants.token0.toLowerCase();

    let quotedAmountOut;

    if (isInputToken0) {
      quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        poolConstants.token0,
        poolConstants.token1,
        poolConstants.fee,
        this.fromReadableAmount(tokens.amountIn, tokens.in.decimals).toString(),
        0
      );
    } else {
      // Reverse direction (pool's token1 → token0)
      quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        poolConstants.token1,
        poolConstants.token0,
        poolConstants.fee,
        this.fromReadableAmount(tokens.amountIn, tokens.in.decimals).toString(),
        0
      );
    }

    const outDecimals = isInputToken0
      ? tokens.out.decimals
      : tokens.in.decimals;

    const amountOut = this.toReadableAmount(quotedAmountOut, outDecimals);
    return amountOut;
  }

  private fromReadableAmount(
    amount: number | string,
    decimals: number
  ): BigNumberish {
    if (typeof amount !== "string") {
      amount = amount.toString();
    }
    return ethers.utils.parseUnits(amount, decimals);
  }

  private toReadableAmount(rawAmount: number, decimals: number): string {
    const formattedAmount = ethers.utils.formatUnits(rawAmount, decimals);
    return parseFloat(formattedAmount).toFixed(this.READABLE_FORM_LEN);
  }
}

export default UniSwap;
