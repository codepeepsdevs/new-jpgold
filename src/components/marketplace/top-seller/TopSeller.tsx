import images from "../../../../public/images";
import NFTCard from "../../cards/NFTCards";

const topSellerData = [
    {
        id: 1,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
    {
        id: 2,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
    {
        id: 3,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
    {
        id: 4,
        amount: 5.8,
        price: 1455.92,
        imageUrl: images.marketplace.nftGold,
        verified: true
    },
];

const TopSeller = () => {
    return (
        <section className="w-full">
            <h2 className="text-2xl dark:text-white font-bold mb-6 px-4 lg:px-0">Top Sellers</h2>

            {/* Mobile slider view */}
            <div className="sm:hidden w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-4 snap-x snap-mandatory">
                    {topSellerData.map((nft) => (
                        <div key={nft.id} className="min-w-[280px] snap-start">
                            <NFTCard {...nft} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop grid view */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {topSellerData.map((nft) => (
                    <NFTCard key={nft.id} {...nft} />
                ))}
            </div>
        </section>
    );
};

export default TopSeller;
