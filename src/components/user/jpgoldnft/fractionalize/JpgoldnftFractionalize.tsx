"use client";

import UserCard from "@/components/UserCard";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const JpgoldnftFractionalize = () => {
  const [selectedNFT, setSelectedNFT] = useState("JPGNFT #(45)");

  console.log({ setSelectedNFT });

  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-lg font-medium text-[#050706] dark:text-white">Transfer JPGold NFT</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">NFT Token ID</label>
              <button
                className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white"
              >
                <span>{selectedNFT}</span>
                <IoChevronDown className="text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-base font-semibold text-[#050706] dark:text-white">Fraction 1 (g)</label>
                <input
                  type="number"
                  placeholder="35.00"
                  className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-semibold text-[#050706] dark:text-white">Fraction 2 (g)</label>
                <input
                  type="number"
                  placeholder="10.00"
                  className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">Description (Fraction 1)</label>
              <textarea
                placeholder="Enter description"
                rows={4}
                className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">Description (Fraction 2)</label>
              <textarea
                placeholder="Enter description"
                rows={4}
                className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400 resize-none"
              />
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 bg-[#F8F8F8] dark:bg-[#151515] border border-[#E6E6E6] dark:border-[#292929] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#050706] dark:text-white">Fee (0.15%)</span>
              <span className="text-base font-semibold text-[#050706] dark:text-white">$8.21</span>
            </div>
          </div>
          <hr className="dark:border-[#3D3D3DCC]" />

          <button className="w-full bg-black text-white font-semibold dark:bg-gold-200 py-3 rounded-full hover:bg-gray-900 dark:hover:bg-gold-300 transition-colors">
            Fractionalize NFT
          </button>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldnftFractionalize;
