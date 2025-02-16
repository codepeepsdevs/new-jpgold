"use client";
import { SectionWrapper } from "@/utils/hoc";

const Newsletter = () => {
  return (
    <div className="w-full flex bg-[#F7F7F7] dark:bg-[#1D1F1C] pt-24 pb-32 lg:pt-28 lg:pb-28 xl:pt-32 xl:pb-32">
      <div className="container  flex flex-col justify-center items-center gap-4 sm:gap-6 xl:gap-8">
        <div className="flex flex-col justify-center items-center text-center w-full 2xs:w-[90%] xs:w-[80%] sm:w-[70%] md:w-[55%] xl:w-[40%] 2xl:w-[35%] gap-3">
          <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Subscribe to Our Newsletter{" "}
          </h1>
        </div>

        <div className="w-[95%] 2xs:w-[85%] xs:w-[75%] sm:w-[70%] md:w-[60%] xl:w-[45%] flex flex-col justify-center text-center items-center gap-5 xl:gap-6">
          <p className="text-xs 2xs:text-sm lg:text-base text-[#000000B2] dark:text-[#FFFFFFB2]">
            Stay updated with our latest insights, product updates, and tech
            industry news. Get weekly curated content delivered straight to your
            inbox, including coding tips, development best practices, and
            emerging tech trends.
          </p>
          <div className="w-full flex items-center h-full sm:px-1 xl:px-3">
            <input
              type="text"
              placeholder="Your Email Address"
              className="w-[65%] 2xs:w-[70%] lg:w-[75%] px-4 py-3 rounded-l sm:rounded-l-md outline-none border border-[#D3D3D3] bg-white placeholder:text-[#959595] text-sm  xs:text-base"
            />
            <button className="w-[35%] 2xs:w-[30%] lg:w-[25%] h-full bg-primary  text-white p-2 rounded-r sm:rounded-r-md font-medium text-sm xs:text-base">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Newsletter);
