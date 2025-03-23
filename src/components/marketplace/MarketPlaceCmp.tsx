import MarketPlaceHero from "./MarketPlace.hero";
import FeaturedNfts from "./FeaturedNfts";
import NFTList from "./NFTList";

const MarketPlaceCmp = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="container mx-auto space-y-4 py-8">
        <MarketPlaceHero />
        <FeaturedNfts />
        <NFTList />
        {/* Add other marketplace components here */}
      </div>
    </div>
  );
};

export default MarketPlaceCmp;
