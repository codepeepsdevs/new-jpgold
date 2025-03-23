"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import NFTPreview from "@/components/marketplace/NFTPreview";
import OrderSummary from "../cart/OrderSummary";
import { useParams } from "next/navigation";
import { useGetNft } from "@/api/jpgnft/jpgnft.queries";
import SpinnerLoader from "@/components/SpinnerLoader";
import { IoAlertCircleOutline } from "react-icons/io5";

const BuyNowCmp = () => {
  const { id } = useParams<{ id: string }>();
  const { nftData, isLoading, error } = useGetNft({ id });

  // Loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-[#0E0E10] bg-opacity-80 dark:bg-opacity-80 z-50">
        <div className="flex flex-col items-center justify-center">
          <SpinnerLoader width={60} height={60} color="#CC8F00" />
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
            Loading NFT data...
          </p>
        </div>
      </div>
    );
  }

  // Empty or error state
  if (!nftData?.nft || error) {
    return (
      <div className="md:container mx-auto py-16 px-4">
        <div className="mb-8">
          <Link
            href="/marketplace"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-xl font-medium">Back to Marketplace</span>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
            <IoAlertCircleOutline className="text-4xl text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            NFT Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
            {error
              ? "There was an error loading this NFT."
              : "The NFT you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/marketplace"
            className="px-6 py-3 bg-[#CC8F00] hover:bg-[#B37E00] text-white font-medium rounded-lg transition-colors"
          >
            Browse Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Success state - NFT data exists
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
        {/* Pass the NFT data to the preview component */}
        <NFTPreview {...nftData.nft} />

        {/* Order summary */}
        <OrderSummary nfts={[nftData.nft]} />
      </div>
    </div>
  );
};

export default BuyNowCmp;
