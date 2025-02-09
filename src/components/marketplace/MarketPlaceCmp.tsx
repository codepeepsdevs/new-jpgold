import images from "../../../public/images";
import Image from "next/image";
import MarketPlaceHero from "./MarketPlace.hero";

const MarketPlaceCmp = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="container mx-auto">
        <MarketPlaceHero />
      </div>
    </div>
  );
};

export default MarketPlaceCmp;