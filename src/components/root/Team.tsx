import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { teamMembers } from "@/constants";
import { TeamMemberProps } from "@/constants/types";

export default function Team() {
  return (
    <div className="w-full">
      <div className="container w-full flex flex-col max-md:justify-center max-md:items-center max-md:text-center gap-4 md:gap-6 lg:gap-8 py-10 sm:py-12">
        {/* title */}
        <div className="w-full flex max-md:flex-col items-center md:items-end justify-center md:justify-between gap-4 md:gap-8 lg:gap-10">
          <div className="w-full 2xs:w-[90%] sm:w-[80%] md:w-[50%] lg:w-[55%] xl:w-[60%] 2xl:w-[65%]">
            <h1 className="w-full lg:w-[90%] 2xl:w-[80%] text-[#050706] dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
              Meet the Team{" "}
            </h1>
          </div>

          <p className="w-full 2xs:w-[90%] sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] text-[#131319] dark:text-[#FFFFFFCC] text-sm lg:text-base xl:text-lg">
            We are committed to developing an outstanding product that not only
            meets but surpasses the needs and expectations of our users.
          </p>
        </div>

        {/* Team members grid */}
        <div className="mt-6 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  xl:gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  position,
  image,
  linkedin,
  about,
}) => {
  return (
    <div className="bg-white dark:bg-[#1D1F1C] rounded-lg p-6 md:p-10 pb-20 border border-[#CCCCCC] dark:border-[#00000033]">
      <div className="flex flex-col gap-4">
        {/* Image and LinkedIn */}
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={130}
            height={130}
            className="w-28 2xs:w-32  rounded-lg object-cover"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col items-start justify-start text-left gap-2">
          <div className="flex gap-2 items-center">
            <h3 className="text-xl font-bold dark:text-white text-[#050706]">
              {name}
            </h3>
            {linkedin && (
              <Link href={linkedin} target="_blank">
                <FaLinkedin
                  className="text-[#050706] dark:text-white"
                  size={20}
                />
              </Link>
            )}
          </div>
          <p className="text-sm text-[#6B6B6B] dark:text-white/80">
            {position}
          </p>
          <p className="mt-2 text-[#3C3C3C] dark:text-white line-clamp-4">
            {about}
          </p>
        </div>
      </div>
    </div>
  );
};
