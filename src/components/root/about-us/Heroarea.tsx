import Image from "next/image";
import React from "react";
import images from "../../../../public/images";

const Heroarea = () => {
  return (
    <div className="w-full">
      <div className="container w-full flex flex-col max-md:justify-center max-md:items-center max-md:text-center gap-4 md:gap-6 lg:gap-8 py-10 sm:py-12">
        <p className="text-[#131319] dark:text-[#FFFFFFCC] text-sm md:text-base font-medium">
          About Us
        </p>
        <div className="w-full flex max-md:flex-col items-center md:items-end justify-center md:justify-between gap-4 md:gap-8 lg:gap-10">
          <div className="w-full 2xs:w-[90%] sm:w-[80%] md:w-[50%] lg:w-[55%] xl:w-[60%] 2xl:w-[65%]">
            <h1 className="w-full lg:w-[90%] 2xl:w-[80%] text-[#050706] dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
              Shaping the future, Empowering Societies.{" "}
            </h1>
          </div>

          <p className="w-full 2xs:w-[90%] sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] text-[#131319] dark:text-[#FFFFFFCC] text-sm lg:text-base xl:text-lg">
            <span className="font-bold">Our vision</span> is to position JPGold
            Coin as the giant within the domain of our business endeavor for the
            benefit of many societies.
          </p>
        </div>
        <div className="mt-2 md:mt-6 lg:mt-8 xl:mt-12 relative w-full h-[20rem] sm:h-[22.5rem] xl:h-[25rem] rounded-xl overflow-hidden ">
          <div
            className={` absolute inset-0 bg-black opacity-10 z-10 rounded-xl transition-opacity duration-300`}
          ></div>
          <Image
            src={images.about.aboutHeroBg}
            alt={`asset image`}
            style={{ objectFit: "cover" }}
            className="z-0 w-full h-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroarea;
