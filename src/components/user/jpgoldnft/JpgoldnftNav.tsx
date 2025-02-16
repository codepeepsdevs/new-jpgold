"use client";

import useNavigate from "@/hooks/useNavigate";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const JpgoldnftNav = () => {
  const pathname = usePathname();
  const navigate = useNavigate();
  const navOptions = [
    { label: "Buy NFT", smallLabel: "Buy", path: "/user/jpgoldnft/buy" },
    {
      label: "Transfer NFT",
      smallLabel: "Transfer",
      path: "/user/jpgoldnft/transfer",
    },
    {
      label: "Fractionalize NFT",
      smallLabel: "Fractionalize",
      path: "/user/jpgoldnft/fractionalize",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < 480);

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(pathname);

  return (
    <div className="w-full flex items-center gap-2 2xs:gap-2.5">
      {navOptions.map((option, index) => (
        <div
          key={index}
          className={classNames(
            "cursor-pointer px-6 py-2 2xs:py-2.5 rounded-full text-xs 2xs:text-sm bg-[#ECECEC]",
            {
              "bg-white dark:bg-[#FFFFFF40] text-black dark:text-white font-bold border border-[#EAEAEA] dark:border-[#3D3D3D]":
                pathname === option.path,
              "bg-[#ECECEC] dark:bg-[#ECECEC0D] text-[#5A5A5A] dark:text-white font-semibold":
                pathname !== option.path,
            }
          )}
          onClick={() => {
            navigate(option.path);
          }}
        >
          {isMobile ? option.smallLabel : option.label}
        </div>
      ))}
    </div>
  );
};

export default JpgoldnftNav;
