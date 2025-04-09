import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { computePoolAddress } from "@uniswap/v3-sdk";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { fromReadableAmount, toReadableAmount } from "./conversion";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
// import IUniswapV3Factory from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json";
import {
  AlphaRouter,
  SwapOptionsSwapRouter02,
  SwapType,
} from "@uniswap/smart-order-router";
import { Percent } from "@uniswap/sdk-core";

import {
  QUOTER_CONTRACT_ADDRESS,
  RPC_ENDPOINT,
  UNISWAP_V3_FACTORY_ADDRESS,
} from "./constants";

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

export async function quote(
  tokens: TokenInfo,
  setLoading: (value: boolean) => void = () => {}
): Promise<QuoteInfo | null> {
  try {
    setLoading(true);
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);

    console.log("input tokens", tokens);
    if (!provider) {
      console.error("Provider is not available. Please connect your wallet.");
      setLoading(false);
      return null;
    }

    const quoterContract = new ethers.Contract(
      QUOTER_CONTRACT_ADDRESS,
      Quoter.abi,
      provider
    );

    const poolConstants = await getPoolConstants(tokens, provider);

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
        fromReadableAmount(tokens.amountIn, tokens.in.decimals).toString(),
        0
      );
    } else {
      // Reverse direction (pool's token1 → token0)
      quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        poolConstants.token1,
        poolConstants.token0,
        poolConstants.fee,
        fromReadableAmount(tokens.amountIn, tokens.in.decimals).toString(),
        0
      );
    }

    const outDecimals = isInputToken0
      ? tokens.out.decimals
      : tokens.in.decimals;

    const amountOut = toReadableAmount(quotedAmountOut, outDecimals);

    console.log("amountOut", amountOut);

    const options: SwapOptionsSwapRouter02 = {
      recipient: tokens.walletAddress,
      slippageTolerance: new Percent(50, 10_000),
      deadline: Math.floor(Date.now() / 1000 + 1800),
      type: SwapType.SWAP_ROUTER_02,
    };

    const ethersV5Provider = new JsonRpcProvider(RPC_ENDPOINT);

    const router = new AlphaRouter({
      chainId: tokens.chainId,
      provider: ethersV5Provider,
    });

    const route = await router.route(
      CurrencyAmount.fromRawAmount(
        tokens.in,
        fromReadableAmount(tokens.amountIn, tokens.in.decimals).toString()
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

    setLoading(false);
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

export async function getPoolConstants(
  tokens: TokenInfo,
  provider: ethers.providers.Provider
): Promise<{
  token0: string;
  token1: string;
  fee: number;
} | null> {
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
    provider
  );

  console.log("Pool Address: ", currentPoolAddress);
  console.log("Pool Contract: ", poolContract);

  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ]);

  console.log("Token0: ", token0);
  console.log("Token1: ", token1);
  console.log("Fee: ", fee);

  return {
    token0,
    token1,
    fee,
  };
}
