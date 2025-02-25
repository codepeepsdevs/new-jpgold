"use client";

import { useState } from "react";
import { IoSwapVerticalSharp, IoChevronDown } from "react-icons/io5";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether, SiPolygon } from "react-icons/si";
import UserCard from "@/components/UserCard";
import React from "react";
import images from "@/public/images";
import Image from "next/image";
import { IconType } from "react-icons";
import { StaticImageData } from "next/image";

interface CryptoOption {
  value: string;
  label: string;
  icon: IconType | StaticImageData;
  color?: string;
  isImage?: boolean;
}

const cryptoOptions: CryptoOption[] = [
  { value: "ETH", label: "ETH", icon: FaEthereum, color: "#627EEA" },
  { value: "BTC", label: "BTC", icon: FaBitcoin, color: "#F7931A" },
  { value: "USDT", label: "USDT", icon: SiTether, color: "#26A17B" },
  { value: "JPGC", label: "JPGC", icon: images.user.coin, isImage: true },
];

// Add blockchain options
const blockchainOptions = [
  {
    id: "eth",
    name: "Ethereum",
    icon: FaEthereum,
    bgColor: "#627EEA33",
    iconColor: "#627EEA",
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: SiPolygon,
    bgColor: "#8247E533",
    iconColor: "#8247E5",
  },
];

const renderCryptoIcon = (option: CryptoOption) => {
  if (option.isImage) {
    return (
      <Image
        src={option.icon as StaticImageData}
        alt={option.label}
        width={20}
        height={20}
      />
    );
  }
  const IconComponent = option.icon as IconType;
  return <IconComponent size={20} color={option.color} />;
};

const JpgoldcoinSwap = () => {
  const [payingAmount, setPayingAmount] = useState("34");
  const [receivingAmount, setReceivingAmount] = useState("678");
  const [selectedPayCrypto, setSelectedPayCrypto] = useState(cryptoOptions[0]);
  const [selectedReceiveCrypto, setSelectedReceiveCrypto] = useState(
    cryptoOptions[3]
  );
  const [showPayDropdown, setShowPayDropdown] = useState(false);
  const [showReceiveDropdown, setShowReceiveDropdown] = useState(false);
  const [selectedChain, setSelectedChain] = useState(blockchainOptions[0]);

  const handleSwap = () => {
    // Swap the amounts
    const tempAmount = payingAmount;
    setPayingAmount(receivingAmount);
    setReceivingAmount(tempAmount);

    // Swap the selected cryptocurrencies
    const tempCrypto = selectedPayCrypto;
    setSelectedPayCrypto(selectedReceiveCrypto);
    setSelectedReceiveCrypto(tempCrypto);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold dark:text-white">
            Swap Token
          </h2>

          <div className="space-y-6 bg-[#F8F8F8] dark:bg-[#0E0E0E] p-4 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-lg">
            <div className="bg-white dark:bg-[#151515] border border-[#E6E6E6] dark:border-[#292929] rounded-lg p-2 md:p-4">
              {/* You're paying section */}

              <div className="space-y-2">
                <label className="text-lg text-[#050706] dark:text-white">
                  You&apos;re paying
                </label>
                <div className="p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <input
                      type="number"
                      value={payingAmount}
                      onChange={(e) => setPayingAmount(e.target.value)}
                      className="text-xl md:text-3xl font-bold !bg-transparent focus:outline-none text-[#050706] dark:text-white w-full !border !border-[#E6E6E6] dark:!border-[#292929] !rounded-lg"
                    />
                    <div className="relative">
                      <button
                        onClick={() => setShowPayDropdown(!showPayDropdown)}
                        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#151515] rounded-lg border border-[#D3D3D3] dark:border-[#3D3D3D]"
                      >
                        {renderCryptoIcon(selectedPayCrypto)}
                        <span className="text-[#050706] dark:text-white">
                          {selectedPayCrypto.label}
                        </span>
                        <IoChevronDown className="text-[#5A5B5A] ml-1" />
                      </button>

                      {showPayDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#151515] border border-[#D3D3D3] dark:border-[#3D3D3D] rounded-lg shadow-lg z-50">
                          {cryptoOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSelectedPayCrypto(option);
                                setShowPayDropdown(false);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 dark:hover:bg-gray-800 text-left"
                            >
                              {renderCryptoIcon(option)}
                              <span className="text-[#050706] dark:text-white">
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-base text-[#5A5B5A] dark:text-white/70">
                    $3,233.48
                  </p>
                </div>
              </div>

              {/* Swap icon */}
              <div className="flex justify-center items-center py-2">
                <div className="h-[1px] flex-1 bg-[#E6E6E6] dark:bg-[#3D3D3D]"></div>

                <div className="mx-0">
                  <button
                    onClick={handleSwap}
                    className="w-10 h-10 z-50 bg-[#F8F8F8] border border-[#E6E6E6] dark:border-none dark:bg-[#3D3D3D] rounded-full flex items-center justify-center hover:bg-[#EFEFEF] dark:hover:bg-[#4D4D4D] transition-colors"
                  >
                    <IoSwapVerticalSharp
                      className="text-[#5A5B5A] dark:text-[#B4B5B4]"
                      size={24}
                    />
                  </button>
                </div>
                <div className="h-[1px] flex-1 bg-[#E6E6E6] dark:bg-[#3D3D3D]"></div>
              </div>

              {/* You're receiving section */}
              <div className="space-y-2">
                <label className="text-base text-[#5A5B5A] dark:text-white/70">
                  You&apos;re receiving
                </label>
                <div className="p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <input
                      type="number"
                      value={receivingAmount}
                      onChange={(e) => setReceivingAmount(e.target.value)}
                      className="text-xl md:text-3xl font-medium !bg-transparent focus:outline-none text-[#050706] dark:text-white w-full !border !border-[#E6E6E6] dark:!border-[#292929] !rounded-lg"
                    />
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowReceiveDropdown(!showReceiveDropdown)
                        }
                        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#151515] rounded-lg border border-[#D3D3D3] dark:border-[#3D3D3D]"
                      >
                        {renderCryptoIcon(selectedReceiveCrypto)}
                        <span className="text-[#050706] dark:text-white">
                          {selectedReceiveCrypto.label}
                        </span>
                        <IoChevronDown className="text-[#5A5B5A] ml-1" />
                      </button>

                      {showReceiveDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#151515] border border-[#D3D3D3] dark:border-[#3D3D3D] rounded-lg shadow-lg z-50">
                          {cryptoOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSelectedReceiveCrypto(option);
                                setShowReceiveDropdown(false);
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2 dark:hover:bg-gray-800 text-left"
                            >
                              {renderCryptoIcon(option)}
                              <span className="text-[#050706] dark:text-white">
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-base text-[#5A5B5A] dark:text-white/70">
                    $3,233.48
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 p-4 bg-[#F8F8F8] dark:bg-[#1A1A1A] border border-[#E6E6E6] dark:border-[#3D3D3D] rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                1 JPGC
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                $6.119870
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                Coin worth (g)
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                34g
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                Fee (0.15%)
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                $8.21
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />

            <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                Amount
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                $221.079
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" />

            <div className="flex justify-between items-center pt-4">
              <span className="text-base text-[#282928] dark:text-white/70">
                Total
              </span>
              <div className="text-right">
                <p className="text-base font-medium text-[#050706] dark:text-white">
                  $221.079
                </p>
                <p className="text-sm text-[#5A5B5A] dark:text-white/70">
                  145.973 MATIC
                </p>
              </div>
            </div>
          </div>

          <hr className="dark:border-[#3D3D3D]" />

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">
                Select Blockchain
              </label>
              <div className="relative mt-2">
                <select
                  value={selectedChain.id}
                  onChange={(e) =>
                    setSelectedChain(
                      blockchainOptions.find(
                        (chain) => chain.id === e.target.value
                      ) || blockchainOptions[0]
                    )
                  }
                  className="w-full p-4 dark:bg-[#151515] pl-12 appearance-none border border-[#E3E3E8] dark:border-[#3D3D3D] rounded-lg focus:outline-none focus:border-[#CC8F00] bg-white text-[#0B0B0D] dark:text-white pr-10"
                >
                  {blockchainOptions.map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: selectedChain.bgColor }}
                  >
                    {React.createElement(selectedChain.icon, {
                      size: 16,
                      color: selectedChain.iconColor,
                      className: "text-current",
                    })}
                  </div>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#5A5B5A]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button className="w-full bg-black dark:bg-gold-200 text-white dark:text-black py-4 rounded-full hover:bg-gray-900 dark:hover:bg-gold-300 transition-colors">
              Swap
            </button>
          </div>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldcoinSwap;
