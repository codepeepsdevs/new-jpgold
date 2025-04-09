import { CurrencyAmount, Percent, Token, TradeType } from "@uniswap/sdk-core";
import {
  FeeAmount,
  Pool,
  Route,
  SwapOptions,
  SwapRouter,
  Trade,
} from "@uniswap/v3-sdk";
import { ethers } from "ethers";

import {
  ERC20_ABI,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
  QUOTER_CONTRACT_ADDRESS,
  RPC_ENDPOINT,
  SWAP_ROUTER_ADDRESS,
  WRAPPED_NATIVE_TOKEN_ABI,
} from "./constants";
import { TransactionState } from "./providers";
import { getPoolInfo } from "./pool";
import { fromReadableAmount, toReadableAmount } from "./conversion";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { getPoolConstants } from "./quote";
import SwapRouterABI from "@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json";

export type TokenTrade = Trade<Token, Token, TradeType>;

type WalletProvider = {
  isMetaMask?: boolean;
  isPhantom?: boolean;
};

// Trading Functions
export async function createTrade(tokens: {
  in: Token;
  out: Token;
  amountIn: number;
  poolFee: number;
  walletAddress: string;
  chainId: number;
}): Promise<TokenTrade> {
  const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
  if (!provider) {
    throw new Error("No provider found");
  }

  const poolInfo = await getPoolInfo(
    {
      in: tokens.in,
      out: tokens.out,
      poolFee: tokens.poolFee,
    },
    provider
  );

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
  const amountOut = await getOutputQuote(
    {
      in: tokens.in,
      out: tokens.out,
      amountIn: tokens.amountIn,
      poolFee: tokens.poolFee,
      walletAddress: tokens.walletAddress,
      chainId: tokens.chainId,
    },
    provider
  );

  if (!amountOut) {
    throw new Error("No amount out found from quote");
  }

  console.log("pool info amountOut", amountOut);
  const uncheckedTrade = Trade.createUncheckedTrade({
    route: swapRoute,
    inputAmount: CurrencyAmount.fromRawAmount(
      tokens.in,
      fromReadableAmount(tokens.amountIn, tokens.in.decimals).toString()
    ),
    outputAmount: CurrencyAmount.fromRawAmount(
      tokens.out,
      fromReadableAmount(amountOut, tokens.out.decimals).toString()
    ),
    tradeType: TradeType.EXACT_INPUT,
  });

  return uncheckedTrade;
}

export async function executeNativeTrade(
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
      fromReadableAmount(tokens.amountIn, 18).toString()
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

    // Unwrap it to native token
    const unwrapTx = await wContract.withdraw(amountReceived);
    await unwrapTx.wait();
    console.log("Unwrapped to native TOKEN");

    return TransactionState.Sent;
  }
}

export async function executeTrade(
  trade: TokenTrade,
  walletAddress: string,
  provider: ethers.providers.Web3Provider,
  amount: number
): Promise<TransactionState> {
  // Check if MetaMask is installed
  if (!window.ethereum) {
    console.error("MetaMask is not installed");
    return TransactionState.Failed;
  }

  if (!walletAddress || !provider) {
    throw new Error("Cannot execute a trade without a connected wallet");
  }

  // Get signer directly
  const signer = provider.getSigner();

  const token0 = trade.inputAmount.currency;

  // Give approval to the router to spend the token0
  const tokenApproval = await getTokenTransferApproval(token0, amount, signer);

  // Fail if transfer approvals do not go through
  if (tokenApproval !== TransactionState.Sent) {
    console.error("Token approval failed");
    return TransactionState.Failed;
  }

  const options: SwapOptions = {
    slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
    deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
    recipient: walletAddress,
  };

  const methodParameters = SwapRouter.swapCallParameters([trade], options);

  const tx = {
    data: methodParameters.calldata,
    to: SWAP_ROUTER_ADDRESS,
    value: methodParameters.value,
    from: walletAddress,
    maxFeePerGas: MAX_FEE_PER_GAS,
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
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

// Helper Quoting and Pool Functions

async function getOutputQuote(
  tokens: {
    in: Token;
    out: Token;
    amountIn: number;
    poolFee: number;
    walletAddress: string;
    chainId: number;
  },
  provider: ethers.providers.Provider
) {
  if (!provider) {
    throw new Error("Provider required to get pool state");
  }
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    provider
  );

  const poolConstants = await getPoolConstants(tokens, provider);

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

  const outDecimals = isInputToken0 ? tokens.out.decimals : tokens.in.decimals;

  const amountOut = toReadableAmount(quotedAmountOut, outDecimals);
  return amountOut;
}

export async function getTokenTransferApproval(
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
      fromReadableAmount(amount, token.decimals).toString()
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

export async function connectToMetaMask() {
  // Clear any existing providers first
  if (window.ethereum) {
    // Check if multiple wallets are installed
    const providers = window.ethereum.providers;

    // If providers array exists (multiple wallets)
    if (providers) {
      // Find MetaMask specifically
      const metaMaskProvider = providers.find(
        (provider: WalletProvider) => provider.isMetaMask && !provider.isPhantom
      );
      if (metaMaskProvider) {
        const web3Provider = new ethers.providers.Web3Provider(
          metaMaskProvider,
          "any"
        );
        await web3Provider.send("eth_requestAccounts", []);
        return web3Provider;
      }
    } else if (window.ethereum.isMetaMask && !window.ethereum.isPhantom) {
      // Single provider that is MetaMask
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await web3Provider.send("eth_requestAccounts", []);
      return web3Provider;
    }
  }

  throw new Error("MetaMask not found. Please install MetaMask extension.");
}
