"use client";
import { SectionWrapper } from "@/utils/hoc";
import Link from "next/link";
import BlogCard from "@/components/cards/BlogCard";
import { useBlogs } from "@/hooks/blogs/useBlogs";

const Updates = () => {
  const { blogs, isLoading } = useBlogs(3);

  // If there are no blogs and we're not loading, return null
  if (!blogs || (blogs.length === 0 && !isLoading)) {
    return null;
  }

  return (
    <div className="w-full flex">
      <div className="container w-full flex flex-col gap-8 2xs:gap-10 md:gap-12 lg:gap-16">
        <div className="flex w-full items-center justify-between gap-1">
          <h1 className="text-black dark:text-white font-isemibold text-3xl lg:text-4xl xl:text-5xl">
            Get Updated{" "}
          </h1>
          <Link
            href="/blog"
            className="bg-[#F5F5F5] dark:bg-[#555555] text-xs min-[370px]:text-sm xs:text-base font-medium text-[#0B0B0D] dark:text-white px-4 xs:px-6 py-3 xs:py-3.5 rounded-md 2xs:rounded-lg xs:rounded-xl"
          >
            View all articles{" "}
          </Link>
        </div>

        <div className="w-full grid gap-y-8 xs:gap-y-10 xl:gap-y-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-4">
          {blogs &&
            blogs.map((item) => <BlogCard key={item._id} blog={item} />)}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Updates);
