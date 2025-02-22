"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import UserCard from "@/components/UserCard";
import { IoWalletOutline } from "react-icons/io5";
import images from "@/public/images";
import NFTCard from "@/components/cards/NFTCards";

interface NFT {
  id: number;
  name: string;
  imageUrl: string | StaticImageData;
  price: number;
  amount: number;
  myNFT: boolean;
}

const nftListData: NFT[] = [
  {
    id: 1,
    name: "NFT 1",
    imageUrl: images.marketplace.nftGold,
    price: 1000,
    amount: 1,
    myNFT: true,
  },
  {
    id: 2,
    name: "NFT 2",
    imageUrl: images.marketplace.nftGold,
    price: 1455.92,
    amount: 1,
    myNFT: true,
  },
  {
    id: 3,
    name: "NFT 3",
    imageUrl: images.marketplace.nftGold,
    price: 1455.92,
    amount: 1,
    myNFT: true,
  },
  {
    id: 4,
    name: "NFT 4",
    imageUrl: images.marketplace.nftGold,
    price: 1455.92,
    amount: 1,
    myNFT: true,
  },
  {
    id: 5,
    name: "NFT 5",
    imageUrl: images.marketplace.nftGold,
    price: 1114.53,
    amount: 1,
    myNFT: true,
  },
];

const NftsAllContent = () => {
  const hasNFTs = nftListData.length > 0;

  return (
    <div className="space-y-6">
      <UserCard>
        <div className="p-6">
          <h2 className="text-2xl font-bold dark:text-white mb-6">My NFTS</h2>

          {!hasNFTs ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600">
                <IoWalletOutline size={80} />
              </div>
              <h3 className="text-xl font-semibold text-[#050706] dark:text-white mb-2">
                You don&apos;t have any NFT yet
              </h3>
              <p className="text-base text-[#5A5A5A] dark:text-gray-400 mb-6">
                Add NFT to your collection
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center font-semibold justify-center rounded-full px-10 py-3 bg-black dark:bg-gold-200 text-white transition-colors"
              >
                Buy NFT
              </Link>
            </div>
          ) : (
            // NFTs grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {nftListData.map((nft) => (
                <NFTCard key={nft.id} {...nft} />
              ))}
            </div>
          )}
        </div>
      </UserCard>
    </div>
  );
};

export default NftsAllContent;
