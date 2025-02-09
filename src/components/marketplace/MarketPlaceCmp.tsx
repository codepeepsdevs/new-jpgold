import images from "../../../public/images";
import Image from "next/image";
import MarketPlaceHero from "./MarketPlace.hero";
import TopSeller from "./top-seller/TopSeller";

const MarketPlaceCmp = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="container mx-auto">
        <MarketPlaceHero />
        <TopSeller />
        {/* Add other marketplace components here */}
      </div>
    </div>
  );
};

export default MarketPlaceCmp;