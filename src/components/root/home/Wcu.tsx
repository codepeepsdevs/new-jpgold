"use client";
import { SectionWrapper } from "@/utils/hoc";
import images from "../../../../public/images";
import { motion } from "framer-motion";
import Image from "next/image";

const data = [
  {
    title: "Hedge against Inflation",
    description:
      "JPGold Coin hedges against inflation, maintaining value as fiat currency purchasing power declines",
    image: images.home.wcu1,
  },
  {
    title: "Profitable",
    description:
      "One of the best cryptocurrencies, offering value exchange, transferability, security, and portability with JPGold NFTs.",
    image: images.home.wcu2,
  },
  {
    title: "Collateral",
    description:
      "JPGold NFT serves as collateral, enabling transactions and securing loans for assets like cars and homes.",
    image: images.home.wcu3,
  },
];

const Wcu = () => {
  return (
    <div className="w-full flex">
      <div className="container w-full flex flex-col gap-20 sm:gap-24">
        <div className="flex flex-col w-full 2xs:w-[95%] sm:w-full max-sm:justify-center max-sm:items-center max-sm:text-center gap-1">
          <h2 className="text-[#00000066] dark:text-[#FFFFFFB2] font-imedium text-2xl lg:text-3xl xl:text-4xl">
            Money for a New Generation.
          </h2>
          <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Secure, Easy to sell, and Transparent
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-3.5">
          {data.map((item, index) => (
            <motion.div
              //   variants={scaleVariants}
              //   whileInView={scaleVariants.whileInView}
              key={index}
              className=" relative w-full h-[26rem] sm:h-[28rem] xl:h-[30rem] 2xl:h-[32rem] rounded-xl overflow-hidden "
            >
              <div
                className={` absolute inset-0 bg-black opacity-10 z-10 rounded-xl transition-opacity duration-300`}
              ></div>
              <Image
                src={item.image}
                alt={`asset image`}
                style={{ objectFit: "cover" }}
                className="z-0 w-full h-full rounded-xl"
              />
              <div className="z-10 text-white py-6 px-5 2xl:px-6 absolute top-0 flex flex-col justify-between h-full">
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-base  md:min-h-[5rem]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Wcu);
