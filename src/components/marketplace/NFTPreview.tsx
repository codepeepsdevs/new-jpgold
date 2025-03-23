import Image, { StaticImageData } from "next/image";
import { MdVerified } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { NFTAsset } from "@/constants/types";
import {
  extractNFTProperties,
  formatNumberWithoutExponential,
  truncateAddress,
} from "@/utils/utilityFunctions";
import classNames from "classnames";
import { LuCopy } from "react-icons/lu";
import { useState } from "react";
import { dynamicFrontendUrl } from "@/constants";
import { toast } from "react-hot-toast";

const NFTPreview = (nft: NFTAsset) => {
  const [copied, setCopied] = useState(false);

  const {
    image,
    description,
    discriminant,
    owner,
    name,
    weight,
    price,
    listingPrice,
    rate,
    id,
  } = extractNFTProperties(nft);

  // Handle sharing the NFT
  const handleShare = async () => {
    // Construct the share data
    const shareData = {
      title: `JPGNFT #${discriminant}`,
      text: `Check out this gold NFT: ${weight} grams of gold valued at $${listingPrice}`,
      url: `${dynamicFrontendUrl}/marketplace/${id}`,
    };

    // Check if Web Share API is supported
    if (navigator.share && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        toast.success("Thanks for sharing!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast.error("Sharing failed");
          console.error("Error sharing:", error);
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        console.error("Clipboard copy failed:", error);
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-[#E3E3E8] h-fit dark:bg-[#1C1C1C] dark:border-none">
      {/* NFT Image */}
      <div className="w-full mx-auto bg-[#FEFEF1]/50 dark:bg-[#FBF5DE]/10 rounded-lg p-4 mb-4">
        <div className="relative mx-auto h-60 w-60 aspect-square mb-6">
          <Image
            src={image as StaticImageData}
            alt={`JPGNFT #${discriminant}`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* NFT Title and Share */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold dark:text-white">
            JPGNFT #{discriminant}
          </h1>
          <MdVerified className="text-gold-200" size={24} />
        </div>
        <button
          className="p-3 dark:bg-white/5 bg-black/5 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          onClick={handleShare}
          aria-label="Share NFT"
        >
          <IoMdShare className="text-[#1C1B1F] dark:text-white" size={20} />
        </button>
      </div>

      {/* NFT Details */}
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 dark:text-white/65">Owner</p>
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

        {/* tokens */}
        <div className="grid grid-cols-1 gap-4 bg-[#F7F7F7]/50 dark:bg-black/50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <p className="text-black/65 dark:text-white/65">Name</p>
            <p className="font-medium dark:text-white">{name}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-black/65 dark:text-white/65">Amount</p>
            <p className="font-medium dark:text-white">{weight} grams</p>
          </div>

          {price && (
            <div className="flex justify-between items-center">
              <p className="text-black/65 dark:text-white/65">Current price</p>
              <p className="font-medium dark:text-white">
                ${formatNumberWithoutExponential(price, 3)}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="text-black/65 dark:text-white/65">Listed price</p>
            <p className="font-medium dark:text-white">${listingPrice}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-black/65 dark:text-white/65">Rate</p>
            <span
              className={classNames("font-medium", {
                "text-[#63BA23]": rate.status === "low",
                "text-[#D20832]": rate.status === "high",
                "text-primary": rate.status === "stable",
              })}
            >
              {rate.status === "low" ? "▲" : rate.status === "high" ? "▼" : ""}
              {rate.value}%
            </span>{" "}
          </div>
        </div>

        <div>
          <p className="text-black/65 dark:text-white/65">Description</p>
          <p className="dark:text-white">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTPreview;
