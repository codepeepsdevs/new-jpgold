"use client";

import { useMemo } from "react";
import useWeb3ModalStore from "@/store/web3Modal.store";
import images from "@/public/images";
import Image from "next/image";
import { IoSettingsSharp } from "react-icons/io5";
import { useAccount } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";

const WalletButtons = () => {
  const { setConnectModalOpen, setDisconnectModalOpen, chain } =
    useWeb3ModalStore();

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

  const handleConnect = () => {
    setConnectModalOpen(true);
  };

  const handleDisconnect = () => {
    setDisconnectModalOpen(true);
  };

  const shortenAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      {walletInfo.connected ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-6 py-2.5 text-center rounded-full text-black dark:text-white border border-[#E6E6E6] dark:border-[#3D3D3D]"
          >
            <span className="relative w-5 xs:w-6 h-5 xs:h-6 rounded-full">
              <Image
                src={images.user.avatar}
                alt="avatar"
                fill
                className="w-fit h-fit rounded-full object-cover"
              />
            </span>
            <span>{shortenAddress(walletInfo.address as string)}</span>
          </button>

          <button
            onClick={handleDisconnect}
            className="flex items-center justify-center p-2.5 text-center rounded-full text-black dark:text-white border border-[#E6E6E6] dark:border-[#3D3D3D]"
          >
            <IoSettingsSharp className="text-lg xs:text-xl" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="px-6 py-2.5 text-center rounded-full text-[#0C0C0C] dark:text-white border border-black dark:border-white"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletButtons;
