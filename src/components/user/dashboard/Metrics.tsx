"use client";
import icons from "@/public/icons";
import Image from "next/image";
import DashboardFilter from "./DashboardFilter";
import { useState } from "react";
import { useGetMetrics } from "@/api/metrics/metrics.queries";
import useWeb3ModalStore from "@/store/web3Modal.store";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import SkeletonComponent from "@/components/Skeleton";

const Metrics = () => {
  const [sort, setSort] = useState("all");
  const { chain } = useWeb3ModalStore();
  const { address } = useWalletInfo();

  const { metrics, isLoading, isError } = useGetMetrics({
    network: chain.type,
    walletAddress: address!,
  });

  const loading = isLoading && !isError;

  const metricsData = [
    {
      icon: icons.dashboard.nftWorth,
      title: "Token Balance",
      value: `${Number(
        (metrics?.tokenBalance || 0).toFixed(3)
      )?.toLocaleString()} JPGC`,
    },
    {
      icon: icons.dashboard.nftTotal,
      title: "Total NFTs",
      value: metrics?.totalNfts || 0,
    },
    {
      icon: icons.dashboard.nftWallet,
      title: "Private NFTs",
      value: metrics?.privateNfts || 0,
    },
    {
      icon: icons.dashboard.nftListed,
      title: "Listed NFTs",
      value: metrics?.listedNfts || 0,
    },
  ];
  return (
    <div
      className="w-full flex flex-col gap-6 px-
    1 xs:px-3 py-1.5 xs:py-3.5"
    >
      <DashboardFilter sort={sort} setSort={setSort} />
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonComponent
                key={index}
                style={{
                  borderRadius: "0.5rem",
                }}
                className="px-10 py-2 w-full border border-[#E6E6E6] dark:border-[#3D3D3D] h-16"
              />
            ))
          : metricsData.map((metric, index) => (
              <div
                key={index}
                className="px-3 py-3 flex items-center gap-3 rounded-lg bg-[#F8F8F8] dark:bg-[#FFFFFF0F] border border-[#E3E3E899] dark:border-[#3D3D3D99] p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="h-full px-2 py-2 rounded-md bg-white dark:bg-[#373737]">
                    <Image
                      src={metric.icon}
                      alt={metric.title}
                      className="w-8"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-black/70 dark:text-white/70 font-medium">
                      {metric.title}
                    </p>
                    <p className="text-xl xl:text-2xl text-black dark:text-white font-semibold">
                      {metric.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Metrics;
