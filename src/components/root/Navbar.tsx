"use client";
import Image from "next/image";
import images from "../../../public/images";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { navItems } from "@/constants";
import useNavigate from "@/hooks/useNavigate";
import { TbMenu2 } from "react-icons/tb";
import { useTheme } from "@/store/theme.store";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div className="w-full flex justify-center bg-white dark:bg-bg-700 py-3 relative">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Image
          alt="logo"
          src={theme === "light" ? images.logoSvg : images.logo}
          className="w-28 lg:w-32"
        />

        <div className="max-md:hidden">
          <div className="max-xl:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-4 lg:gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-sm lg:text-base font-medium text-text-100 dark:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="xl:hidden flex items-center gap-3.5 lg:gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="text-sm lg:text-base font-medium text-text-100 dark:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-0 lg:gap-4 xl:gap-6 justify-between">
          <div
            onClick={() => {
              navigate("/cart");
            }}
            className="cursor-pointer relative flex justify-center items-center "
          >
            <MdOutlineShoppingCart className="text-2xl text-black dark:text-white" />
            <span className="relative -top-2 right-3 text-[8px] bg-bg-100 text-white font-semibold flex justify-center items-center text-center w-4 h-4 rounded-full">
              2
            </span>
          </div>
          <Link
            href={"/login"}
            className="max-md:hidden text-sm lg:text-base font-semibold text-text-200 dark:text-white"
          >
            Login
          </Link>
          <Link
            className="max-md:hidden ml-4 lg:ml-2 px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg lg:rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm lg:text-base"
            href={"/user/dashboard"}
          >
            Dashboard
          </Link>

          <div className="md:hidden px-1 py-1 rounded-md xs:rounded-lg border border-border-200 dark:border-border-300 flex justify-center items-center">
            <TbMenu2 className="text-xl text-text-200 dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
