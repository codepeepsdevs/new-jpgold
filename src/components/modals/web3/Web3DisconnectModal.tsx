"use client";

import { LuCopy } from "react-icons/lu";
import { MdOutlineChangeCircle } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useWallet } from "@civic/multichain-connect-react-core";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { useSolanaWalletAdapterModal } from "@civic/multichain-connect-react-solana-wallet-adapter";
import { CivicWalletProps } from "@/constants/types";

interface DisconnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Web3DisconnectModal({
  isOpen,
  onClose,
}: DisconnectModalProps) {
  const { openConnectModal: openSolanaConnectModal } =
    useSolanaWalletAdapterModal();

  const { wallet, chain, disconnect } = useWallet();
  const account = useMemo(() => {
    let address = null;
    if (!wallet) return null;
    if (chain === "ethereum") {
      address = (wallet as CivicWalletProps).account.address as string;
    }
    if (chain === "solana") {
      address = (wallet as CivicWalletProps).publicKey?.toBase58();
    }
    return address;
  }, [wallet, chain]);

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
            <h4 className="mb-5 mt-10 text-center text-xl xs:text-2xl font-bold"></h4>

            <div className="text-sm xs:text-base flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (account) {
                    toast.dismiss();
                    navigator.clipboard.writeText(account);
                    toast.success("Copied to clipboard");
                    onClose();
                  }
                }}
                className="w-full flex items-center  border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg  py-2 px-2 cursor-pointer"
              >
                <LuCopy className="mr-2.5 text-xl" />{" "}
                <span className="mr-2.5">
                  Copy {chain === "ethereum" ? "Wallet Address" : "Public Key"}
                </span>
              </button>

              {chain === "solana" && (
                <button
                  type="button"
                  onClick={() => {
                    openSolanaConnectModal?.();
                    onClose();
                  }}
                  className="w-full flex items-center  border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg  py-1.5 px-2 cursor-pointer"
                >
                  <MdOutlineChangeCircle className="mr-2.5 text-xl" />{" "}
                  <span className="mr-2.5">Change Wallet</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  disconnect?.();
                  onClose();
                }}
                className="w-full flex items-center  border-0 bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#F7F7F733] rounded-lg  py-1.5 px-2 cursor-pointer"
              >
                <VscDebugDisconnect className="mr-2.5 text-xl" />{" "}
                <span className="mr-2.5">Disconnect Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
