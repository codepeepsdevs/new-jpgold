"use client";
import { SectionWrapper } from "@/utils/hoc";
import images from "../../../../public/images";
import { motion } from "framer-motion";
import Image from "next/image";
import classNames from "classnames";

const data = [
  {
    id: 1,
    title: "Gold Pegging",
    description:
      "Each JPGC token is pegged to 1 gram of physical gold, ensuring its value is tied to gold's stable worth, offering investors a secure, transparent asset reflecting gold's real-world value.",
    image: images.home.elements.element1,
  },
  {
    id: 2,
    title: "NFT Certificates for Mining",
    description:
      "JPGC uses NFTs as certificates for gamers to mine gold, with each NFT linked to gold and increasing in value as the player's mining progress grows.",
    image: images.home.elements.element2,
  },
  {
    id: 3,
    title: "Gold Reserves",
    description:
      "Japaul Gold manages reserves in secure vaults, offering real-time tracking and  audits to ensure JPGC tokens are fully backed by gold, ensuring transparency.",
    image: images.home.elements.element3,
  },
  {
    id: 4,
    title: "Redemption Mechanism",
    description:
      "JPGC holders can redeem tokens for physical gold with a minimum of 500 JPGC (0.5 kg), but are responsible for any fees and taxes during the redemption process.",
    image: images.home.elements.element4,
  },
  {
    id: 5,
    title: "Token Issuance",
    description:
      "JPGC uses a fixed-supply system, minting tokens only when gold is added to reserves, ensuring each token is fully backed by gold, maintaining stability and preserving its intrinsic value.",
    image: images.home.elements.element5,
  },
  {
    id: 6,
    title: "Regulatory Assurance",
    description:
      "JPGC is audited and regulated by an approved authority, ensuring compliance with financial regulations and providing investors confidence in the platform's credibility and security.",
    image: images.home.elements.element6,
  },
  {
    id: 7,
    title: "Low-Cost-Investment",
    description:
      "JPGC makes gold ownership affordable by storing tokens in digital wallets, simplifying buying, selling, and management, and expanding investment opportunities.",
    image: images.home.elements.element7,
  },
  {
    id: 8,
    title: "Smart Contract Benefits",
    description:
      "JPGC integrates with DeFi protocols, enabling yield farming through staking, and smart asset management with automated trading and portfolio rebalancing.",
    image: images.home.elements.element8,
  },
];

const Elements = () => {
  return (
    <div className="w-full flex">
      <div className="container w-full flex flex-col gap-12 2xs:gap-16 sm:gap-24">
        <div className="flex flex-col w-[95%] 2xs:w-[85%] xs:w-[75%] sm:w-[65%] md:w-[55%] xl:w-[45%] 2xl:w-[35%] gap-3">
          <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Core Elements of JPGC&apos;s Tokenomics{" "}
          </h1>
        </div>

        <div className="w-full grid grid-cols-1 2xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 2xl:gap-x-8 gap-y-8 xs:gap-y-10 sm:gap-y-12">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className={classNames(
                "flex flex-col gap-2.5 md:gap-3 2xs:pl-4 sm:pl-6 2xl:pl-8 2xs:border-l border-[#EAF2E2] dark:border-[#3D3D3D]",
                {}
              )}
            >
              <Image
                alt="brand"
                src={item.image}
                className="w-6 sm:w-7 2xl:w-8"
              />
              <div className="flex flex-col gap-1.5 md:gap-2">
                <h2 className="font-semibold text-sm sm:text-base text-[#0B0B0D] dark:text-[#D9D9D9]">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#6C7574] dark:text-[#FFFFFFB2] leading-5 md:leading-6 2xl:leading-7">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Elements);
