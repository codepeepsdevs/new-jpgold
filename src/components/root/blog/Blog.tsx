"use client";

import React from "react";
import BlogCard from "@/components/cards/BlogCard";
import { blogData } from "@/constants";

export default function Blog() {
  return (
    <div className="w-full flex flex-col gap-12 pb-20">
      <div className="border-b border-[#ECECEC] dark:border-[#3d3d3d] ">
        <div className="container w-full flex flex-col max-md:justify-center max-md:items-center max-md:text-center gap-4 md:gap-6 lg:gap-8 py-10 sm:py-12">
          {/* title  */}

          <div className="w-full flex max-md:flex-col items-center md:items-end justify-center md:justify-between gap-2.5 sm:gap-4 md:gap-8 lg:gap-10">
            <div className="w-full 2xs:w-[90%] sm:w-[80%] md:w-[50%] lg:w-[55%] xl:w-[60%] 2xl:w-[65%]">
              <h1 className="w-full lg:w-[90%] 2xl:w-[80%] text-[#050706] dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
                Blog
              </h1>
            </div>

            <p className="flex justify-center md:justify-end w-full 2xs:w-[90%] sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] text-[#131319] dark:text-[#FFFFFFCC] text-base lg:text-lg xl:text-xl">
              Get the latest update on our featured articles
            </p>
          </div>

          {/* featured articles */}
          <div className="w-full flex flex-col gap-4 md:gap-8 mt-8">
            <h2 className="font-bold text-xl md:text-2xl text-[#0B0B0D] dark:text-white">
              Featured Articles
            </h2>

            <div className=" w-full grid gap-y-8 xs:gap-y-10 xl:gap-y-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6">
              {blogData.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button className="flex items-center gap-2 text-base font-medium bg-[#F5F5F5] text-[#0B0B0D] py-3.5 px-8 rounded-lg dark:bg-bg-700 dark:text-white dark:border dark:border-white">
          Load More
        </button>
      </div>
    </div>
  );
}
