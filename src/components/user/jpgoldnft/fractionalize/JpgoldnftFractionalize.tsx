/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useGetNftsByOwner } from "@/api/jpgnft/jpgnft.queries";
import { useSimpleGoldPrice } from "@/api/metal-price/metal-price.queries";
import SpinnerLoader from "@/components/SpinnerLoader";
import UserCard from "@/components/UserCard";
import { NFTAsset } from "@/constants/types";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { fractionalizeNft, getProvider } from "@/services/jpgnft/jpgnft";
import {
  formatNumberWithoutExponential,
  uploadToPinata,
} from "@/utils/utilityFunctions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
import BN from "bn.js";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoChevronDown } from "react-icons/io5";

const goldBarUrl = process.env.NEXT_PUBLIC_NFT_GOLD_BAR_URL;

const JpgoldnftFractionalize = () => {
  const queryClient = useQueryClient();
  const { publicKey, sendTransaction, signTransaction } = useWallet();

  const { address, connected } = useWalletInfo();
  const [selectedNFT, setSelectedNFT] = useState<NFTAsset>();
  const [showNFTDropdown, setShowNFTDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fractions, setFractions] = useState({
    quantity1: "",
    quantity2: "",
    description1: "",
    description2: "",
  });

  const { value: oneJpgcValue } = useSimpleGoldPrice(1);
  const { value: value1 } = useSimpleGoldPrice(Number(fractions.quantity1));
  const { value: value2 } = useSimpleGoldPrice(Number(fractions.quantity2));

  const fee = selectedNFT?.priority?.price
    ? selectedNFT.priority.price * 0.0015
    : null;

  const { nftData } = useGetNftsByOwner({
    address: address!,
  });

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  const handleQuantity1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the current input value
    const inputValue = e.target.value;

    // If the input is empty, set both fractions to empty and return
    if (inputValue === "") {
      setFractions({
        ...fractions,
        quantity1: "",
        quantity2: selectedNFT?.priority.goldWeight
          ? selectedNFT.priority.goldWeight.toString()
          : "",
      });
      return;
    }

    // This regex strictly validates for:
    // - Digits before decimal (required at least one)
    // - Optional decimal point followed by at most 1 digit
    const validInputRegex = /^[0-9]+\.?[0-9]?$|^[0-9]*\.?[0-9]?$/;

    if (validInputRegex.test(inputValue)) {
      const numValue = parseFloat(inputValue);
      const totalGold = selectedNFT?.priority.goldWeight
        ? parseFloat(selectedNFT.priority.goldWeight.toString())
        : 0;

      // Check if the value is within valid range (0.1 to totalGold)
      if (numValue <= totalGold) {
        // Calculate fraction 2 value
        const fraction2Value = totalGold - numValue;

        // Only update if the calculated fraction 2 is valid (≥ 0.1g)
        if (fraction2Value >= 0.1 || inputValue === "") {
          setFractions({
            ...fractions,
            quantity1: inputValue,
            quantity2: fraction2Value.toFixed(1),
          });
        }
      }
    }
  };

  // Function to validate inputs before submission
  const validateFractionalization = () => {
    if (!selectedNFT) {
      toast.error("Please select an NFT to fractionalize");
      return false;
    }

    if (!fractions.quantity1 || !fractions.quantity2) {
      toast.error("Please enter valid quantities for both fractions");
      return false;
    }

    const fraction1 = parseFloat(fractions.quantity1);
    const fraction2 = parseFloat(fractions.quantity2);
    const totalGold = selectedNFT.priority.goldWeight
      ? parseFloat(selectedNFT.priority.goldWeight.toString())
      : 0;

    if (fraction1 < 0.1) {
      toast.error("Fraction 1 must be at least 0.1g");
      return false;
    }

    if (fraction2 < 0.1) {
      toast.error("Fraction 2 must be at least 0.1g");
      return false;
    }

    // Ensure the sum matches the total (with small floating point tolerance)
    const sum = fraction1 + fraction2;
    if (Math.abs(sum - totalGold) > 0.01) {
      toast.error("The sum of fractions must equal the total gold weight");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateFractionalization()) {
        return;
      }

      setIsSubmitting(true);

      if (!selectedNFT?.id) {
        toast.error("Please select an NFT to fractionalize");
        setIsSubmitting(false);
        return;
      }
      if (!selectedNFT?.priority.discriminant) {
        toast.error("Please select a Finalized NFT to fractionalize");
        setIsSubmitting(false);
        return;
      }
      if (!address || !publicKey || !signTransaction) {
        toast.error("Wallet not connected. Please connect your wallet.");
        setIsSubmitting(false);
        return;
      }

      const loadingToastId = toast.loading("Fractionalize NFT...");

      const metadata1 = {
        name: `Japaul Gold NFT (${fractions.quantity1}g)`,
        symbol: `JPGNFT(${fractions.quantity1}g)`,
        description: `${fractions.quantity1}g worth of Japaul Gold NFT minted`,
        image: goldBarUrl,
        external_url: "https://www.jpgoldcoin.app",
      };

      const metadata2 = {
        name: `Japaul Gold NFT (${fractions.quantity2}g)`,
        symbol: `JPGNFT(${fractions.quantity2}g)`,
        description: `${fractions.quantity2}g worth of Japaul Gold NFT minted`,
        image: goldBarUrl,
        external_url: "https://www.jpgoldcoin.app",
      };

      const customKeyValues = {
        customKey: "customValue",
        customKey2: "customValue2",
      };

      const ipfsUrl1 = await uploadToPinata(
        metadata1,
        `Japaul Gold NFT`,
        customKeyValues
      );
      const ipfsUrl2 = await uploadToPinata(
        metadata2,
        `Japaul Gold NFT`,
        customKeyValues
      );
      console.log("ipfs1 url generated", ipfsUrl1);
      console.log("ipfs2 url generated", ipfsUrl2);

      const tx = await fractionalizeNft(program!, {
        discriminant: new BN(selectedNFT?.priority.discriminant),
        partA: {
          name: metadata1.name,
          symbol: metadata1.symbol,
          uri: ipfsUrl1,
          weight: new BN(Number(fractions.quantity1) * 10),
        },
        partB: {
          name: metadata2.name,
          symbol: metadata2.symbol,
          uri: ipfsUrl2,
          weight: new BN(Number(fractions.quantity2) * 10),
        },
      });
      toast.dismiss(loadingToastId);
      console.log("Transfer result:", tx);
      toast.success("NFT fractionalized successfully!");
      queryClient.invalidateQueries({ queryKey: ["get-wallet-nfts"] });

      // Reset the form
      setSelectedNFT(undefined);
      setFractions({
        quantity1: "",
        quantity2: "",
        description1: "",
        description2: "",
      });
    } catch (error: any) {
      console.error("Fractionalize error:", error);
      toast.error(error.message || "Failed to fractionalize NFT");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log({ setSelectedNFT });

  return (
    <div className="h-screen overflow-x-hidden flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4">
      <UserCard className="h-fit w-full md:w-1/2 lg:w-full xl:w-1/2">
        <div className="md:p-5 space-y-6">
          <h2 className="text-lg font-medium text-[#050706] dark:text-white">
            Transfer JPGold NFT
          </h2>

          <div className="space-y-4">
            <div className=" space-y-2 ">
              <label className="text-base text-[#050706] dark:text-white">
                NFT Token ID
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowNFTDropdown(!showNFTDropdown)}
                  className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 rounded-lg text-[#050706] dark:text-white"
                >
                  <span>
                    {connected
                      ? selectedNFT
                        ? `JPGNFT #${selectedNFT?.priority.discriminant}`
                        : "Select NFT"
                      : "Connect wallet"}{" "}
                  </span>
                  <IoChevronDown
                    className={`text-gray-400 transition-transform ${
                      showNFTDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showNFTDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg shadow-lg z-50 h-fit max-h-60 overflow-y-auto">
                    {connected ? (
                      <>
                        {" "}
                        {nftData && nftData.nfts && nftData.nfts.length > 0 ? (
                          nftData.nfts.map((nft, index) => (
                            <div
                              key={index}
                              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-[#050706] dark:text-white"
                              onClick={() => {
                                setSelectedNFT(nft);
                                setShowNFTDropdown(false);
                                setFractions({
                                  quantity1: "",
                                  quantity2: "",
                                  description1: "",
                                  description2: "",
                                });
                              }}
                            >
                              {`JPGNFT #${nft?.priority.discriminant}`}{" "}
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-gray-500 dark:text-gray-400">
                            {nftData && nftData.nfts
                              ? "No NFTs found"
                              : "Loading NFTs..."}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-3 text-gray-500 dark:text-gray-400">
                        Connect your wallet to view NFTs
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-base font-semibold text-[#050706] dark:text-white">
                  Fraction 1 (g)
                </label>
                <input
                  type="text"
                  value={fractions.quantity1}
                  onChange={handleQuantity1Change}
                  disabled={
                    !selectedNFT ||
                    !selectedNFT.priority.goldWeight ||
                    Number(selectedNFT?.priority.goldWeight) < 0.2
                  }
                  placeholder={
                    !selectedNFT
                      ? "Enter fraction 1 quantity"
                      : !selectedNFT?.priority.goldWeight
                      ? "NFT pending finalization"
                      : Number(selectedNFT?.priority.goldWeight) < 0.2
                      ? "NFT cannot be fractionalized"
                      : "Enter fraction 1 quantity"
                  }
                  className="w-full p-3 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-semibold text-[#050706] dark:text-white">
                  Fraction 2 (g)
                </label>
                <input
                  type="text"
                  value={fractions.quantity2}
                  placeholder="Enter fraction 1 quantity"
                  disabled
                  className="w-full p-3 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">
                Description (Fraction 1)
              </label>
              <textarea
                value={fractions.description1}
                onChange={(e) =>
                  setFractions({ ...fractions, description1: e.target.value })
                }
                placeholder="Enter description"
                rows={4}
                className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-base font-semibold text-[#050706] dark:text-white">
                Description (Fraction 2)
              </label>
              <textarea
                value={fractions.description2}
                onChange={(e) =>
                  setFractions({ ...fractions, description2: e.target.value })
                }
                placeholder="Enter description"
                rows={4}
                className="w-full p-3 bg-white dark:bg-[#151515] border border-[#E3E3E8] dark:border-[#292929] rounded-lg text-[#050706] dark:text-white placeholder-gray-400 resize-none"
              />
            </div>
          </div>
        </div>
      </UserCard>

      <UserCard className="h-fit w-full md:w-1/2 lg:w-full xl:w-1/2">
        <div className="md:p-5 space-y-6">
          <div className="space-y-4 bg-[#F8F8F8] dark:bg-[#151515] border border-[#E6E6E6] dark:border-[#292929] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-base text-[#050706] dark:text-white">
                1 JPGNFT
              </span>
              <span className="text-base font-semibold text-[#050706] dark:text-white">
                ${formatNumberWithoutExponential(oneJpgcValue, 3)}
              </span>
            </div>
            <hr className="dark:border-[#3D3D3DCC]" />
            {selectedNFT && (
              <>
                {selectedNFT?.priority.goldWeight ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-base text-[#050706] dark:text-white/70">
                        NFT worth
                      </span>
                      <span className="text-base text-[#050706] dark:text-white">
                        {selectedNFT?.priority.goldWeight}g{" "}
                        {selectedNFT?.priority?.price &&
                          `($${formatNumberWithoutExponential(
                            selectedNFT?.priority.price,
                            3
                          )})`}
                      </span>
                    </div>
                    <hr className="dark:border-[#3D3D3DCC]" />

                    {fractions.quantity1 ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-base text-[#050706] dark:text-white/70">
                            Fraction1
                          </span>
                          <span className="text-base text-[#050706] dark:text-white">
                            {fractions.quantity1}g ($
                            {formatNumberWithoutExponential(value1, 3)})
                          </span>
                        </div>
                        <hr className="dark:border-[#3D3D3DCC]" />
                      </>
                    ) : null}
                    {fractions.quantity2 ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-base text-[#050706] dark:text-white/70">
                            Fraction2{" "}
                          </span>
                          <span className="text-base text-[#050706] dark:text-white">
                            {fractions.quantity2}g ($
                            {formatNumberWithoutExponential(value2, 3)})
                          </span>
                        </div>
                        <hr className="dark:border-[#3D3D3DCC]" />
                      </>
                    ) : null}
                    {fee && (
                      <div className="flex justify-between items-center">
                        <span className="text-base text-[#282928] dark:text-white/70">
                          Fee (0.15%)
                        </span>
                        <span className="text-base text-[#050706] font-semibold dark:text-white">
                          ${formatNumberWithoutExponential(fee, 3)}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    Pending NFT. Navigate to your private nfts and finalize the
                    NFT before fractionalizing
                  </div>
                )}
              </>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={
              !connected || isSubmitting || !selectedNFT?.priority.finalized
            }
            className="disabled:opacity-80 disabled:cursor-not-allowed w-full bg-black font-bold dark:bg-gold-200 text-white py-4 rounded-full transition-colors flex justify-center"
          >
            {isSubmitting ? (
              <SpinnerLoader width={25} height={25} color="#FFF" />
            ) : (
              <>
                {!connected
                  ? "Connect wallet to continue"
                  : `Fractionalize NFT`}
              </>
            )}
          </button>
        </div>
      </UserCard>
    </div>
  );
};

export default JpgoldnftFractionalize;
