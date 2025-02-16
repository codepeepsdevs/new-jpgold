"use client";
import classNames from "classnames";
import Navbar from "./Navbar";
import { HeadingData } from "@/constants";
import { usePathname } from "next/navigation";

const Content = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const Heading = HeadingData.sort(
    (a, b) => b.path.length - a.path.length
  ).find((item) => {
    if (Array.isArray(item.path)) {
      return item.path.includes(pathname);
    }
    return pathname.startsWith(item.path); // Match paths with dynamic segments
  });
  return (
    <div
      className={classNames(
        "w-full lg:w-[72%] xl:w-[76%] 2xl:w-[80%] flex flex-col border-l border-[#E1E1E6] dark:border-[#3D3D3D] overflow-y-auto transition-all duration-300"
      )}
    >
      <Navbar />
      <main className="md:h-full w-full flex flex-col gap-4 px-4 lg:px-8 py-6 lg:py-8 bg-white sm:bg-[#F3F3F3] dark:bg-[#161616] sm:dark:bg-[#161616]">
        <h1 className="sm:hidden text-2xl xl:text-3xl font-ibold text-[#282828] dark:text-white">
          {Heading?.title}
        </h1>{" "}
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
};

export default Content;
