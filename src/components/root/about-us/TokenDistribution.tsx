"use client";

interface TokenData {
  category: string;
  percentage: number;
}

const tokenData: TokenData[] = [
  { category: "Public Sale", percentage: 60 },
  { category: "Team & Investor (Private)", percentage: 10 },
  { category: "Strategic Acquisition", percentage: 15 },
  { category: "Rewards", percentage: 7 },
  { category: "Humanitarian", percentage: 7 },
  { category: "Project Development", percentage: 6 },
  { category: "Reserves", percentage: 20 },
];

const TokenDistribution = () => {
  return (
    <div className="w-full max-md:bg-[#FBF9E9] dark:max-md:bg-[#1D1F1C] py-8">
      <div className="container md:bg-[#FBF9E9] dark:md:bg-[#1D1F1C] w-full flex flex-col md:rounded-xl justify-center items-center gap-4 xs:gap-6 md:gap-8 py-8 xs:py-10 sm:py-12 lg:py-16 px-2.5 xs:px-4 sm:px-6 md:px-12">
        <div className="w-full flex justify-center items-center text-center">
          <h2 className="w-full 2xs:w-[95%] xs:w-[85%] sm:w-[75%] lg:w-[65%] 2xl:w-[60%] text-[#050706] dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Token Distribution
          </h2>
        </div>

        <div
          style={{
            boxShadow: "0px 0px 0px 1px #0000000D",
            backdropFilter: "blur(4px)",
          }}
          className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] py-4 xs:py-6 sm:py-8 px-4 xs:px-6 sm:px-8 flex flex-col gap-2.5 2xs:gap-4 md:gap-6 mt-4 bg-white dark:bg-[#0F0F0F] rounded-lg xs:rounded-xl border border-[#DDDDDD] dark:border-[#333333]"
        >
          {tokenData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 text-[#2D2F2E] dark:text-white"
            >
              <div className="w-24 2xs:w-32 xs:w-36 sm:w-44 md:w-48  text-[8px] 2xs:text-[10px] xs:text-xs sm:text-sm md:text-base font-medium">
                {item.category}
              </div>
              <div className="flex-1 relative h-1 2xs:h-1.5 xs:h-2 sm:h-2.5 md:h-3">
                <div className="absolute w-full h-full bg-[#F5F5F5] dark:bg-[#232323] rounded-full" />
                <div
                  className="absolute h-full bg-[#EBC12E] rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="w-6 2xs:w-8 xs:w-12 md:w-16 font-medium text-right text-[8px] 2xs:text-[10px] xs:text-xs sm:text-sm md:text-base ">
                {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenDistribution;
