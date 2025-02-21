"use client";
import icons from "@/public/icons";
import Image from "next/image";
import DashboardFilter from "./DashboardFilter";
import { useState } from "react";

const Metrics = () => {
  const [sort, setSort] = useState("all");
  const data = {
    nfts: 0,
    worth: 0,
    listed: 0,
    wallet: 0,
  };

  const metrics = [
    {
      icon: icons.dashboard.nftWorth,
      title: "NFTs Worth",
      value: `$${data.worth.toLocaleString()}`,
    },
    {
      icon: icons.dashboard.nftTotal,
      title: "Total NFTs",
      value: data.nfts,
    },
    {
      icon: icons.dashboard.nftListed,
      title: "Listed NFTs",
      value: data.listed,
    },
    {
      icon: icons.dashboard.nftWallet,
      title: "NFT Wallets",
      value: data.wallet,
    },
  ];
  return (
    <div className="w-full flex flex-col gap-6 px-1 xs:px-3 py-1.5 xs:py-3.5">
      <DashboardFilter sort={sort} setSort={setSort} />
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="px-3 py-3 flex items-center gap-3 rounded-lg bg-[#F8F8F8] dark:bg-[#FFFFFF0F] border border-[#E3E3E899] dark:border-[#3D3D3D99] p-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-full px-2 py-2 rounded-md bg-white dark:bg-[#373737]">
                <Image src={metric.icon} alt={metric.title} className="w-8" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-black/70 dark:text-white/70 font-medium">
                  {metric.title}
                </p>
                <p className="text-2xl text-black dark:text-white font-semibold">
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
