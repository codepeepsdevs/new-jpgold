"use client";
import Image from "next/image";
import images from "../../../public/images";
import Toggler from "../Toggler";

const Tickerbar = () => {
  return (
    <div className="w-full  flex justify-center bg-bg-200 dark:bg-bg-600 py-2">
      <div className="container flex max-lg:flex-col items-center justify-center lg:justify-between">
        <div className="flex items-center gap-1 xs:gap-3">
          <div className="flex items-center">
            <Image
              alt="jpgoldLogo"
              src={images.jpgoldLogo}
              className="w-8 lg:w-10"
            />
            <p className="font-isemibold text-sm lg:text-base xl:text-lg text-text-200 dark:text-white">
              JPGoldCoin
            </p>
          </div>
          <Toggler />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Tickerbar;
