"use client";
import { useGetFeaturedListedNfts } from "@/api/jpgnft/jpgnft.queries";
import NFTCard from "../cards/NFTCards";
import SkeletonComponent from "../Skeleton";

const FeaturedNfts = () => {
  const { nftData, isLoading } = useGetFeaturedListedNfts();

  const hasNFTs = nftData?.nfts && nftData.nfts.length > 0;

  return (
    <section className="w-full">
      {!hasNFTs && !isLoading ? null : (
        <>
          {" "}
          <h2 className="text-2xl dark:text-white font-bold mb-6 px-4 lg:px-0">
            Featured NFTs
          </h2>
          {/* Mobile slider view */}
          <div className="sm:hidden w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4 snap-x snap-mandatory">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonComponent
                      key={index}
                      style={{
                        borderRadius: "0.5rem",
                      }}
                      className="px-10 py-2 w-full min-w-[280px] border border-[#E6E6E6] dark:border-[#3D3D3D] h-60"
                    />
                  ))
                : nftData.nfts.map((nft) => (
                    <div key={nft.id} className="min-w-[280px] snap-start">
                      <NFTCard nft={nft} type="marketplace" />
                    </div>
                  ))}
            </div>
          </div>
          {/* Desktop grid view */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonComponent
                    key={index}
                    style={{
                      borderRadius: "0.5rem",
                    }}
                    className="px-10 py-2 w-full border border-[#E6E6E6] dark:border-[#3D3D3D] h-60"
                  />
                ))
              : nftData.nfts.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} type="marketplace" />
                ))}
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedNfts;
