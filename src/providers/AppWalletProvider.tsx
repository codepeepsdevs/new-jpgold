"use client";

import WalletModals from "@/components/WalletModals";
import EvmWalletProvider from "./EvmWalletProvider";
import SolanaWalletProvider from "./SolanaWalletProvider";

const AppWalletProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SolanaWalletProvider>
      <EvmWalletProvider>
        <div>{children}</div>
        <WalletModals />
      </EvmWalletProvider>
    </SolanaWalletProvider>
  );
};

export default AppWalletProvider;
