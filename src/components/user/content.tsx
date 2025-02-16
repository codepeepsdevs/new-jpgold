"use client";
import classNames from "classnames";
import Navbar from "./Navbar";

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={classNames(
        "w-full lg:w-[72%] xl:w-[76%] 2xl:w-[80%] flex flex-col border-l border-[#E1E1E6] dark:border-[#3D3D3D] overflow-y-auto transition-all duration-300"
      )}
    >
      <Navbar />
      <main className="h-full w-full px-4 lg:px-8 py-4 lg:py-8 bg-[#F3F3F3] dark:bg-[#161616]">
        {children}
      </main>
    </div>
  );
};

export default Content;
