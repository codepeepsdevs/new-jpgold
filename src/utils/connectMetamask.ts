import { ethers } from "ethers";

type WalletProvider = {
  isMetaMask?: boolean;
  isPhantom?: boolean;
};

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
