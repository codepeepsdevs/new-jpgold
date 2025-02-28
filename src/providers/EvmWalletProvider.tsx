"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { useMemo, useState } from "react";
import { useTheme } from "@/store/theme.store";

export const config = getDefaultConfig({
  appName: "NFT Mint",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [sepolia, mainnet],
  // ssr: true,
});

const EvmWalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const theme = useTheme();

  const evmConfig = useMemo(
    () => ({
      chains: [mainnet],
      testnetChains: [sepolia],
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider {...evmConfig}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default EvmWalletProvider;
