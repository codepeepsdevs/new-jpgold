"use client";

import Link from "next/link";
import UserCard from "@/components/UserCard";
import { IoWalletOutline } from "react-icons/io5";
import NFTCard from "@/components/cards/NFTCards";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { useGetNftsByOwner } from "@/api/jpgnft/jpgnft.queries";
import { SortByEnum, SortDirectionEnum } from "@/api/jpgnft/jpgnft.types";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";
import SkeletonComponent from "@/components/Skeleton";
import { scrollToTop } from "@/utils/utilityFunctions";

const NftsPrivateContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const { address, connected } = useWalletInfo();
  const { nftData, isLoading } = useGetNftsByOwner({
    address: address!,
    sortBy: {
      sortBy: SortByEnum.CREATED,
      sortDirection: SortDirectionEnum.DESC,
    },
    page: currentPage,
    limit: itemsPerPage,
  });

  const hasNFTs = nftData?.nfts && nftData.nfts.length > 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      scrollToTop({
        id: "my-nfts",
        type: "scrollIntoView",
      });
    }, 10);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
  };

  return (
    <div id="" className="h-full min-h-screen space-y-6">
      <UserCard>
        <div className="px-2.5 2xs:px-4 py-1 2xs:py-4 sm:px-6 sm:py-6">
          {connected && hasNFTs && (
            <h2 className="text-2xl font-bold dark:text-white mb-6">
              Private NFTS
            </h2>
          )}

          {connected ? (
            <>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center text-center py-2 sm:py-4">
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonComponent
                        key={index}
                        style={{
                          borderRadius: "0.5rem",
                        }}
                        className="px-10 py-2 w-full border border-[#E6E6E6] dark:border-[#3D3D3D] h-60"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {!hasNFTs ? (
                    // Empty state
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <div className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600">
                        <IoWalletOutline size={80} />
                      </div>
                      <h3 className="text-xl font-semibold text-[#050706] dark:text-white mb-2">
                        You don&apos;t have any private NFT yet
                      </h3>
                      <p className="text-base text-[#5A5A5A] dark:text-gray-400 mb-6">
                        Add NFT to your private collection
                      </p>
                      <Link
                        href="/user/jpgoldnft/buy"
                        className="inline-flex items-center font-semibold justify-center rounded-full px-10 py-3 bg-black dark:bg-gold-200 text-white transition-colors"
                      >
                        Buy NFT
                      </Link>
                    </div>
                  ) : (
                    // NFTs grid
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {nftData?.nfts.map((nft) => (
                        <NFTCard key={nft.id} nft={nft} type={"user"} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600">
                <IoWalletOutline size={80} />
              </div>
              <h3 className="text-xl font-semibold text-[#050706] dark:text-white mb-2">
                Connect Solana Wallet{" "}
              </h3>
              <p className="text-base text-[#5A5A5A] dark:text-gray-400 mb-6">
                To view your private Japaul gold NFTs
              </p>
            </div>
          )}
        </div>
        <div className="mt-4">
          {nftData && (
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </UserCard>
    </div>
  );
};

export default NftsPrivateContent;
