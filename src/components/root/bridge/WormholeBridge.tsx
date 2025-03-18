"use client";

import SpinnerLoader from "@/components/SpinnerLoader";
import { useTheme } from "@/store/theme.store";

import { lazy, Suspense, useEffect, useState } from "react";
const WormholeConnect = lazy(
  () => import("@wormhole-foundation/wormhole-connect")
);
import {
  nttRoutes,
  WormholeConnectConfig,
} from "@wormhole-foundation/wormhole-connect";

const WormholeBridge = () => {
  const theme = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wormholeConfig: WormholeConnectConfig = {
    network: "Testnet",
    chains: ["Sepolia", "Solana"],
    tokens: ["JPGCsep", "JPGCsol"],
    ui: {
      title: "JPGOLD COIN",
      walletConnectProjectId:
        process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
      showInProgressWidget: true,
      defaultInputs: {
        fromChain: "Sepolia",
        toChain: "Solana",
      },
    },
    // TODO: use a private RPC for mainnet
    // rpcs: {
    //   Solana: 'https://mainnet.helius-rpc.com/?api-key=$KEY',
    // },
    routes: [
      ...nttRoutes({
        tokens: {
          JPGC_NTT: [
            {
              chain: "Sepolia",
              manager: "0xB1e6276d3F1D01349E23F8775fCD3f0cE99Db410",
              token: "0xDA81abE25Be2054144c3303f231b3C9827369B06",
              transceiver: [
                {
                  address: "0xbEc88054650D4209eDb6C5AB4C054f3AB49426aA",
                  type: "wormhole",
                },
              ],
            },
            {
              chain: "Solana",
              manager: "nTThvcguMSbE5J2RnJsumMkrodsKCZB45BLVSDiPRzc",
              token: "97SZz8yJvSkGqoyuFBDVStJBZk75HLLsFh5v19byz7Q2",
              transceiver: [
                {
                  address: "9dtQTkYXM6LHW9BRZZKYnXYwmmJ8jfpxcWmxB3WuaNwQ",
                  type: "wormhole",
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      JPGCsep: {
        symbol: "JPGC",
        tokenId: {
          chain: "Sepolia",
          address: "0xDA81abE25Be2054144c3303f231b3C9827369B06",
        },
        icon: "https://wormhole.com/token.png",
        decimals: 18,
      },
      JPGCsol: {
        symbol: "JPGC",
        tokenId: {
          chain: "Solana",
          address: "97SZz8yJvSkGqoyuFBDVStJBZk75HLLsFh5v19byz7Q2",
        },
        icon: "https://wormhole.com/token.png",
        decimals: 9,
      },
    },
  };

  const LoadingFallback = () => (
    <div className="w-full flex justify-center items-center">
      <SpinnerLoader width={60} height={60} color="#FFB845" />
    </div>
  );

  if (!isMounted) return <LoadingFallback />;

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="container w-full flex justify-center items-center">
        <Suspense fallback={<LoadingFallback />}>
          <WormholeConnect
            config={wormholeConfig}
            theme={{
              mode: theme,
            }}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default WormholeBridge;
