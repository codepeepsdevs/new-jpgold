/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { FC, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

// Store
import { useCartStore } from "@/store/useCartStore";

// Components
import OrderSummary from "./OrderSummary";
import SpinnerLoader from "@/components/SpinnerLoader";

// Icons
import { MdVerified } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoAlertCircleOutline } from "react-icons/io5";

// Utils & Services
import {
  extractNFTProperties,
  truncateAddress,
} from "@/utils/utilityFunctions";
import {
  getListingAccounts,
  getProviderReadonly,
} from "@/services/jpgnft/jpgnft";

// Types
import { NFTAsset } from "@/constants/types";

const Cart: FC = () => {
  // Store
  const { items, removeItem } = useCartStore();

  // State
  const [copiedIds, setCopiedIds] = useState<Record<string, boolean>>({});
  const [refreshedItems, setRefreshedItems] = useState<NFTAsset[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [unavailableItems, setUnavailableItems] = useState<string[]>([]);
  const [currentlyRefreshing, setCurrentlyRefreshing] = useState<string | null>(
    null
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Derived state
  const hasItems = refreshedItems.length > 0;

  // Define refreshData using useCallback
  const refreshData = useCallback(
    async (showSuccessToast = false) => {
      try {
        // First, get the read-only provider to query the chain
        const program = getProviderReadonly();

        // Fetch all listing accounts directly from the blockchain
        console.log("Refreshing: Fetching listing accounts from blockchain...");
        const listingAccounts = await getListingAccounts(program);
        console.log(
          `Refreshing: Found ${listingAccounts.length} active listing accounts`
        );

        // Get active listing account addresses
        const activeListingAddresses = listingAccounts.map((account: any) =>
          account.publicKey.toString()
        );

        // Process items to check availability
        const updatedItems: NFTAsset[] = [];
        const unavailableIds: string[] = [];

        for (const item of items) {
          setCurrentlyRefreshing(item.id);
          try {
            // Check if this NFT's listing account is still active on-chain
            const listAccount = item.priority?.listingAccount;

            if (listAccount) {
              const isListed = activeListingAddresses.includes(listAccount);
              updatedItems.push(item);

              // If not listed, add to unavailable items
              if (!isListed) {
                unavailableIds.push(item.id);
              }
            } else {
              // If no listAccount property, check by mint address as fallback
              const mintAddresses = listingAccounts.map((account: any) =>
                account.account.mint.toString()
              );
              const isListed = mintAddresses.includes(item.id);
              updatedItems.push(item);

              if (!isListed) {
                unavailableIds.push(item.id);
              }
            }
          } catch (error) {
            console.error(`Error checking NFT ${item.id}:`, error);
            updatedItems.push(item);
          }
        }

        setRefreshedItems(updatedItems);
        setUnavailableItems(unavailableIds);

        // Only show success toast if explicitly requested (manual refresh)
        if (showSuccessToast) {
          toast.success("Cart refreshed successfully");
        }
      } catch (error) {
        console.error("Failed to refresh NFT data:", error);
        toast.error("There was an error refreshing cart items");
        setRefreshedItems(items);
      } finally {
        setCurrentlyRefreshing(null);
        setIsRefreshing(false);
        setIsInitialLoad(false);
      }
    },
    [items] // Include dependencies here
  );
  /**
   * Handle removing unavailable items
   */
  const removeUnavailableItems = () => {
    if (unavailableItems.length === 0) return;

    // Remove each unavailable item from the cart
    unavailableItems.forEach((id) => removeItem(id));

    // Show toast notification
    toast.success(
      `Removed ${unavailableItems.length} unavailable item(s) from cart`
    );

    // Clear the unavailable items list
    setUnavailableItems([]);
    refreshData(false);
  };

  /**
   * Handle copying address to clipboard
   */
  const handleCopyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedIds((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  // Initial load effect
  useEffect(() => {
    refreshData(false);
  }, [items, refreshData]);

  // Loading state
  if (isRefreshing) {
    return (
      <div className="container mx-auto py-16 flex flex-col items-center justify-center">
        <SpinnerLoader width={40} height={40} color="#CC8F00" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {isInitialLoad
            ? "Verifying NFT availability..."
            : "Refreshing cart items..."}
        </p>
        {currentlyRefreshing && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Checking NFT #{currentlyRefreshing}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header with back button */}
      {hasItems && (
        <div className="flex items-center gap-2 mb-8">
          <Link href="/marketplace">
            <FaArrowLeftLong
              size={20}
              className="text-[#797979] dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            />
          </Link>
          <h1 className="text-2xl font-bold dark:text-white">Checkout</h1>
        </div>
      )}

      {hasItems ? (
        <>
          {/* Warning for unavailable items */}
          {unavailableItems.length > 0 && (
            <div className="mb-6 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
              <div className="flex flex-col space-y-3">
                <div className="flex items-start gap-3">
                  <IoAlertCircleOutline className="text-amber-500 dark:text-amber-400 text-xl flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-amber-800 dark:text-amber-300 font-medium">
                      Unavailable Items Detected
                    </p>
                    <p className="text-amber-700/80 dark:text-amber-300/80 text-sm mt-1">
                      {unavailableItems.length} item
                      {unavailableItems.length > 1 ? "s" : ""} in your cart{" "}
                      {unavailableItems.length > 1 ? "are" : "is"} no longer
                      available for purchase.
                    </p>
                  </div>
                  <button
                    onClick={removeUnavailableItems}
                    className="text-sm flex items-center justify-center gap-2 w-full sm:w-auto sm:self-end px-4 py-2.5 bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-medium rounded-lg transition-colors"
                  >
                    <IoTrash
                      className="text-amber-700 dark:text-amber-300"
                      size={16}
                    />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div className="bg-white dark:bg-[#1C1C1C] dark:border-none shadow-lg border border-[#E3E3E8] h-fit dark:bg-bg-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold dark:text-white">
                  Your Cart ({refreshedItems.length}{" "}
                  {refreshedItems.length === 1 ? "item" : "items"})
                </h2>

                {/* Refresh all button */}
                <button
                  onClick={() => {
                    setIsRefreshing(true);
                    refreshData(true);
                  }}
                  className="text-sm text-[#CC8F00] dark:text-gold-200 hover:underline flex items-center gap-1"
                >
                  {isRefreshing ? (
                    <SpinnerLoader width={16} height={16} color="#CC8F00" />
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                  {isRefreshing ? "Refreshing..." : "Refresh all"}
                </button>
              </div>

              {/* Cart item list */}
              <div className="space-y-4">
                {refreshedItems.map((item) => {
                  const {
                    image,
                    discriminant,
                    id,
                    finalized,
                    owner,
                    listingPrice,
                  } = extractNFTProperties(item);

                  const isCopied = copiedIds[id] || false;
                  const isUnavailable = unavailableItems.includes(id);

                  return (
                    <div
                      key={id}
                      className={`flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 ${
                        isUnavailable ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* NFT Image */}
                        <div className="w-8 h-8 sm:w-16 sm:h-16 relative bg-gold-100 dark:bg-gold-dark-100 rounded-lg">
                          <Image
                            src={image || ""}
                            alt={`JAPAUL GOLD NFT #${discriminant}`}
                            width={64}
                            height={64}
                            className="object-contain p-2"
                          />
                          {isUnavailable && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                              <span className="text-xs text-white font-medium px-1">
                                Unavailable
                              </span>
                            </div>
                          )}
                        </div>

                        {/* NFT Details */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xs sm:text-lg font-semibold dark:text-white">
                              JPNFT#{discriminant}
                            </h3>
                            {finalized && (
                              <MdVerified className="text-gold-200" size={20} />
                            )}
                          </div>
                          <p className="text-xs sm:text-lg text-black/65 dark:text-white/65">
                            Current owner
                          </p>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-[#050706] dark:text-white/70">
                              {truncateAddress(owner)}
                            </span>
                            {isCopied ? (
                              <span className="text-xs font-medium text-green-500">
                                Copied!
                              </span>
                            ) : (
                              <LuCopy
                                onClick={() => handleCopyAddress(id, owner)}
                                className="text-sm text-[#050706] dark:text-white/70 cursor-pointer hover:text-[#CC8F00] dark:hover:text-[#CC8F00] transition-colors"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price and Remove Button */}
                      <div className="flex items-center gap-4">
                        <span className="font-semibold dark:text-white">
                          ${listingPrice?.toLocaleString() || 0}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#1C1B1F] dark:text-white/70 hover:text-red-500 dark:hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <IoTrash size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order summary */}
            <OrderSummary
              nfts={
                unavailableItems.length > 0
                  ? refreshedItems.filter(
                      (item) => !unavailableItems.includes(item.id)
                    )
                  : refreshedItems
              }
            />
          </div>
        </>
      ) : (
        // Empty cart view
        <div className="bg-white dark:bg-[#1C1C1C] dark:border-none shadow-lg border border-[#E3E3E8] rounded-lg p-8 md:p-12 max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center py-8">
            {/* Empty cart icon with decorative elements */}
            <div className="relative mb-6">
              <div className="absolute -top-4 -right-4">
                <HiOutlineSparkles
                  size={24}
                  className="text-gold-200 animate-pulse"
                />
              </div>
              <div className="w-24 h-24 bg-[#F8F0DF] dark:bg-[#332A16]/30 rounded-full flex items-center justify-center">
                <FaShoppingCart
                  size={40}
                  className="text-[#CC8F00] dark:text-gold-200"
                />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <HiOutlineSparkles
                  size={16}
                  className="text-gold-200 animate-pulse"
                />
              </div>
            </div>

            {/* Empty cart message */}
            <h2 className="text-2xl font-bold text-[#050706] dark:text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-[#797979] dark:text-gray-400 mb-8 max-w-md">
              Looks like you haven&apos;t added any NFTs to your cart yet.
              Discover our unique gold-backed NFTs in the marketplace.
            </p>

            {/* CTA button */}
            <Link href="/marketplace">
              <button className="px-8 py-3 bg-gold-200 hover:bg-gold-300 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
                Browse Marketplace
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M4.16699 10H15.8337"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8337 5L15.8337 10L10.8337 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
