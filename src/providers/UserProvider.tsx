"use client";

import { useGetUser } from "@/api/user/user.queries";
import Web3ConnectModal from "@/components/modals/web3/Web3ConnectModal";
import Web3DisconnectModal from "@/components/modals/web3/Web3DisconnectModal";
import useUserStore from "@/store/user.store";
import { useEffect } from "react";
import {
  BaseChain,
  Chain,
  SupportedChains,
  useModal,
} from "@civic/multichain-connect-react-core";
import { useRainbowkitAdapterModal } from "@civic/multichain-connect-react-rainbowkit-wallet-adapter";
import { useSolanaWalletAdapterModal } from "@civic/multichain-connect-react-solana-wallet-adapter";
import useWeb3ModalStore from "@/store/web3Modal.store";

type T = SupportedChains;
type S = BaseChain;
type E = BaseChain;

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { initializeAuth, isInitialized } = useUserStore();
  const { chains } = useModal();
  const {
    connectModalOpen,
    disconnectModalOpen,
    setConnectModalOpen,
    setDisconnectModalOpen,
  } = useWeb3ModalStore();

  const { openConnectModal: openEvmConnectModal } = useRainbowkitAdapterModal();
  const { openConnectModal: openSolanaConnectModal } =
    useSolanaWalletAdapterModal();
  // Initialize query in background without blocking
  const { user, isError, isSuccess } = useGetUser();

  useEffect(() => {
    if (isSuccess && !isError) {
      initializeAuth(user);
    } else {
      initializeAuth(null);
    }
  }, [initializeAuth, user, isSuccess, isError, isInitialized]);

  const onChainSelect = (chain: Chain<T, S, E>) => {
    if (chain.type === "ethereum") {
      openEvmConnectModal?.();
    } else if (chain.type === "solana") {
      openSolanaConnectModal?.();
    }
  };
  return (
    <>
      {children}
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

export default UserProvider;
