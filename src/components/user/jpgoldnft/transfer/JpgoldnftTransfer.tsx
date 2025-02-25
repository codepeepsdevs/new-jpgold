"use client";

import UserCard from "@/components/UserCard";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";

const JpgoldnftTransfer = () => {
  const [selectedNFT, setSelectedNFT] = useState("JPGNFT #(45)");

  console.log({ setSelectedNFT });

  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-lg font-medium text-[#050706] dark:text-white">Transfer JPGold NFT</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base text-[#050706] dark:text-white">NFT Token ID</label>
              <button
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 rounded-lg text-[#050706] dark:text-white"
              >
                <span>{selectedNFT}</span>
                <IoChevronDown className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-base text-[#050706] dark:text-white">Recipient Wallet Address</label>
              <input
                type="text"
                placeholder="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                className="w-full p-3 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base text-[#050706] dark:text-white">Recipient Email Address</label>
              <input
                type="email"
                placeholder="oguntadejames@gmail.com"
                className="w-full p-3 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-[#373938]">
              <IoInformationCircleOutline />
              <span>Email must be a member of the JpGoldCoin platform</span>
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 bg-[#F8F8F8] dark:bg-[#151515] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#050706] dark:text-white/70">1 JPGNFT</span>
              <span className="text-base text-[#050706] dark:text-white">$61.2941</span>
            </div>
            <hr className="dark:border-[#3D3D3DCC]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#050706] dark:text-white/70">NFT worth (g)</span>
              <span className="text-base text-[#050706] dark:text-white">34g</span>
            </div>
            <hr className="dark:border-[#3D3D3DCC]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#050706] dark:text-white/70">Total</span>
              <div className="text-right">
                <p className="text-base font-medium text-[#050706] dark:text-white">$216.079</p>
                <p className="text-sm text-[#A0A1A0]">145.973 MATIC</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-black text-white font-semibold dark:bg-gold-200 py-3 rounded-full hover:bg-gray-900 dark:hover:bg-gold-300 transition-colors">
            Transfer NFT
          </button>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldnftTransfer;
