"use client";
import { SectionWrapper } from "@/utils/hoc";
import images from "../../../../public/images";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames";
import { useTheme } from "@/store/theme.store";

const data: Record<
  "jpgc" | "jpgnft",
  {
    id: number;
    title: string;
    content: { title: string; description: string }[];
    image: string;
    imageDark: string;
    imagePosition: "left" | "right";
  }[]
> = {
  jpgc: [
    {
      id: 1,
      title: "Store of Value",
      content: [
        {
          title: "Hedge against Inflation",
          description:
            "This stability makes JPGC a superior investment compared to fiat currencies, which are vulnerable to devaluation.",
        },
        {
          title: "Safe Investment",
          description:
            "By maintaining a 1:1 ratio with physical gold (1 JPGC = 1 gram of gold), it provides a predictable and stable asset for investors looking to preserve wealth.",
        },
      ],
      image: images.home.jpgc.jpgcOne,
      imageDark: images.home.jpgc.jpgcOneDark,
      imagePosition: "right",
    },
    {
      id: 2,
      title: "Payment Platform",
      content: [
        {
          title: "Global Transactions",
          description:
            "JPGC’s blockchain integration allows for fast, cost-efficient cross-border payments, making it an ideal currency for international trade and remittances.",
        },
        {
          title: "Merchant Adoption",
          description:
            "Businesses will be able to accept JPGC as payment, offering customers a secure and inflation-resistant alternative to traditional currencies.",
        },
      ],
      image: images.home.jpgc.jpgcTwo,
      imageDark: images.home.jpgc.jpgcTwoDark,
      imagePosition: "left",
    },
    {
      id: 3,
      title: "Decentralized Finance (DeFi) Applications",
      content: [
        {
          title: "Collateral for Loans",
          description:
            "Investors can use JPGC as collateral in DeFi platforms to access loans while maintaining exposure to gold’s value appreciation.",
        },
        {
          title: "Staking and Yield Farming",
          description:
            "Staking and Yield Farming: JPGC holders can earn rewards by staking their tokens, allowing them to generate passive income while holding onto their investment.",
        },
      ],
      image: images.home.jpgc.jpgcThree,
      imageDark: images.home.jpgc.jpgcThreeDark,
      imagePosition: "right",
    },
    {
      id: 4,
      title: "Physical Gold Redemption",
      content: [
        {
          title: "Asset Conversion",
          description:
            "Unlike other volatile cryptocurrencies, JPGC can be exchanged for physical gold, offering investors the flexibility to convert their digital assets. ",
        },
        {
          title: "Ease of Ownership",
          description:
            "Eliminates the need for personal storage or security concerns associated with owning physical gold.",
        },
      ],
      image: images.home.jpgc.jpgcFour,
      imageDark: images.home.jpgc.jpgcFourDark,
      imagePosition: "left",
    },
    {
      id: 5,
      title: "Portfolio Diversification",
      content: [
        {
          title: "Low-risk Investment",
          description:
            "JPGC offers a low-risk addition to investment portfolios, balancing out high-volatility assets such as stocks or cryptocurrencies.",
        },
      ],
      image: images.home.jpgc.jpgcFive,
      imageDark: images.home.jpgc.jpgcFiveDark,
      imagePosition: "right",
    },
  ],

  jpgnft: [
    {
      id: 1,
      title: "Investment Opportunities",
      content: [
        {
          title: "Fractionalization",
          description:
            "Owning a JPG-NFT enables users to easily share portions of their gold with others. Each JPG-NFT can be divided while maintaining its distinct value, allowing users to gift specific amounts of gold. This offers a flexible and secure method to transfer wealth while preserving ownership right",
        },

        {
          title: "Flexibility in Value",
          description:
            "NFTs represent varying amounts of gold, enabling investors to choose investment levels that align with their financial goals.",
        },
      ],
      image: images.home.jpgnft.jpgnftOne,
      imageDark: images.home.jpgnft.jpgnftOneDark,
      imagePosition: "right",
    },

    {
      id: 2,
      title: "Integration in Gaming Ecosystems",
      content: [
        {
          title: "Gold Mining Rewards",
          description:
            'The JPGC’s ecosystem grants access to a "Play-to-Earn" gaming platform where holders can earn extra gold by engaging in games. This integration allows users not to only safeguard their wealth in gold but also explore opportunities to increase their earnings within the JPGC ecosystem.',
        },
      ],
      image: images.home.jpgnft.jpgnftTwo,
      imageDark: images.home.jpgnft.jpgnftTwoDark,
      imagePosition: "left",
    },

    {
      id: 3,
      title: "Marketplace Functionality",
      content: [
        {
          title: "Tradable Assets",
          description:
            "JPG-NFTs can be traded on any NFT marketplace, allowing investors to liquidate or transfer their holdings with ease.",
        },
        {
          title: "Programmable Value",
          description:
            "As smart contracts, JPG-NFTs can be programmed for diverse functionalities, including leasing or integrating into other platforms.",
        },
      ],
      image: images.home.jpgnft.jpgnftThree,
      imageDark: images.home.jpgnft.jpgnftThreeDark,
      imagePosition: "right",
    },

    {
      id: 4,
      title: "Enhanced Asset Mobility",
      content: [
        {
          title: "Global Accessibility",
          description:
            "JPGC and JPG-NFTs ensure that ownership of gold is transferable globally, providing a secure, verifiable way to trade gold-backed assets across borders.",
        },
        {
          title: "Universal Accessibility: ",
          description:
            "By leveraging on blockchain and NFTs, JPGC and JPG-NFTs lower the barrier to gold ownership, offering affordable, secure, and globally accessible opportunities to hold, trade, and invest in gold.",
        },
      ],
      image: images.home.jpgnft.jpgnftFour,
      imageDark: images.home.jpgnft.jpgnftFourDark,
      imagePosition: "left",
    },
  ],
};

const navItems: {
  title: string;
  description: string;
  value: "jpgc" | "jpgnft";
}[] = [
  {
    title: "JPGold Coin (JPGC)",
    description:
      "JPGold Coin (JPGC) has made investing simple for millions around the world.",
    value: "jpgc",
  },
  {
    title: "JPG-NFTs",
    description:
      "JP Gold NFT has made investing simple for millions around the world.",
    value: "jpgnft",
  },
];

const Jpgold = () => {
  const theme = useTheme();
  const [active, setActive] = useState<"jpgc" | "jpgnft">("jpgc");
  return (
    <div className="w-full flex">
      <div className="container w-full flex flex-col items-center gap-16 sm:gap-24">
        <nav className="w-full 2xs:w-[95%] xs:w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] grid grid-cols-2 items-center justify-center bg-[#F8F8F8] dark:bg-[#F8F8F81A] rounded-lg xs:rounded-xl p-1">
          {navItems.map((item, index) => (
            <div
              style={{
                boxShadow:
                  item.value === active
                    ? theme === "light"
                      ? "0px 1px 3px 0px #343A4B29"
                      : "0px 1px 3px 0px #343A4B29"
                    : "",
              }}
              onClick={() => {
                setActive(item.value);
              }}
              key={index}
              className={classNames(
                "cursor-pointer text-center py-3.5 rounded-lg xs:rounded-xl text-sm 2xs:text-base",
                {
                  "bg-[#0A0C0F] dark:bg-white text-white dark:text-black font-medium":
                    item.value === active,
                  "bg-transparent text-[#838171] dark:text-[#FFFFF3]":
                    item.value !== active,
                }
              )}
            >
              {item.title}
            </div>
          ))}
        </nav>
        <div className="w-full flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col w-full 2xs:w-[95%] sm:w-full gap-3">
            <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
              {navItems.find((item) => item.value === active)?.title}
            </h1>
            <h2 className="text-[#000000CC] dark:text-[#FFFFFFCC] text-base  lg:text-lg xl:text-xl">
              {navItems.find((item) => item.value === active)?.description}
            </h2>
          </div>

          <div className="w-full flex flex-col gap-14 lg:gap-16">
            {data[active].map((item, index) => (
              <motion.div
                key={index}
                className={classNames(
                  "w-full max-md:flex-col flex items-center justify-between gap-8 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12",
                  {
                    "flex-row": item.imagePosition === "right",
                    "flex-row-reverse": item.imagePosition === "left",
                  }
                )}
              >
                <div className="w-full md:w-[50%]">
                  <div className="w-full xl:w-[95%] flex flex-col gap-5 md:gap-4 lg:gap-5 xl:gap-6">
                    <h2 className="text-2xl lg:text-3xl text-black dark:text-white font-isemibold">
                      {item.title}
                    </h2>
                    <div className="flex flex-col gap-4 md:gap-3 lg:gap-4 xl:gap-5">
                      {item.content.map((content, index) => (
                        <div
                          key={index}
                          className="text-base lg:text-lg text-[#000000CC] dark:text-[#FFFFFFCC]"
                        >
                          <span className="font-bold">{content.title}: </span>
                          {content.description}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[50%] flex">
                  <Image
                    alt="brand"
                    src={theme === "light" ? item.image : item.imageDark}
                    className={classNames("w-full max-md:p-0", {
                      "pl-6 lg:pl-8 xl:pl-10 2xl:pl-12":
                        item.imagePosition === "right",
                      "pr-6 lg:pr-8 xl:pr-10 2xl:pr-12":
                        item.imagePosition === "left",
                    })}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Jpgold);
