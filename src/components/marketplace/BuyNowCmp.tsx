"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import NFTPreview from "@/components/marketplace/NFTPreview";
import OrderSummary from "../cart/OrderSummary";
import images from "../../../public/images";
import { useParams } from "next/navigation";

// Mock data - replace with actual data fetching
const getNFTData = (id: string) => ({
  id,
  imageUrl: images.marketplace.nftGold,
  owner: "tunde.badamosi@gmail.com",
  tokenOwner: "0xA0b8...e5f8",
  amount: "32.34g",
  currentPrice: 113.23,
  listedPrice: 74.4,
  description: "This is one of a kind.",
});

const BuyNowCmp = () => {
  const { id } = useParams<{ id: string }>();

  const nftData = getNFTData(id);

  // Calculate prices based on the NFT data
  const subtotal = nftData.currentPrice;
  const feeInGrams = 34; // 34g fee
  const feePercentage = 0.15;
  // const feeAmount = subtotal * (feePercentage / 100);
  // const total = subtotal + feeAmount;
  const maticRate = 145.973;

  return (
    <div className="md:container mx-auto py-8 px-4">
      {/* Header with back button */}
      <div className="mb-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <FaArrowLeft className="mr-2" />
          <span className="text-xl font-medium">Checkout</span>
        </Link>
      </div>

      <div className="md:container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NFTPreview {...nftData} />

        {/* Order summary */}
        <OrderSummary
          subtotal={subtotal}
          fee={feeInGrams}
          feePercentage={feePercentage}
          maticRate={maticRate}
        />
      </div>
    </div>
  );
};

export default BuyNowCmp;
