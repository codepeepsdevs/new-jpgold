"use client";

import { MultichainWalletProvider } from "@civic/multichain-connect-react-core";
import { SolanaWalletAdapterConfig } from "@civic/multichain-connect-react-solana-wallet-adapter";
import { RainbowkitConfig } from "@civic/multichain-connect-react-rainbowkit-wallet-adapter";
import { mainnet, sepolia } from "wagmi/chains";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { lightTheme, darkTheme } from "@rainbow-me/rainbowkit";
import { useTheme } from "@/store/theme.store";

const AppWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  // Solana Configuration
  const solanaConfig = useMemo(() => {
    const network = WalletAdapterNetwork.Mainnet;
    const testNetwork = WalletAdapterNetwork.Devnet;

    const adapters = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ];

    const mainEndpoint = clusterApiUrl(network);
    const testEndpoint = clusterApiUrl(testNetwork);

    return {
      adapters,
      chains: [{ name: "Solana", rpcEndpoint: mainEndpoint }],
      testnetChains: [{ name: "Solana Devnet", rpcEndpoint: testEndpoint }],
    };
  }, []);

  // EVM Configuration with stable reference
  const evmConfig = useMemo(
    () => ({
      chains: [mainnet],
      testnetChains: [{ ...sepolia }],
      options: {
        appName: "Japaul Gold",
        walletConnectProjectId:
          process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
        modalSize: "compact" as const,
      },
      theme: theme === "light" ? lightTheme() : darkTheme(),
    }),
    [theme]
  );

  return (
    <MultichainWalletProvider>
      <SolanaWalletAdapterConfig {...solanaConfig}>
        <RainbowkitConfig {...evmConfig}>
          <>{children}</>
        </RainbowkitConfig>
      </SolanaWalletAdapterConfig>
    </MultichainWalletProvider>
  );
};

export default AppWalletProvider;
