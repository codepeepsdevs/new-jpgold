import images from "../../../public/images";
import Image from "next/image";
import MarketPlaceHero from "./MarketPlace.hero";
import TopSeller from "./top-seller/TopSeller";
import NFTList from "./nft-list/NFTList";

const MarketPlaceCmp = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="container mx-auto space-y-4 py-8">
        <MarketPlaceHero />
        <TopSeller />
        <NFTList />
        {/* Add other marketplace components here */}
      </div>
    </div>
  );
};

export default MarketPlaceCmp;