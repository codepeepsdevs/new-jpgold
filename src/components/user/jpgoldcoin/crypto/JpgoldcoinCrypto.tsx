"use client";

import { useState } from "react";
import UserCard from "@/components/UserCard";
import { FaEthereum } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import Image from "next/image";
import { IoChevronDown, IoRefreshOutline, IoSwapVertical } from "react-icons/io5";
import images from "@/public/images";

interface CryptoOption {
  value: string;
  label: string;
  icon: any;
  symbol: string;
  bgColor: string;
  iconColor: string;
}

const cryptoOptions: CryptoOption[] = [
  {
    value: 'sol',
    label: 'Solana (SOL)',
    icon: SiSolana,
    symbol: 'SOL',
    bgColor: '#000000',
    iconColor: '#2BA6B1'
  },
  // {
  //   value: 'aave',
  //   label: 'Aave (AAVE)',
  //   icon: '/aave.svg',
  //   symbol: 'AAVE',
  //   bgColor: '#B6509E33',
  //   iconColor: '#B6509E'
  // },
  // {
  //   value: 'bnb',
  //   label: 'Binance Coin (BNB)',
  //   icon: '/bnb.svg',
  //   symbol: 'BNB',
  //   bgColor: '#F3BA2F33',
  //   iconColor: '#F3BA2F'
  // },
  // {
  //   value: 'dai',
  //   label: 'Dai (DAI)',
  //   icon: '/dai.svg',
  //   symbol: 'DAI',
  //   bgColor: '#F5AC3733',
  //   iconColor: '#F5AC37'
  // },
  {
    value: 'eth',
    label: 'Ethereum (ETH)',
    icon: FaEthereum,
    symbol: 'ETH',
    bgColor: '#627EEA',
    iconColor: '#FFFFFF'
  },
];

const JpgoldcoinCrypto = () => {
  const [amount, setAmount] = useState("500.00");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const renderCryptoIcon = (option: CryptoOption) => {
    const iconWrapper = (children: React.ReactNode) => (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: option.bgColor }}
      >
        {children}
      </div>
    );

    if (typeof option.icon === 'string') {
      return iconWrapper(
        <Image
          src={option.icon}
          alt={option.label}
          width={20}
          height={20}
          className="rounded-full"
        />
      );
    }
    const IconComponent = option.icon;
    return iconWrapper(
      <IconComponent size={20} color={option.iconColor} />
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-2xl font-bold dark:text-white">Buy JPGold Coin</h2>

          <div className="space-y-4 p-6 bg-[#F8F8F8] dark:bg-[#151515] rounded-lg">
            <p className="text-lg text-[#050706] dark:text-white text-center mb-2">You&apos;re buying</p>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="text-xl font-bold text-[#050706] dark:text-white">$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-3xl font-bold bg-transparent focus:outline-none text-[#050706] dark:text-white w-32 text-center"
                />
              </div>
              <div className="flex items-center w-fit mx-auto justify-center gap-2 mt-2 border border-[#E6E6E6] dark:border-[#3D3D3D] dark:bg-[#1A1A1A] px-4 py-2 rounded-2xl">
                <div className="flex items-center gap-1 text-sm text-[#6C7574] dark:text-gray-400">
                  <Image
                    src={images.user.coin}
                    alt="JPGC"
                    width={16}
                    height={16}
                    className="inline-block"
                  />
                  <span className="text-sm font-bold dark:text-white">31.19870</span>
                </div>
                <button>
                  <IoSwapVertical className="text-lg text-[#1C1B1F80]/50 dark:text-[#DDDDDD]" />
                </button>
              </div>

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-[#050706] dark:text-white">Select Payment Crypto</label>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center gap-2 p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white"
              >
                {renderCryptoIcon(selectedCrypto)}
                <span>{selectedCrypto.label}</span>
                <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg shadow-lg z-50">
                  {cryptoOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedCrypto(option);
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2 w-full p-3 dark:hover:bg-[#292929]"
                    >
                      {renderCryptoIcon(option)}
                      <span className="text-[#050706] dark:text-white">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </UserCard >

      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">

          <div className='space-y-4 p-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] border border-[#E6E6E6] dark:border-[#3D3D3D] rounded-xl'>

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">1 JPGC</span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">$6.119870</span>
            </div>
            <hr className='dark:border-[#3D3D3D]' />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">Coin worth (g)</span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">34g</span>
            </div>
            <hr className='dark:border-[#3D3D3D]' />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">Fee (0.15%)</span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">$8.21</span>
            </div>
            <hr className='dark:border-[#3D3D3D]' />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">Amount</span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">$221.079</span>
            </div>
            <hr className='dark:border-[#3D3D3D]' />

            <div className="flex justify-between items-center pt-4">
              <span className="text-base text-[#282928] dark:text-white/70">Total</span>
              <div className="text-right">
                <p className="text-base font-medium text-[#050706] dark:text-white">$221.079</p>
                <p className="text-sm text-[#5A5B5A] dark:text-white/70">145.973 MATIC</p>
              </div>
            </div>
          </div>


          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">Select Blockchain</label>
              <div className="relative">
                <button className="w-full flex items-center gap-2 p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white">
                  {renderCryptoIcon(selectedCrypto)}
                  <span>{selectedCrypto.label}</span>
                  <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            <button className="w-full bg-black font-bold dark:bg-gold-200 text-white py-3 rounded-full transition-colors">
              Pay with CoinGate
            </button>
          </div>
        </div>
      </UserCard>
    </div >
  );
};

export default JpgoldcoinCrypto;
