// import { BaseProvider } from "@ethersproject/providers";
import { ethers, BigNumber } from "ethers";

import { CurrentConfig, Environment } from "./config";

// Single copies of provider and wallet
const mainnetProvider = new ethers.providers.JsonRpcProvider(
  CurrentConfig.rpc.mainnet
);

const wallet = createWallet();

const browserExtensionProvider = createBrowserExtensionProvider();
let walletExtensionAddress: string | null = null;

// Interfaces

export enum TransactionState {
  Failed = "Failed",
  New = "New",
  Rejected = "Rejected",
  Sending = "Sending",
  Sent = "Sent",
}

// Provider and Wallet Functions
// export function getMainnetProvider(): BaseProvider {
//   return mainnetProvider;
// }

// export function getProvider(): ethers.Provider | null {
//   return CurrentConfig.env === Environment.WALLET_EXTENSION
//     ? browserExtensionProvider
//     : wallet.provider;
// }

export function getProvider(): ethers.providers.Provider | null {
  return browserExtensionProvider;
}

export async function getWalletAddress(): Promise<string | null> {
  return CurrentConfig.env === Environment.WALLET_EXTENSION
    ? walletExtensionAddress
    : wallet.address;
}

export async function sendTransaction(
  transaction: ethers.providers.TransactionRequest,
  type: "Wallet" | "Extension"
): Promise<TransactionState> {
  if (type === "Extension") {
    return sendTransactionViaExtension(transaction);
  } else {
    if (transaction.value) {
      transaction.value = BigNumber.from(transaction.value);
    }
    return sendTransactionViaWallet(transaction);
  }
}

export async function connectBrowserExtensionWallet() {
  if (!window.ethereum) {
    return null;
  }

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);

  if (accounts.length !== 1) {
    return null;
  }

  walletExtensionAddress = accounts[0];
  return walletExtensionAddress;
}

// Internal Functionality

function createWallet(): ethers.Wallet {
  let provider = mainnetProvider;
  if (CurrentConfig.env == Environment.LOCAL) {
    provider = new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.local);
  }
  return new ethers.Wallet(CurrentConfig.wallet.privateKey, provider);
}

function createBrowserExtensionProvider(): ethers.providers.Provider | null {
  try {
    return new ethers.providers.Web3Provider(window?.ethereum, "any");
  } catch {
    console.log("No Wallet Extension Found");
    return null;
  }
}

// Transacting with a wallet extension via a Web3 Provider
async function sendTransactionViaExtension(
  transaction: ethers.providers.TransactionRequest
): Promise<TransactionState> {
  try {
    const provider = browserExtensionProvider as ethers.providers.Web3Provider;
    if (!provider) {
      return TransactionState.Failed;
    }

    const signer = provider.getSigner();
    const response = await signer.sendTransaction(transaction);

    if (response) {
      return TransactionState.Sent;
    } else {
      return TransactionState.Failed;
    }
  } catch (e) {
    console.log(e);
    return TransactionState.Rejected;
  }
}

async function sendTransactionViaWallet(
  transaction: ethers.providers.TransactionRequest
): Promise<TransactionState> {
  if (transaction.value) {
    transaction.value = BigNumber.from(transaction.value);
  }
  const txRes = await wallet.sendTransaction(transaction);

  let receipt = null;
  const provider = getProvider();
  if (!provider) {
    return TransactionState.Failed;
  }

  while (receipt === null) {
    try {
      receipt = await provider.getTransactionReceipt(txRes.hash);

      if (receipt === null) {
        continue;
      }
    } catch (e) {
      console.log(`Receipt error:`, e);
      break;
    }
  }

  // Transaction was successful if status === 1
  if (receipt) {
    return TransactionState.Sent;
  } else {
    return TransactionState.Failed;
  }
}
