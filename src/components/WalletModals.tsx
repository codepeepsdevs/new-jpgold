"use client";

import Web3ConnectModal from "@/components/modals/web3/Web3ConnectModal";
import Web3DisconnectModal from "@/components/modals/web3/Web3DisconnectModal";

import useWeb3ModalStore from "@/store/web3Modal.store";
import { Chain, SupportedChains } from "@/constants/types";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";

const chains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    type: SupportedChains.Ethereum,
  },
  {
    id: 2,
    name: "Solana",
    type: SupportedChains.Solana,
  },
];

const WalletModals = () => {
  const {
    chain,
    setChain,
    connectModalOpen,
    disconnectModalOpen,
    setConnectModalOpen,
    setDisconnectModalOpen,
  } = useWeb3ModalStore();

  const { openConnectModal } = useConnectModal();
  const { visible, setVisible } = useWalletModal();

  // Debug logging
  useEffect(() => {
    console.log("Chain changed:", chain);
  }, [chain]);

  useEffect(() => {
    console.log("Solana modal visible state:", visible);
  }, [visible]);

  const onChainSelect = (chain: Chain) => {
    console.log("Chain selected:", chain);
    setChain(chain);

    // Close our custom modal first
    setConnectModalOpen(false);

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

  return (
    <>
      <Web3ConnectModal
        chains={chains}
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        onChainSelect={onChainSelect}
      />
      <Web3DisconnectModal
        isOpen={disconnectModalOpen}
        onClose={() => setDisconnectModalOpen(false)}
      />
    </>
  );
};

export default WalletModals;
