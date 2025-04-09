import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { computePoolAddress, FeeAmount } from "@uniswap/v3-sdk";
import { ethers } from "ethers";
import { UNISWAP_V3_FACTORY_ADDRESS } from "./constants";
import { Token } from "@uniswap/sdk-core";

interface PoolInfo {
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  sqrtPriceX96: ethers.BigNumberish;
  liquidity: ethers.BigNumberish;
  tick: number;
}

export async function getPoolInfo(
  tokens: {
    in: Token;
    out: Token;
    poolFee: FeeAmount;
  },
  provider: ethers.providers.Provider
): Promise<PoolInfo> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: UNISWAP_V3_FACTORY_ADDRESS,
    tokenA: tokens.in,
    tokenB: tokens.out,
    fee: tokens.poolFee,
  });

  if (Number(currentPoolAddress).toString() === "0") {
    throw new Error(`No pool ${tokens.in.symbol}-${tokens.out.symbol}`);
  }

  console.log("pool info contact adddress", currentPoolAddress);
  const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    provider
  );

  console.log("pool info Pool Contract: ", poolContract);
  const [token0, token1, fee, tickSpacing, liquidity, slot0] =
    await Promise.all([
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);

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
