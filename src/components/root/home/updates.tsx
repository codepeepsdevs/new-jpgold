"use client";
import { SectionWrapper } from "@/utils/hoc";
import images from "../../../../public/images";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    id: 1,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog7,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 2,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog4,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 3,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog6,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
  {
    id: 4,
    title: "Tokenomics: JPGold Coin a digital token backed With Gold",
    description:
      "JPGold Coin is a digital token backed by gold from JaPaul LTD., a gold manufacturing company in Ghana that aims to make gold ownership easy and affordable. Though it listed in 2022, the JPGC wa",
    image: images.blog.blog5,
    tag: "Product updates",
    date: "Feb 11, 2025",
    duration: "3 min",
  },
];

const Updates = () => {
  return (
    <div className="w-full flex">
      <div className="container w-full flex flex-col gap-8 2xs:gap-10 md:gap-12 lg:gap-16">
        <div className="flex  w-full items-center justify-between gap-1">
          <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Get Updated{" "}
          </h1>
          <Link
            href="/blogs"
            className="bg-[#F5F5F5] dark:bg-[#555555] text-xs min-[370px]:text-sm xs:text-base font-medium text-[#0B0B0D] dark:text-white px-4 xs:px-6 py-3 xs:py-3.5 rounded-md 2xs:rounded-lg xs:rounded-xl"
          >
            View all articles{" "}
          </Link>
        </div>

        <div className="w-full grid gap-y-8 xs:gap-y-10 xl:gap-y-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 md:gap-x-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="w-full flex flex-col gap-3 2xl:gap-4"
            >
              <div className="flex flex-col gap-3.5 2xl:gap-4">
                <div className="relative w-full h-[16rem] sm:h-[18rem] xl:h-[20rem] rounded-lg sm:rounded-xl overflow-hidden">
                  <div
                    className={` absolute inset-0 bg-black opacity-10 z-10 rounded-lg sm:rounded-xl transition-opacity duration-300`}
                  ></div>
                  <Image
                    src={item.image}
                    alt={`asset image`}
                    style={{ objectFit: "cover" }}
                    className="z-0 w-full h-full rounded-lg sm:rounded-xl"
                  />
                </div>
                <span className="w-fit px-2 py-1.5 rounded-md bg-[#F8F8F8] text-[#0B0B0D] font-medium text-xs">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-col gap-3.5 2xl:gap-4">
                <h2 className="text-[#0B0B0D] dark:text-white font-semibold text-sm lg:text-base">
                  {item.title}
                </h2>
                <p className="text-[#6C7574] dark:text-[#D9D9D9] text-xs lg:text-sm ">
                  {item.description}
                </p>
                <p className="font-medium text-[#0B0B0D] dark:text-white  text-xs">
                  {item.date} -- {item.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Updates);
