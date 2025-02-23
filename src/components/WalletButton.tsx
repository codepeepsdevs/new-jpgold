"use client";

import { useWallet } from "@civic/multichain-connect-react-core";

import { useMemo } from "react";
import useWeb3ModalStore from "@/store/web3Modal.store";
import images from "@/public/images";
import Image from "next/image";
import { IoSettingsSharp } from "react-icons/io5";
import { CivicWalletProps } from "@/constants/types";

const WalletButtons = () => {
  const { connected, wallet, chain } = useWallet();
  const { setConnectModalOpen, setDisconnectModalOpen } = useWeb3ModalStore();

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

  console.log(wallet);

  return (
    <div>
      {connected ? (
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
                objectFit="cover"
                className="w-fit h-fit rounded-full"
              />
            </span>
            <span className="">
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ""}
            </span>
          </button>

          <button
            onClick={() => {
              setDisconnectModalOpen(true);
            }}
            className="flex items-center justify-center p-2.5 text-center rounded-full text-black dark:text-white border border-[#E6E6E6] dark:border-[#3D3D3D]"
          >
            <IoSettingsSharp className="text-lg xs:text-xl" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setConnectModalOpen(true);
          }}
          className="px-6 py-2.5 text-center rounded-full text-[#0C0C0C] dark:text-white border border-black dark:border-white"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletButtons;
