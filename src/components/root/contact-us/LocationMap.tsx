"use client";
import { useTheme } from "@/store/theme.store";
import Image from "next/image";

export default function LocationMap() {
  const theme = useTheme();

  return (
    <div className="w-full relative space-y-5">
      <div className="mx-auto relative z-10">
        <div className="flex flex-col gap-0.5 xs:gap-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#050706] dark:text-white">
            Locate Us
          </h2>
          <p className="text-base xs:text-lg text-[#323232] dark:text-gray-300">
            JaPaul LTD, Plot 2, Mccarthy Hills SVD, Accra, Ghana
          </p>
        </div>
      </div>
      {/* <div className="absolute inset-0 z-0">
                <Image
                src={theme === 'dark' ? "/images/map-dark.png" : "/images/map.png"}
                alt="JaPaul LTD Location Map"
                fill
                className="object-cover"
                />
                </div>  */}

      <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
        <Image
          src={theme === "dark" ? "/images/map-dark.png" : "/images/map.png"}
          alt="JaPaul LTD Location Map"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
