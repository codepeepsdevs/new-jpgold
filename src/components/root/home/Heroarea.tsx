"use client";
import { SectionWrapper } from "@/utils/hoc";
import Image from "next/image";
import images from "../../../../public/images";
import { LuArrowUpRight } from "react-icons/lu";
import useNavigate from "@/hooks/useNavigate";
import { useTheme } from "@/store/theme.store";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const Heroarea = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gradientStyles = {
    light: {
      background: `
        linear-gradient(to top, 
          #FFD061 0%,
          rgba(251, 216, 151, 0.9) 0%,
          rgba(251, 216, 151, 0.7) 45%,
          rgba(251, 216, 151, 0.4) 65%,
          rgba(251, 216, 151, 0.2) 85%,
          rgba(251, 216, 151, 0.1) 95%,
          rgba(255, 255, 255, 0.2) 100%
        )
      `,
      overlay: `
        linear-gradient(74.71deg,
          rgba(251, 216, 151, 0.15) 0%,
          rgba(255, 208, 97, 0.2) 42.91%,
          rgba(251, 216, 151, 0.1) 100%
        )
      `,
    },
    dark: {
      background: `
        linear-gradient(21.29deg, 
          rgba(255, 208, 97, 0.1) 25.48%, 
          rgba(255, 208, 97, 0.05) 46.32%, 
          rgba(251, 216, 151, 0) 61.39%,
          rgba(251, 216, 151, 0) 100%
        ),
        linear-gradient(135deg,
          rgba(251, 216, 151, 0) 0%,
          rgba(255, 208, 97, 0.05) 65%,
          rgba(255, 208, 97, 0.08) 100%
        )
      `,
      overlay: `
        linear-gradient(74.71deg,
          rgba(251, 216, 151, 0.02) 0%,
          rgba(255, 208, 97, 0.03) 42.91%,
          rgba(251, 216, 151, 0) 100%
        )
      `,
    },
    mobileDark: {
      background: `
        linear-gradient(0deg, 
          rgba(255, 255, 255, 0) 0.29%, 
          #FFFFFF 100%
        ),
        linear-gradient(74.71deg, 
          rgba(251, 216, 151, 0.5) 0.26%, 
          #FFD061 42.91%, 
          rgba(250, 247, 150, 0.67) 100%
        )
      `,
      overlay: `none`,
    },
  } as const;

  // Determine which gradient to use based on screen size and theme
  const getGradient = (type: "background" | "overlay") => {
    if (theme === "dark" && !isLargeScreen) {
      return gradientStyles.mobileDark[type];
    }
    return gradientStyles[theme as ThemeMode][type];
  };

  return (
    <div className="w-full flex flex-col justify-center h-full relative">
      <div className="container lg:hidden w-full flex justify-center items-center">
        <div className="w-full sm:w-[90%] md:w-[80%] flex flex-col gap-6 relative z-10 pt-16 2xs:pt-20 xs:pt-24 sm:pt-28 md:pt-32 pb-6 2xs:pb-8 xs:pb-12 sm:pb-16 md:pb-20">
          <div className="flex flex-col justify-center items-center text-center gap-6 ">
            <h2 className="w-full xs:w-[95%] font-isemibold text-text-200 dark:text-white text-3xl min-[370px]:text-4xl">
              The Future of Stability & Security in Cryptocurrency
            </h2>
            <p className="w-full xs:w-[90%] xl:w-[80%] text-black dark:text-white text-sm 2xs:text-base sm:text-lg sm:leading-6">
              JPGOLD is transforming the digital currency landscape with its
              ground-breaking stable-coin.
            </p>
          </div>
          <div className="flex max-2xs:w-full max-2xs:flex-col items-center justify-center gap-3">
            <button
              onClick={() => {
                navigate("");
              }}
              className="max-2xs:w-full py-3.5 px-12 rounded-lg 2xs:rounded-xl font-bold text-base bg-primary text-white text-center"
            >
              Buy JPGC
            </button>

            <button
              onClick={() => {}}
              className="max-2xs:w-full flex items-center justify-center py-3.5 px-12 rounded-lg 2xs:rounded-xl bg-[#0000000D] dark:bg-[#FFFFFF24] text-black dark:text-white text-center"
            >
              <p className="font-bold text-base">Whitepaper</p>
              <LuArrowUpRight className="xl" />
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          background: getGradient("background"),
        }}
        className="container relative flex items-center max-lg:justify-center w-full h-full overflow-hidden rounded-lg lg:rounded-xl"
      >
        <div
          className="absolute inset-0"
          style={{
            background: getGradient("overlay"),
            mixBlendMode: "overlay",
          }}
        />

        <div className="max-lg:hidden w-[65%] xl:w-[60%] 4xl:w-[50%] flex flex-col gap-4 2xl:gap-6 relative z-10 pl-10 xl:pl-12 pt-44 2xl:pt-48 pb-36 2xl:pb-40 3xl:pb-44">
          <div className="flex flex-col gap-6 2xl:gap-8">
            <h2 className="w-[90%] xl:w-full 2xl:w-[90%] font-isemibold text-text-200 dark:text-white text-4xl xl:text-5xl 3xl:text-6xl 2xl:leading-[3.8rem] 3xl:leading-[4.2rem]">
              The Future of Stability & Security in Cryptocurrency
            </h2>
            <p className="w-[90%] xl:w-[80%] text-black dark:text-white text-lg leading-6">
              JPGOLD is transforming the digital currency landscape with its
              ground-breaking stable-coin.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate("");
              }}
              className="py-3.5 px-12 rounded-xl font-bold text-base bg-primary text-white text-center"
            >
              Buy JPGC
            </button>

            <button
              onClick={() => {}}
              className="flex items-center justify-center py-3.5 px-12 rounded-xl bg-white text-primary text-center"
            >
              <p className="font-bold text-base">Whitepaper</p>
              <LuArrowUpRight className="xl" />
            </button>
          </div>
        </div>
        <Image
          src={images.home.heroBg}
          alt={`image`}
          className="max-lg:hidden z-10 w-[82%] 2xl:w-[75%] absolute -right-[17rem] 3xl:-right-[22rem] -bottom-[4rem] xl:-bottom-[9rem] 4xl:-bottom-[15rem]"
        />
        <Image
          src={images.home.heroBg}
          alt={`image`}
          className="lg:hidden z-10 w-full relative -bottom-[1.5rem] 2xs:-bottom-[2rem] xs:-bottom-[3rem] md:-bottom-[4rem]"
        />
      </div>
    </div>
  );
};

export default SectionWrapper(Heroarea);
