"use client";

import { LuCopy } from "react-icons/lu";
import { MdOutlineChangeCircle } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useMemo } from "react";
import toast from "react-hot-toast";
import useWeb3ModalStore from "@/store/web3Modal.store";
import { useAccount, useDisconnect as useEthDisconnect } from "wagmi";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useGetTokenBalance } from "@/api/jpgc/jpgc.queries";

interface DisconnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Web3DisconnectModal({
  isOpen,
  onClose,
}: DisconnectModalProps) {
  const { setConnectModalOpen, setDisconnectModalOpen, chain, setChain } =
    useWeb3ModalStore();

  // Ethereum wallet connection
  const { address: ethAddress } = useAccount();
  const { disconnect: disconnectEth } = useEthDisconnect();

  const { openConnectModal } = useConnectModal();
  const { setVisible } = useWalletModal();

  const { publicKey, disconnect: disconnectSolana } = useSolanaWallet();

  // Get the appropriate address based on chain type
  const walletAddress = useMemo(() => {
    if (chain.type === "ethereum") {
      return ethAddress;
    } else if (chain.type === "solana" && publicKey) {
      return publicKey.toBase58();
    }
    return "";
  }, [chain.type, ethAddress, publicKey]);

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success("Address copied to clipboard");
      onClose();
    }
  };

  const { value } = useGetTokenBalance({
    chain: chain.type,
    recipient: walletAddress || "",
  });

  const handleChainChange = () => {
    onClose();
    setConnectModalOpen(true);
  };

  const handleDisconnect = () => {
    if (chain.type === "ethereum") {
      disconnectEth();
    } else if (chain.type === "solana") {
      disconnectSolana();
    }
    onClose();
  };

  const onChainSelect = () => {
    console.log("Chain selected:", chain);
    setChain(chain);

    // Close our custom modal first
    setDisconnectModalOpen(false);

    // Small delay to ensure our modal is closed first
    setTimeout(() => {
      if (chain.type === "ethereum") {
        console.log("Opening Ethereum modal");
        openConnectModal?.();
      } else if (chain.type === "solana") {
        console.log("Attempting to open Solana modal");
        // Check if setVisible is available
        if (setVisible) {
          console.log("Setting Solana modal visible to true");
          setVisible(true);
        } else {
          console.error("setVisible is not available from useWalletModal()");
        }
      }
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[99]" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-[100]">
        <div className="bg-white dark:bg-[#1A1B1F] shadow-lg dark:shadow-none border dark:border-[#2C2D31] rounded-lg w-full max-w-md mx-4 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 bg-[#F0F0F0] dark:bg-[#2C2D31] text-[#606565] dark:text-[#989DAC] fill-current p-1.5 rounded-full"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-6 text-black dark:text-white">
            <h4 className="mb-2 mt-10 text-center text-xl xs:text-2xl font-bold">
              {chain.type === "ethereum" ? "Ethereum Wallet" : "Solana Wallet"}
            </h4>

            <div className="flex items-center justify-center mb-4 text-center text-sm">
              <span className="font-mono px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                {walletAddress
                  ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : "Not connected"}{" "}
                {value && `- ${value.toLocaleString()} JPGC`}
              </span>
            </div>

            <div className="text-sm xs:text-base flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="w-full flex items-center border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg py-2 px-2 cursor-pointer"
              >
                <LuCopy className="mr-2.5 text-xl" />
                <span className="mr-2.5">
                  Copy{" "}
                  {chain.type === "ethereum" ? "Wallet Address" : "Public Key"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleChainChange}
                className="w-full flex items-center border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg py-1.5 px-2 cursor-pointer"
              >
                <MdOutlineChangeCircle className="mr-2.5 text-xl" />
                <span className="mr-2.5">Change Chain</span>
              </button>

              {chain.type === "solana" && (
                <button
                  type="button"
                  onClick={onChainSelect}
                  className="w-full flex items-center border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg py-1.5 px-2 cursor-pointer"
                >
                  <MdOutlineChangeCircle className="mr-2.5 text-xl" />
                  <span className="mr-2.5">Change Wallet</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDisconnect}
                className="w-full flex items-center border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg py-1.5 px-2 cursor-pointer"
              >
                <VscDebugDisconnect className="mr-2.5 text-xl" />
                <span className="mr-2.5">Disconnect Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
