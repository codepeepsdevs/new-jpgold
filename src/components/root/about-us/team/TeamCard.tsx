import Image, { StaticImageData } from "next/image";
import React from "react";
import { FaLinkedin } from "react-icons/fa";

const TeamCard = ({
  name,
  linkedin,
  position,
  image,
}: {
  name: string;
  linkedin: string;
  position: string;
  image: string | StaticImageData;
}) => {
  return (
    <div className="h-[20rem] 2xs:h-[22rem] md:h-[24rem] xl:h-[25rem] px-4 bg-white dark:bg-[#1D1F1C] flex flex-col justify-center items-center gap-1.5 2xs:gap-2 w-full border border-[#DCDCDC] dark:border-[#FFFFFF2B] rounded-2xl">
      <div className=" relative w-28 h-28 2xs:w-32 2xs:h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ">
        <div
          className={` absolute inset-0 bg-black opacity-10 z-10 rounded-2xl transition-opacity duration-300`}
        ></div>
        <Image
          src={image}
          alt={`member image`}
          style={{ objectFit: "cover" }}
          className="z-0 w-full h-full rounded-2xl"
        />
      </div>
      <div className="mt-2 flex items-center gap-2 text-[#050706] dark:text-white">
        <p className="text-lg font-semibold">{name}</p>
        <FaLinkedin
          onClick={() => window.open(linkedin, "_blank")}
          className="text-2xl"
        />
      </div>
      <p className="text-sm font-medium text-center text-[#6B6B6B] dark:text-white">
        {position}
      </p>
    </div>
  );
};

export default TeamCard;
