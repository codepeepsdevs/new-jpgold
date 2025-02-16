"use client";
import MainSidebar from "./MainSidebar";
import classNames from "classnames";
import useUserLayoutStore from "@/store/userLayout.store";

const Sidebar = () => {
  const { isMenuOpen, toggleMenu } = useUserLayoutStore();
  return (
    <>
      <div
        className={classNames(
          "hidden lg:flex flex-col lg:w-[28%] xl:w-[24%] 2xl:w-[20%] bg-white dark:bg-[#050706]  h-screen sticky z-50 transform transition-all duration-300 ease-in-out"
        )}
      >
        <MainSidebar />
      </div>

      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-[98]"
          onClick={toggleMenu} // Close the menu when clicking the overlay
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={classNames(
          "lg:hidden fixed z-[99] flex flex-col bg-white dark:bg-[#050706] h-screen transition-transform duration-300 ease-in-out",
          {
            "translate-x-0 w-[80%] 2xs:w-[70%] xs:w-[60%] md:w-[50%]":
              isMenuOpen,
            "-translate-x-full": !isMenuOpen,
          }
        )}
      >
        <MainSidebar />
      </div>
    </>
  );
};

export default Sidebar;
