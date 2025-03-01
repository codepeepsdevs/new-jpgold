"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { SidebarData } from "../../../constants/index";
import images from "../../../../public/images";
import useNavigate from "@/hooks/useNavigate";
import { IoClose } from "react-icons/io5";
import useUserLayoutStore from "@/store/userLayout.store";
import { useTheme } from "@/store/theme.store";
import classNames from "classnames";
import ThemeToggle from "../ThemeToggler";
import useUserStore from "@/store/user.store";

const MainSidebar = () => {
  const navigate = useNavigate();
  const pathname = usePathname();
  const theme = useTheme();
  const { toggleMenu } = useUserLayoutStore();
  const { anonymous } = useUserStore();

  const hiddenPathsWhenAnonymous = ["/user/profile", "/logout"];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Static Logo Section */}
      <div className="w-full flex items-center justify-between px-8 2xs:px-8 py-10 xs:py-8">
        <Image
          alt="logo"
          src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
          className="cursor-pointer w-32"
          onClick={() => {
            navigate("/", "push");
          }}
        />

        <div className="lg:hidden flex justify-center items-center bg-[#EBEBEB] dark:bg-[#555555] text-[#4E4E4E] dark:text-white p-1.5 sm:p-2 rounded-full">
          <IoClose className="cursor-pointer text-xl" onClick={toggleMenu} />
        </div>
      </div>

      {/* Scrollable Sidebar Items */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="pt-2 pb-6 border-b border-[#E2E2E2] dark:border-[#313131] px-6 flex gap-2 flex-col w-full">
          {SidebarData.map((item) => {
            if (anonymous && hiddenPathsWhenAnonymous.includes(item.path)) {
              return null;
            }
            const isActive = (() => {
              if (item.path === "/") {
                return pathname === item.path;
              }

              // Split both paths and take first two segments
              const currentPathSegments = pathname
                .split("/")
                .slice(0, 3)
                .join("/");
              const itemPathSegments = item.path
                .split("/")
                .slice(0, 3)
                .join("/");

              return currentPathSegments === itemPathSegments;
            })();
            return (
              <Link
                href={item.path}
                key={item.id}
                onClick={toggleMenu}
                className={classNames("flex items-center  gap-2.5 py-3 px-4", {
                  "rounded-lg bg-[#282828] ": isActive,
                  "": !isActive,
                })}
              >
                {isActive ? (
                  <item.iconActive
                    className={classNames(
                      "text-xl text-[#E4AC29] dark:text-[#FFBF29]"
                    )}
                  />
                ) : (
                  <item.icon
                    className={classNames(
                      "text-xl text-[#1C1B1F] dark:text-white"
                    )}
                  />
                )}
                <p
                  className={classNames("text-base", {
                    "text-white font-semibold": isActive,
                    "text-[#4E4E4E] dark:text-[#9E9E9E]": !isActive,
                  })}
                >
                  {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Static Theme Toggle Section */}
      <div className="px-6 py-6">
        <div className="bg-[#EFEFEF] dark:bg-[#222222] rounded-lg flex justify-between items-center py-2.5 px-4">
          <p className="font-semibold text-black dark:text-white text-base">
            Theme
          </p>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
