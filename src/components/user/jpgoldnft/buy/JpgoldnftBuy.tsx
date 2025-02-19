"use client";

import UserCard from "@/components/UserCard";
import { useState } from "react";
import Image from "next/image";
import images from "@/public/images";
import { IoSwapVertical } from "react-icons/io5";



const JpgoldnftBuy = () => {
  const [selectedPayment, setSelectedPayment] = useState('wallet');

  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5">
          <h2 className="text-2xl font-bold text-[#050706] dark:text-white mb-8">Buy JPGold NFT</h2>

          <div className="bg-[#F8F8F8] dark:bg-[#151515] rounded-xl p-4 md:p-8">
            <div className="space-y-6 text-center">
              <p className="text-[#050706] dark:text-white">You&apos;re buying</p>

              <div className="flex items-center justify-center space-x-2">
                <Image src={images.user.coin} alt="jpgoldnft" width={20} height={20} />
                <h1 className="text-4xl font-semibold text-[#050706] dark:text-white">34.00</h1>
              </div>

              <div className="inline-flex items-center gap-2 bg-white border border-[#E6E6E6] dark:border-[#D9D9D9] dark:bg-[#1A1A1A] px-4 py-2 rounded-2xl">
                <span className="text-sm text-[#050706] font-bold dark:text-[#DDDDDD]">$</span>
                <span className="text-sm font-bold text-[#050706] dark:text-[#DDDDDD]">200.00</span>
                <IoSwapVertical className="text-lg text-[#1C1B1F80]/50 dark:text-[#DDDDDD]" />
              </div>
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">1 JPGNFT</span>
              <span className="text-base font-semibold text-[#050706] dark:text-white">$61.294</span>
            </div>
            <hr className="dark:border-[#3D3D3DCC]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">NFT worth (g)</span>
              <span className="text-base font-semibold text-[#050706] dark:text-white">34g</span>
            </div>
            <hr className="dark:border-[#3D3D3DCC]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">Fee (0.15%)</span>
              <span className="text-base font-semibold text-[#050706] dark:text-white">$8.21</span>
            </div>
            <hr className="dark:border-[#3D3D3DCC]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">Total</span>
              <div className="text-right">
                <p className="text-base font-semibold text-[#050706] dark:text-white">$216.079</p>
                <p className="text-sm text-gray-500 dark:text-[#A0A1A0]">146,973 MATIC</p>
              </div>
            </div>
          </div>

          <hr className="dark:border-[#3D3D3DCC]" />

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#050706] dark:text-white">Payment Method</h3>

            <div className="space-y-0">
              <label className="flex items-center p-3 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={selectedPayment === 'wallet'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 mr-3 accent-[#CC8F00]  focus:ring-[#CC8F00] dark:bg-gray-700 dark:checked:border-[#CC8F00] dark:checked:bg-[#CC8F00] dark:focus:ring-[#CC8F00]"
                />
                <span className={`text-base ${selectedPayment === 'wallet' ? 'font-bold' : ''} text-[#050706] dark:text-white`}>
                  Wallet (Matic)
                </span>
              </label>

              <label className="flex items-center p-3 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="crypto"
                  checked={selectedPayment === 'crypto'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 mr-3 accent-[#CC8F00]  focus:ring-[#CC8F00] dark:bg-gray-700 dark:checked:border-[#CC8F00] dark:checked:bg-[#CC8F00] dark:focus:ring-[#CC8F00]"
                />
                <span className={`text-base ${selectedPayment === 'crypto' ? 'font-bold' : ''} text-[#050706] dark:text-white`}>
                  Crypto Gateway (CoinGate)
                </span>
              </label>

              <label className="flex items-center p-3 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="fiat"
                  checked={selectedPayment === 'fiat'}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 mr-3 accent-[#CC8F00]  focus:ring-[#CC8F00] dark:bg-gray-700 dark:checked:border-[#CC8F00] dark:checked:bg-[#CC8F00] dark:focus:ring-[#CC8F00]"
                />
                <span className={`text-base ${selectedPayment === 'fiat' ? 'font-bold' : ''} text-[#050706] dark:text-white`}>
                  Fiat (Paystack)
                </span>
              </label>
            </div>
          </div>

          <button className="w-full bg-black text-white dark:bg-gold-200 py-4 rounded-full hover:bg-gray-900 dark:hover:bg-gold-300 transition-colors">
            Pay Now
          </button>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldnftBuy;
