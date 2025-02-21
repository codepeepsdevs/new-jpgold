"use client";

import { useState } from "react";
import UserCard from "@/components/UserCard";
import { IoChevronDown } from "react-icons/io5";
import Image from "next/image";

const JpgoldcoinFiat = () => {
  const [amount, setAmount] = useState("34.00");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="p-5 space-y-6">
          <h2 className="text-lg font-medium text-[#050706] dark:text-white">Buy JPGold Coin</h2>

          <div className="p-6 bg-[#FAFAFA] dark:bg-[#151515] rounded-lg">
            <p className="text-sm text-[#6C7574] dark:text-gray-400 text-center mb-2">You&apos;re buying</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-gold-200">🪙</span>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-2xl font-medium bg-transparent focus:outline-none text-[#050706] dark:text-white w-24 text-center"
                  />
                </div>
                <p className="text-sm text-[#6C7574] dark:text-gray-400">$ 208.079 ℗</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#050706] dark:text-white">Select Payment Gateway</label>
            <div className="relative">
              <button className="w-full flex items-center gap-2 p-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 rounded-lg text-[#050706] dark:text-white">
                <Image
                  src="/stripe.svg"
                  alt="Stripe"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>Stripe</span>
                <IoChevronDown className="ml-auto text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="w-full md:w-1/2">
        <div className="p-5 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6C7574] dark:text-gray-400">1 JPGC</span>
              <span className="text-sm text-[#050706] dark:text-white">$6.119870</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6C7574] dark:text-gray-400">Coin worth (g)</span>
              <span className="text-sm text-[#050706] dark:text-white">34g</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6C7574] dark:text-gray-400">Fee (0.15%)</span>
              <span className="text-sm text-[#050706] dark:text-white">$8.21</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6C7574] dark:text-gray-400">Amount</span>
              <span className="text-sm text-[#050706] dark:text-white">$221.079</span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-[#6C7574] dark:text-gray-400">Total</span>
              <div className="text-right">
                <p className="text-sm font-medium text-[#050706] dark:text-white">$221.079</p>
                <p className="text-xs text-[#6C7574] dark:text-gray-400">145.973 MATIC</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#050706] dark:text-white">Select Blockchain</label>
              <div className="relative">
                <button className="w-full flex items-center gap-2 p-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 rounded-lg text-[#050706] dark:text-white">
                  <Image
                    src="/solana.png"
                    alt="Solana"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>Solana (SOL)</span>
                  <IoChevronDown className="ml-auto text-gray-400" />
                </button>
              </div>
            </div>

            <button className="w-full bg-black dark:bg-gold-200 text-white dark:text-black py-3 rounded-lg hover:bg-gray-900 dark:hover:bg-gold-300 transition-colors">
              Pay with Stripe
            </button>
          </div>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldcoinFiat;
