"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { MdVerified } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import Link from "next/link";
import OrderSummary from "./OrderSummary";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  extractNFTProperties,
  truncateAddress,
} from "@/utils/utilityFunctions";
import { LuCopy } from "react-icons/lu";

const Cart: FC = () => {
  const { items, removeItem } = useCartStore();
  // Track copied state by item ID instead of a single state
  const [copiedIds, setCopiedIds] = useState<Record<string, boolean>>({});

  const handleCopyAddress = (id: string, address: string) => {
    navigator.clipboard.writeText(address);

    // Set this specific item as copied
    setCopiedIds((prev) => ({ ...prev, [id]: true }));

    // Reset after 3 seconds
    setTimeout(() => {
      setCopiedIds((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  return (
    <div className="container mx-auto py-8">
      {/* Back button and title */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/marketplace">
          <FaArrowLeftLong
            size={20}
            className="text-[#797979] dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          />
        </Link>
        <h1 className="text-2xl font-bold dark:text-white">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="bg-white dark:bg-[#1C1C1C] dark:border-none shadow-lg border border-[#E3E3E8] h-fit dark:bg-bg-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">
            Your Cart
          </h2>
          <div className="space-y-4">
            {items.map((item) => {
              const {
                image,
                discriminant,
                id,
                finalized,
                owner,
                listingPrice,
              } = extractNFTProperties(item);

              // Check if this specific item is copied
              const isCopied = copiedIds[id] || false;

              return (
                <div
                  key={id}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 sm:w-16 sm:h-16 relative bg-gold-100 dark:bg-gold-dark-100 rounded-lg">
                      <Image
                        src={image || ""}
                        alt={`JAPAUL GOLD NFT #${discriminant}`}
                        width={64}
                        height={64}
                        className="object-contain p-2"
                      />
                    </div>
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
                  <div className="flex items-center gap-4">
                    <span className="font-semibold dark:text-white">
                      ${listingPrice?.toLocaleString() || 0}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#1C1B1F] dark:text-white/70 hover:text-red-500 dark:hover:text-red-500 transition-colors"
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
        {items.length > 0 && <OrderSummary nfts={items} />}
      </div>
    </div>
  );
};

export default Cart;
