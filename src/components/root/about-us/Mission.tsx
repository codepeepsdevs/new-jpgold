import React from "react";

const data = [
  {
    title: "Our Mission",
    contents: [
      "To empower investors with a secure, stable, and innovative platform that merges the intrinsic value of gold with the potential of blockchain technology, offering a reliable pathway to wealth preservation and financial growth.",
    ],
  },
  {
    title: "What Makes JPGold Coin Unique?",
    contents: [
      "JPGC is a gold-backed cryptocurrency that merges the intrinsic value of gold with the transparency of blockchain technology. Each JPGC token is directly backed by physical gold, mined, stored, and vaulted by Japaul Gold and Ventures, a reputable gold mining company with active operations.",
      "Compared to altcoins like BTC, the JPGold Coin offers a better value for your cryptocurrency investment. Being backed by physical gold implies your investment is safeguarded and your wealth is sustained. Your investment value is preserved and guaranteed.",
    ],
  },
];

const Mission = () => {
  return (
    <div className="w-full">
      <div className="container w-full flex flex-col gap-8 xs:gap-10 lg:gap-12">
        {data.map((item, index) => (
          <div
            className="w-full flex flex-col gap-4 xs:gap-6 lg:gap-8"
            key={index}
          >
            <h2 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
              {item.title}
            </h2>
            <div className="flex flex-col gap-4 lg:gap-6">
              {item.contents.map((content, index) => (
                <p
                  className="text-base sm:text-lg xl:text-xl text-[#000000CC] dark:text-[#FFFFFFCC]"
                  key={index}
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mission;
