"use client";

import { useEffect, useState } from "react";
import { IoSwapVerticalSharp, IoChevronDown } from "react-icons/io5";
import UserCard from "@/components/UserCard";
import React from "react";
import Image from "next/image";
import { IconType } from "react-icons";
import { StaticImageData } from "next/image";
import SpinnerLoader from "@/components/SpinnerLoader";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import useWeb3ModalStore from "@/store/web3Modal.store";
import icons from "@/public/icons";
import { quote } from "@/utils/uniswap/quote";
import { Token } from "@uniswap/sdk-core";
import { FeeAmount } from "@uniswap/v3-sdk";
import {
  connectToMetaMask,
  createTrade,
  executeNativeTrade,
  executeTrade,
} from "@/utils/uniswap/trade";
import classNames from "classnames";
import { CryptoOption } from "@/constants/types";
import { NATIVE_TO_WRAPPED, POOLS } from "@/utils/uniswap/constants";
import { cryptoOptions } from "@/constants";
import { TransactionState } from "@/utils/uniswap/providers";
import toast from "react-hot-toast";

interface ChainOption {
  value: string;
  label: string;
  image: StaticImageData | string;
}

const chainOptions: ChainOption[] = [
  {
    value: "ethereum",
    label: "Ethereum",
    image: icons.coin.ethIcon,
  },

  {
    value: "solana",
    label: "Solana",
    image: icons.coin.solIcon,
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
  const { address, connected } = useWalletInfo();

  const { chain } = useWeb3ModalStore();
  const [payingAmount, setPayingAmount] = useState<string>("");
  const [receivingAmount, setReceivingAmount] = useState<string>("");
  const [selectedPayCrypto, setSelectedPayCrypto] = useState(cryptoOptions[0]);
  const [selectedReceiveCrypto, setSelectedReceiveCrypto] = useState(
    cryptoOptions[3]
  );
  const [showPayDropdown, setShowPayDropdown] = useState(false);
  const [showReceiveDropdown, setShowReceiveDropdown] = useState(false);
  const [selectedChain, setSelectedChain] = useState<ChainOption>(
    chainOptions.find((item) => item.value === chain.type) || chainOptions[0]
  );
  const [showChainDropdown, setShowChainDropdown] = useState(false);
  const [fee, setFee] = useState<string>("0.000");
  const [feePercentage, setFeePercentage] = useState<number>(0);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState<boolean>(false);
  const [isSetReverse, setIsSetReverse] = useState(false);

  const getPoolFee = (
    payCrypto: CryptoOption,
    receiveCrypto: CryptoOption
  ): FeeAmount | null => {
    // Check if there's a pool with the exact token pair match in either direction
    const pool = POOLS.find(
      (pool) =>
        (pool.token0.toUpperCase() === payCrypto.value.toUpperCase() &&
          pool.token1.toUpperCase() === receiveCrypto.value.toUpperCase()) ||
        (pool.token0.toUpperCase() === receiveCrypto.value.toUpperCase() &&
          pool.token1.toUpperCase() === payCrypto.value.toUpperCase())
    );

    return pool ? pool.fee : null;
  };

  const handleSwap = async () => {
    if (selectedChain?.value === "ethereum") {
      console.log("get here to swap");

      const poolFee = getPoolFee(selectedPayCrypto, selectedReceiveCrypto);

      if (!poolFee) {
        console.log("no pool for this tokens pair");
        return;
      }

      // create a Trade
      setSwapLoading(true);
      let response: TransactionState = TransactionState.Failed;
      try {
        const web3Provider = await connectToMetaMask();
        const isPayNativeToken = selectedPayCrypto.type === "native";
        const isReceiveNativeToken = selectedReceiveCrypto.type === "native";

        if (isPayNativeToken || isReceiveNativeToken) {
          response = await executeNativeTrade(
            {
              in: isPayNativeToken
                ? NATIVE_TO_WRAPPED[selectedPayCrypto.address].address
                : selectedPayCrypto.address,
              out: isReceiveNativeToken
                ? NATIVE_TO_WRAPPED[selectedReceiveCrypto.address].address
                : selectedReceiveCrypto.address,
              fee: poolFee,
              amountIn: isSetReverse
                ? Number(receivingAmount)
                : Number(payingAmount),
              walletAddress: address as string,
            },
            web3Provider,
            isSetReverse
          );

          console.log("response", response);
        } else {
          // Create the input token - use wrapped version if it's a native token
          const token0 = new Token(
            137, // Polygon chainId
            isPayNativeToken
              ? NATIVE_TO_WRAPPED[selectedPayCrypto.address].address
              : selectedPayCrypto.address,
            selectedPayCrypto.decimals,
            isPayNativeToken
              ? NATIVE_TO_WRAPPED[selectedPayCrypto.address].symbol
              : selectedPayCrypto.value
          );

          // Handle receiving token similarly

          const token1 = new Token(
            137, // Polygon chainId
            isReceiveNativeToken
              ? NATIVE_TO_WRAPPED[selectedReceiveCrypto.address].address
              : selectedReceiveCrypto.address,
            selectedReceiveCrypto.decimals,
            isReceiveNativeToken
              ? NATIVE_TO_WRAPPED[selectedReceiveCrypto.address].symbol
              : selectedReceiveCrypto.value
          );

          console.log("before create trade");
          const trade = await createTrade({
            in: isSetReverse ? token1 : token0,
            out: isSetReverse ? token0 : token1,
            amountIn: isSetReverse
              ? Number(receivingAmount)
              : Number(payingAmount),
            poolFee: poolFee,
            walletAddress: address as string,
            chainId: 137,
          });

          console.log("new created trade", trade);

          // Execute the trade
          response = await executeTrade(
            trade,
            address as string,
            web3Provider,
            isSetReverse ? Number(receivingAmount) : Number(payingAmount)
          );

          console.log("response", response);
        }
      } catch (error) {
        console.log("error performing trade", error);
        setSwapLoading(false);
      }
      setSwapLoading(false);
      if (response == TransactionState.Sent) {
        toast.success("Swap successfully");
        setPayingAmount("");
        setReceivingAmount("");
      }
    } else {
    }
  };

  useEffect(() => {
    if (selectedChain?.value === "ethereum") {
      const poolFee = getPoolFee(selectedPayCrypto, selectedReceiveCrypto);

      if (!poolFee) {
        console.log("no pool for this tokens pair");
        return;
      }

      setFeePercentage(poolFee / 10000);
      const timer = setTimeout(() => {
        const amount = isSetReverse ? receivingAmount : payingAmount;
        if (amount && chain?.id && address) {
          const amount = isSetReverse ? receivingAmount : payingAmount;
          if (amount && chain?.id && address) {
            const isNativeToken = selectedPayCrypto.type === "native";

            // Create the input token - use wrapped version if it's a native token
            const token0 = new Token(
              137, // Polygon chainId
              isNativeToken
                ? NATIVE_TO_WRAPPED[selectedPayCrypto.address].address
                : selectedPayCrypto.address,
              selectedPayCrypto.decimals,
              isNativeToken
                ? NATIVE_TO_WRAPPED[selectedPayCrypto.address].symbol
                : selectedPayCrypto.value
            );

            // Handle receiving token similarly
            const isReceiveNativeToken =
              selectedReceiveCrypto.type === "native";
            const token1 = new Token(
              137, // Polygon chainId
              isReceiveNativeToken
                ? NATIVE_TO_WRAPPED[selectedReceiveCrypto.address].address
                : selectedReceiveCrypto.address,
              selectedReceiveCrypto.decimals,
              isReceiveNativeToken
                ? NATIVE_TO_WRAPPED[selectedReceiveCrypto.address].symbol
                : selectedReceiveCrypto.value
            );

            const inputToken = isSetReverse ? token1 : token0;
            const outputToken = isSetReverse ? token0 : token1;

            const amountIn = isSetReverse
              ? Number(receivingAmount)
              : Number(payingAmount);

            const fetchQuotes = async () => {
              return await quote(
                {
                  in: inputToken,
                  amountIn: amountIn,
                  out: outputToken,
                  poolFee: poolFee,
                  walletAddress: address as string,
                  chainId: 137,
                },
                setQuoteLoading
              );
            };

            fetchQuotes().then((quote) => {
              console.log("quotes answer metrics", quote);
              setFeePercentage(Number(quote?.fee) / 10000);
              setFee(Number(quote?.estimatedGasUsedUSD).toFixed(5) || "0.000");
              if (isSetReverse) {
                setPayingAmount(Number(quote?.amountOut).toFixed(5) || "0.00");
              } else {
                setReceivingAmount(
                  Number(quote?.amountOut).toFixed(5) || "0.00"
                );
              }
            });
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
    }
  }, [
    payingAmount,
    receivingAmount,
    selectedPayCrypto,
    selectedReceiveCrypto,
    address,
    isSetReverse,
    chain?.id,
    selectedChain?.value,
  ]);

  useEffect(() => {
    const option = chainOptions.find((item) => item.value === chain.type);
    if (option) {
      setSelectedChain(option);
    }
  }, [chain]);

  console.log("quoteLoading", quoteLoading);
  console.log("swapLoading", swapLoading);
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <UserCard className="w-full md:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold dark:text-white">
            Swap Token
          </h2>

          <div className="space-y-6 bg-[#F8F8F8] dark:bg-[#0E0E0E] p-4 border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-lg">
            <div
              className={classNames({
                "flex bg-white dark:bg-[#151515] border border-[#E6E6E6] dark:border-[#292929] rounded-lg p-2 md:p-4":
                  true,
                "flex-col-reverse": isSetReverse,
                "flex-col": !isSetReverse,
              })}
            >
              {/* You're paying section */}

              <div className="space-y-2">
                <label className="text-lg text-[#050706] dark:text-white/70">
                  {isSetReverse ? "You're receiving" : "You're paying"}
                </label>
                <div className="p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <input
                      type="number"
                      value={payingAmount}
                      onChange={(e) => setPayingAmount(e.target.value)}
                      placeholder="0.00"
                      min={0}
                      disabled={isSetReverse}
                      className="p-2 text-xl md:text-3xl font-bold !bg-transparent focus:outline-none text-[#050706] dark:text-white w-full !border !border-[#E6E6E6] dark:!border-[#292929] !rounded-lg"
                    />
                    <div className="relative">
                      <button
                        onClick={() => setShowPayDropdown(!showPayDropdown)}
                        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#151515] rounded-lg border border-[#D3D3D3] dark:border-[#3D3D3D]"
                      >
                        {renderCryptoIcon(selectedPayCrypto)}
                        <span className="text-[#050706] dark:text-white">
                          {selectedReceiveCrypto.label}
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
                  {/* <p className="text-base text-[#5A5B5A] dark:text-white/70">
                    $3,233.48
                  </p> */}
                </div>
              </div>

              {/* Swap icon */}
              <div className="flex justify-center items-center py-2">
                <div className="h-[1px] flex-1 bg-[#E6E6E6] dark:bg-[#3D3D3D]"></div>

                <div className="mx-0">
                  <button
                    onClick={() => setIsSetReverse(!isSetReverse)}
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
                  {isSetReverse ? "You're paying" : "You're receiving"}
                </label>
                <div className="p-4 rounded-lg space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <input
                      type="number"
                      value={receivingAmount}
                      onChange={(e) => setReceivingAmount(e.target.value)}
                      placeholder="0.00"
                      min={0}
                      disabled={!isSetReverse}
                      className="p-2 text-xl md:text-3xl font-medium !bg-transparent focus:outline-none text-[#050706] dark:text-white w-full !border !border-[#E6E6E6] dark:!border-[#292929] !rounded-lg"
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
                  {/* <p className="text-base text-[#5A5B5A] dark:text-white/70">
                    $3,233.48
                  </p> */}
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
                Swap Fee ({feePercentage || 0}%)
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                {`$${payingAmount ? fee || 0 : "0.00"}`}
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

            {/* <div className="flex justify-between items-center">
              <span className="text-base text-[#282928] dark:text-white/70">
                text-white{" "}
              </span>
              <span className="text-base text-[#050706] font-semibold dark:text-white">
                $8.21
              </span>
            </div>
            <hr className="dark:border-[#3D3D3D]" /> */}

            {/* <div className="flex justify-between items-center">
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
            </div> */}
          </div>

          <hr className="dark:border-[#3D3D3D]" />

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">
                Select Blockchain
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowChainDropdown(!showChainDropdown)}
                  className="w-full flex items-center gap-2 p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white"
                >
                  <Image
                    src={selectedChain.image}
                    alt={selectedChain.value}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />{" "}
                  <span>{selectedChain.label}</span>
                  <svg
                    className="w-4 h-4 ml-auto text-gray-400"
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
                </button>

                {showChainDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg shadow-lg z-50">
                    {chainOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedChain(option);
                          setShowChainDropdown(false);
                        }}
                        className="flex items-center gap-2 w-full p-3 dark:hover:bg-[#292929]"
                      >
                        <Image
                          src={option.image}
                          alt={option.value}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <span className="text-[#050706] dark:text-white">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSwap}
              disabled={!connected || chain.type !== selectedChain.value}
              className="disabled:opacity-80 disabled:cursor-not-allowed w-full bg-black font-bold dark:bg-gold-200 text-white py-4 rounded-full transition-colors flex justify-center"
            >
              {swapLoading ? (
                <SpinnerLoader width={25} height={25} color="#FFF" />
              ) : (
                <>
                  {!connected
                    ? "Connect wallet to continue"
                    : chain.type === selectedChain.value
                    ? `Swap`
                    : `Invalid Wallet Connected`}
                </>
              )}
            </button>
          </div>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldcoinSwap;
