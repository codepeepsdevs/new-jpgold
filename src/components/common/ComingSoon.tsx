"use client";

import { useTheme } from "@/store/theme.store";
import Image, { StaticImageData } from "next/image";
interface ComingSoonProps {
  title: string;
  description: string;
  Icon?: {
    light: StaticImageData;
    dark: StaticImageData;
  };
}

const ComingSoon = ({ title, description, Icon }: ComingSoonProps) => {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="w-full min-h-[70vh] bg-white dark:bg-[#0E0E0E] flex items-center justify-center md:p-4">
      <div className="max-w-lg w-full rounded-2xl md:p-8 text-center">
        <div className="relative w-36 h-36 mx-auto mb-6 bg-[#FBF9E9] dark:bg-[#1A1A1A] rounded-full flex items-center justify-center p-4">
          {Icon ? (
            <Image
              src={isDark ? Icon.dark : Icon.light}
              alt="Coming Soon Feature"
              width={100}
              height={100}
              className="relative z-10 object-contain"
            />
          ) : (
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 12.5H20C19.337 12.5 18.7011 12.2366 18.2322 11.7678C17.7634 11.2989 17.5 10.663 17.5 10V0M30 37.5H10C8.67392 37.5 7.40215 36.9732 6.46447 36.0355C5.52678 35.0979 5 33.8261 5 32.5V7.5C5 6.17392 5.52678 4.90215 6.46447 3.96447C7.40215 3.02678 8.67392 2.5 10 2.5H22.5L35 15V32.5C35 33.8261 34.4732 35.0979 33.5355 36.0355C32.5979 36.9732 31.3261 37.5 30 37.5Z"
                stroke="#CC8F00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <h1 className="text-2xl md:text-3xl text-center font-bold text-[#0B0B0D] dark:text-white mb-3">
          {title}
        </h1>

        <p className="text-black/70 text-center dark:text-white/70 text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
