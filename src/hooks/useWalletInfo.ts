import { useMemo } from "react";
import { useAccount } from "wagmi"; // For Ethereum wallet
import { useWallet } from "@solana/wallet-adapter-react"; // For Solana wallet
import useWeb3ModalStore from "@/store/web3Modal.store";

export const useWalletInfo = () => {
  const { chain } = useWeb3ModalStore();

  // Ethereum wallet connection
  const { address: ethAddress, isConnected: isEthConnected } = useAccount();

  // Solana wallet connection
  const { publicKey, connected: isSolConnected } = useWallet();

  const walletInfo = useMemo(() => {
    if (chain.type === "ethereum" && isEthConnected) {
      return {
        address: ethAddress,
        connected: isEthConnected,
      };
    } else if (chain.type === "solana" && isSolConnected && publicKey) {
      return {
        address: publicKey.toBase58(),
        connected: isSolConnected,
      };
    }

    return {
      address: null,
      connected: false,
    };
  }, [chain, ethAddress, isEthConnected, publicKey, isSolConnected]);

  return walletInfo;
};
