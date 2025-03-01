"use client";
import Image from "next/image";
import images from "../../../public/images";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import { navItems } from "@/constants";
import useNavigate from "@/hooks/useNavigate";
import { TbMenu2 } from "react-icons/tb";
import { useTheme } from "@/store/theme.store";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useCartStore } from "@/store/useCartStore";
import useUserStore from "@/store/user.store";

const Navbar = () => {
  const { items } = useCartStore();
  const navigate = useNavigate();
  const { setAnonymous } = useUserStore();
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center bg-white dark:bg-bg-700 py-3 relative">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Image
          alt="logo"
          src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
          className="w-32 md:w-36 cursor-pointer"
          onClick={() => navigate("/")}
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
        <div className="flex items-center gap-2.5 lg:gap-4 xl:gap-6 lg:justify-between">
          <div className="relative flex justify-center items-center">
            <MdOutlineShoppingCart
              onClick={() => {
                navigate("/cart");
              }}
              className="cursor-pointer text-2xl text-black dark:text-white"
            />
            {items && items.length > 0 && (
              <span className="absolute -top-1 -right-1 text-[8px] bg-bg-100 text-white font-semibold flex justify-center items-center text-center w-4 h-4 rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <Link
            href={"/login"}
            className="ml-2 max-md:hidden text-sm lg:text-base font-semibold text-text-200 dark:text-white"
          >
            Login
          </Link>
          <Link
            onClick={() => {
              setAnonymous(true);
            }}
            className="max-md:hidden ml-3 lg:ml-2 px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg lg:rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm lg:text-base"
            href={"/user/dashboard"}
          >
            Dashboard
          </Link>

          <div
            className="ml-1 md:hidden px-1 py-1 rounded-md xs:rounded-lg border border-border-200 dark:border-border-300 flex justify-center items-center cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          >
            <TbMenu2 className="text-xl text-text-200 dark:text-white" />
          </div>
        </div>
      </div>

      {/* Add the sliding menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[85%] 2xs:w-[80%] xs:w-[70%] sm:w-[60%] bg-white dark:bg-[#232323] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="px-5 2xs:px-6 py-8 flex flex-col gap-8 h-full">
          <div className="flex justify-between px-1 2xs:px-2 mb-2 2xs:mb-4">
            <Image
              alt="logo"
              src={theme === "light" ? images.logoSvg : images.logoDarkSvg}
              className="w-32 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <IoCloseOutline
              className="text-4xl text-[#41415A] dark:text-white cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <div className="flex flex-col">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="border-b border-[#F1F1F1] dark:border-[#3D3D3D] text-base font-semibold text-text-100 dark:text-white py-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-6 2xs:mt-10">
            <Link
              href={"/login"}
              className="px-6 py-3 rounded-lg 2xs:rounded-xl border border-black dark:border-white bg-white dark:bg-transparent text-black dark:text-white font-semibold text-base text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              className="px-6 py-3 rounded-lg 2xs:rounded-xl border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-semibold text-base text-center"
              href={"/user/dashboard"}
              onClick={() => {
                setAnonymous(true);
                setIsMenuOpen(false);
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Add overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
