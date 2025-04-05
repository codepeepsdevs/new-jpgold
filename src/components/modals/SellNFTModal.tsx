"use client";

import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import NFTCard from "../cards/NFTCards";
import images from "@/public/images";
import { NFTAsset } from "@/constants/types";
import {
  extractNFTProperties,
  formatNumberWithoutExponential,
  truncateAddress,
} from "@/utils/utilityFunctions";
import { LuCopy } from "react-icons/lu";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import {
  finalizeMintNft,
  getProvider,
  listNft,
  unlistNft,
  updateListedNft,
} from "@/services/jpgnft/jpgnft";
import { useWallet } from "@solana/wallet-adapter-react";
import { BN } from "bn.js";
import SpinnerLoader from "../SpinnerLoader";
import { useQueryClient } from "@tanstack/react-query";
import { useGetListedNfts } from "@/api/jpgnft/jpgnft.queries";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import classNames from "classnames";

interface SellNFTModalProps {
  nft: NFTAsset;
  isOpen: boolean;
  onClose: () => void;
}

const SellNFTModal = ({ nft, isOpen, onClose }: SellNFTModalProps) => {
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const { address } = useWalletInfo();
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const [isFinalizeSubmitting, setIsFinalizeSubmitting] = useState(false);
  const [isListingSubmitting, setIsListingSubmitting] = useState(false);
  const [isUnlistingSubmitting, setIsUnlistingSubmitting] = useState(false);

  const { startRefreshCycle } = useGetListedNfts({ owner: address! });

  const {
    owner,
    discriminant,
    finalized,
    weight,
    price,
    description,
    name,
    listingPrice,
    listed,
    rate,
  } = extractNFTProperties(nft);

  const value = listed && listingPrice ? String(listingPrice) : "";

  const [amount, setAmount] = useState(value);

  const program = useMemo(
    () => getProvider(publicKey, signTransaction, sendTransaction),
    [publicKey, signTransaction, sendTransaction]
  );

  const handleUnlist = async () => {
    if (!publicKey) {
      toast.error("Wallet address is required, please connect wallet.");
      return;
    }
    setIsUnlistingSubmitting(true);
    try {
      const tx = await unlistNft(program!, new BN(discriminant));
      console.log("Nft unlisted", tx);
      toast.success("NFT Unlisted successfully");
      onClose();
      setIsUnlistingSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["get-wallet-nfts"] });
      startRefreshCycle();
    } catch (error) {
      setIsUnlistingSubmitting(false);
      onClose();

      console.log("Error unlisting NFT", error);
      toast.error("Error unlisting NFT");
    } finally {
      onClose();
      setIsUnlistingSubmitting(false);
    }
  };

  const handleUpdateListing = async () => {
    if (!publicKey) {
      toast.error("Wallet address is required, please connect wallet.");
      return;
    }
    setIsListingSubmitting(true);
    try {
      const tx = await updateListedNft(program!, {
        discriminant: new BN(discriminant),
        newPrice: new BN(Number(amount) * 100),
      });
      console.log("Nft price updated", tx);
      toast.success("NFT price updated successfully");
      onClose();
      setIsListingSubmitting(false);
      startRefreshCycle();
    } catch (error) {
      setIsListingSubmitting(false);
      onClose();

      console.log("Error updating listing price", error);
      toast.error("Error updating listing price");
    } finally {
      onClose();
      setIsListingSubmitting(false);
    }
  };

  const handleFinalize = async () => {
    if (!publicKey) {
      toast.error("Wallet address is required, please connect wallet.");
      return;
    }
    setIsFinalizeSubmitting(true);
    try {
      const tx = await finalizeMintNft(program!, new BN(discriminant));
      console.log("Nft minted", tx);
      toast.success("NFT finalized successfully");
      onClose();
      setIsFinalizeSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ["get-wallet-nfts"] });
    } catch (error) {
      setIsFinalizeSubmitting(false);
      onClose();

      console.log("Error finalizing mint NFT", error);
      toast.error("Error finalizing mint NFT");
    } finally {
      onClose();
      setIsFinalizeSubmitting(false);
    }
  };

  const handleList = async () => {
    if (!publicKey) {
      toast.error("Wallet address is required, please connect wallet.");
      return;
    }
    if (!amount) {
      toast.error("Please update your listing price.");
      return;
    }
    try {
      setIsListingSubmitting(true);
      const tx = await listNft(
        program!,
        new BN(discriminant),
        new BN(Number(amount) * 100)
      );
      console.log("Nft listed", tx);
      toast.success("NFT listed successfully");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["get-wallet-nfts"] });
      setIsListingSubmitting(false);
      startRefreshCycle();
    } catch (error) {
      setIsListingSubmitting(false);
      onClose();

      console.log("Error listing NFT", error);
      toast.error("Error listing NFT");
    } finally {
      onClose();
      setIsListingSubmitting(false);
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-[9999] isolate">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-[#151515] shadow-xl overflow-y-auto"
          >
            <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white dark:bg-[#151515] border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-medium text-[#050706] dark:text-white">
                JPNFT #{discriminant}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <IoClose size={24} />
              </button>
            </header>

            <div className="p-6 space-y-6">
              <div className="w-2/3 mx-auto">
                <NFTCard nft={nft} type="user" />
              </div>

              {/* NFT Card Component would go here */}

              <div className="space-y-4 pt-4">
                <div className="flex gap-3">
                  <div>
                    <Image
                      src={images.user.tokenOwner}
                      alt="Owner"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-[#5A5A5A] dark:text-white">
                      NFT Owner
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-[#050706] dark:text-white/70">
                        {truncateAddress(owner)}
                      </span>
                      {copied ? (
                        <span className="text-xs font-medium text-green-500">
                          Copied!
                        </span>
                      ) : (
                        <LuCopy
                          onClick={() => {
                            navigator.clipboard.writeText(owner);
                            setCopied(true);
                            setTimeout(() => {
                              setCopied(false);
                            }, 5000);
                          }}
                          className="text-sm text-[#050706] dark:text-white/70 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-gray-200 dark:border-gray-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5A5A5A] dark:text-white/70">
                      Name{" "}
                    </span>
                    <span className="text-[#050706] font-semibold dark:text-white">
                      {name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#5A5A5A] dark:text-white/70">
                      Amount (g)
                    </span>
                    <span className="text-[#050706] font-semibold dark:text-white">
                      {weight || "Pending"}
                    </span>
                  </div>

                  {listed && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A5A5A] dark:text-white/70">
                        Listed price ($)
                      </span>
                      <span className="text-[#050706] font-semibold dark:text-white">
                        {listingPrice}
                      </span>
                    </div>
                  )}
                  {price && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A5A5A] dark:text-white/70">
                        Current price ($)
                      </span>
                      <span className="text-[#050706] font-semibold dark:text-white">
                        {formatNumberWithoutExponential(price, 3)}
                      </span>
                    </div>
                  )}
                  {listed && rate && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#5A5A5A] dark:text-white/70">
                        Rate (%)
                      </span>
                      <span
                        className={classNames("font-semibold", {
                          "text-[#63BA23]": rate.status === "low",
                          "text-[#D20832]": rate.status === "high",
                          "text-primary": rate.status === "stable",
                        })}
                      >
                        {rate.status === "low"
                          ? "▲"
                          : rate.status === "high"
                          ? "▼"
                          : ""}
                        {rate.value}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-1 border-t border-gray-200 dark:border-gray-800 py-4">
                  <p className="text-[#5A5A5A] dark:text-white/70">
                    Description
                  </p>
                  <p className="text-[#050706] font-semibold dark:text-white">
                    {description}
                  </p>
                </div>

                {finalized ? (
                  <div className="flex flex-col gap-3">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400">
                          $
                        </span>
                      </div>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => {
                          // Only allow numeric input with max 2 decimal places
                          const newValue = e.target.value;
                          if (
                            newValue === "" ||
                            /^\d*\.?\d{0,2}$/.test(newValue)
                          ) {
                            setAmount(newValue);
                          }
                        }}
                        placeholder="0.00"
                        className="w-full p-3 pl-8 bg-white dark:bg-[#151515] border !border-[#E3E3E8] dark:border-[#292929] !rounded-lg text-[#050706] dark:text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <button
                      onClick={listed ? handleUpdateListing : handleList}
                      disabled={isListingSubmitting || !amount}
                      className="disabled:opacity-80 disabled:cursor-not-allowed flex justify-center w-full bg-black font-semibold text-white dark:bg-[#CC8F00] py-3.5 rounded-lg transition-colors"
                    >
                      {isListingSubmitting ? (
                        <SpinnerLoader width={25} height={25} color="#FFF" />
                      ) : listed ? (
                        `Update listing price`
                      ) : (
                        `List NFT for $${amount || "0.00"}`
                      )}
                    </button>

                    {listed && (
                      <button
                        onClick={handleUnlist}
                        disabled={isUnlistingSubmitting}
                        className="disabled:opacity-80 disabled:cursor-not-allowed flex justify-center w-full bg-black font-semibold text-white dark:bg-[#CC8F00] py-3.5 rounded-lg transition-colors"
                      >
                        {isUnlistingSubmitting ? (
                          <SpinnerLoader width={25} height={25} color="#FFF" />
                        ) : (
                          `Unlist NFT`
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleFinalize}
                    disabled={isFinalizeSubmitting}
                    className="disabled:opacity-80 disabled:cursor-not-allowed flex justify-center w-full bg-black font-semibold text-white dark:bg-[#CC8F00] py-3.5 rounded-lg transition-colors"
                  >
                    {isFinalizeSubmitting ? (
                      <SpinnerLoader width={25} height={25} color="#FFF" />
                    ) : (
                      `Finalize NFT`
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SellNFTModal;
