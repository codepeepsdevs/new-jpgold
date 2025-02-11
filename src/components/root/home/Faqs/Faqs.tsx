"use client";

import { useState } from "react";
import Accordion from "./Accordion";

const Faqs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const AccordionsData = [
    {
      title: "How much is the minimum purchase of JPGold Coin?",
      content: "0.01g >=  $0.75",
    },
    {
      title: "What is JPGold NFT?",
      content:
        "The JPGold NFT is issued as a digital gold certificate. It shows the amount of gold purchased. As the value of gold appreciates, the value of JPGold NFT purchased appreciates.",
    },
    {
      title: "Can I get physical gold?",
      content:
        "Yes. The JPGold NFT is the evidence of physical gold. It can be redeemed for physical gold.",
    },
    {
      title: "When can the gold be redeemed?",
      content: "JPGold NFT can be redeemed for physical gold by 2028.",
    },
    {
      title: "What is JPGC?",
      content:
        "JPGC is the cryptocurrency of JPGold Coin. It is listed and can be traded on LaToken and Uniswap. The value of JPGC does not affect the JPGold NFT.",
    },
  ];

  const handleAccordionToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full flex pb-6">
      <div className="container w-full flex flex-col gap-4 2xs:gap-6 xs:gap-8 md:gap-10 lg:gap-12">
        <div className="flex  w-full items-center justify-between gap-1">
          <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Frequently Asked Questions{" "}
          </h1>
        </div>

        <div className="w-full flex flex-col">
          {AccordionsData.map((item, index) => (
            <Accordion
              key={index}
              title={item.title}
              isOpen={activeIndex === index}
              onToggle={() => handleAccordionToggle(index)}
              isLast={index === AccordionsData.length - 1}
            >
              {item.content}
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
