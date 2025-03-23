"use client";

import { MdOutlineShoppingCart, MdVerified } from "react-icons/md";
import Image from "next/image";
import { FC, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { BiTrash } from "react-icons/bi";
import SellNFTModal from "@/components/modals/SellNFTModal";
import { NFTAsset } from "@/constants/types";
import useNavigate from "@/hooks/useNavigate";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import images from "@/public/images";
import {
  extractNFTProperties,
  formatNumberWithoutExponential,
} from "@/utils/utilityFunctions";

const NFTCard: FC<{
  nft: NFTAsset;
  type: "marketplace" | "user";
}> = ({ nft, type }) => {
  const navigate = useNavigate();
  const { address } = useWalletInfo();

  const { addItem, removeItem, items } = useCartStore();

  const [selectedNFT, setSelectedNFT] = useState<NFTAsset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    id,
    owner,
    image,
    discriminant,
    finalized,
    weight,
    price,
    listed,
    listingPrice,
  } = extractNFTProperties(nft);

  const isInCart = items.some((item) => item.id === id);
  const myNFT = owner === address;
  const activePrice = listed ? listingPrice : price;

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      removeItem(id);
    } else {
      addItem(nft);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/marketplace/${id}`);
  };

  const handleCardClick = () => {
    if (type === "marketplace") {
      navigate(`/marketplace/${id}`);
    }

    if (myNFT && type === "user") {
      setSelectedNFT(nft);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="dark:bg-bg-dark-500 rounded-lg transition-transform hover:cursor-pointer duration-200 hover:-translate-y-[0.2rem] shadow-lg">
      <div
        onClick={handleCardClick}
        className="h-[200px] rounded-t-xl border-[1px] border-[#FBF5DE] dark:border-none relative bg-gold-100/50 dark:bg-gold-dark-100 p-4"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            src={image || images.user.coin}
            alt={`JPNFT #${discriminant}`}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>

      <div className=" p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base xl:text-xl dark:text-white font-bold">
            JPNFT#{discriminant}
          </h3>
          {finalized && <MdVerified className="text-gold-200" size={20} />}
        </div>

        <div className="pt-2 flex justify-between text-sm text-black/70 dark:text-white/70 dark:text-gray-400">
          <span>Amount</span>
          <span>{listed ? "Listed price" : "Price"}</span>
        </div>

        <div className="capitalize flex justify-between font-bold text-black dark:text-white pb-4 mt-1">
          <span className="">{weight ? `${weight}g` : `pending `}</span>
          <span className="">
            {activePrice
              ? `$${formatNumberWithoutExponential(activePrice, 1)}`
              : `pending `}
          </span>
        </div>

        {type === "user" ? null : (
          <>
            <hr />

            <div className="w-full flex justify-between items-center gap-2 mt-4">
              <button
                onClick={handleBuyNow}
                className="w-3/6 bg-gold-200 p-3 font-medium text-white rounded-lg"
              >
                Buy NFT
              </button>
              <button
                onClick={handleCartClick}
                className={`w-3/6 bg-black/5 dark:bg-white/5 h-fit hover:bg-primary-600 p-3 rounded-lg transition-colors duration-200`}
              >
                <div className="top-0 h-full rounded-r-lg flex items-center justify-center">
                  {isInCart ? (
                    <BiTrash
                      className="text-red-500 dark:text-red-500"
                      size={25}
                    />
                  ) : (
                    <MdOutlineShoppingCart
                      className={"text-black dark:text-white"}
                      size={25}
                    />
                  )}
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {selectedNFT && (
        <SellNFTModal
          nft={nft}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedNFT(null);
          }}
        />
      )}
    </div>
  );
};

export default NFTCard;
