"use client";
import Image from "next/image";
import images from "../../../public/images";
import Socials from "./Socials";
import { footerLinks } from "@/constants";
import Link from "next/link";
import { useTheme } from "@/store/theme.store";
import useNavigate from "@/hooks/useNavigate";
import useUserStore from "@/store/user.store";

const Footer = () => {
  const theme = useTheme();
  const { setAnonymous } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center bg-white dark:bg-bg-700 py-12 lg:py-16 border-t border-border-100 dark:border-border-400">
      <div className="container flex max-lg:gap-12 max-lg:flex-col justify-between">
        <div className="flex flex-col gap-6 xs:gap-8">
          <Image
            alt="logo"
            src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
            className="w-32 md:w-36 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex flex-col gap-4 xs:gap-6">
            <Socials />
            <p className="text-text-200 dark:text-white text-xs 2xs:text-sm xs:text-base w-[90%]">
              Japaul LTD, Plot 2, Mcaethy Hills SVD, Accra, Ghana{" "}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 2xs:grid-cols-2 xs:grid-cols-3 justify-between  gap-3 3xs:gap-0 xs:gap-2 lg:gap-4 xl:gap-6 max-xs:!gap-y-10 text-text-200 dark:text-white">
          {footerLinks.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h2 className="text-sm 2xs:text-base xs:text-lg font-semibold ">
                {item.title}
              </h2>
              <div className="flex flex-col gap-3 text-xs 2xs:text-sm xs:text-base font-light">
                {item.links.map((link, index) => {
                  if (link.type === "internal") {
                    return (
                      <Link
                        onClick={() => {
                          if (link.title === "Dashboard") {
                            setAnonymous(true);
                          }
                        }}
                        key={index}
                        href={link.path}
                      >
                        {link.title}
                      </Link>
                    );
                  }

                  if (link.type === "external") {
                    return (
                      <Link
                        key={index}
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.title}
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
