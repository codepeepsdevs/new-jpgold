"use client";

import React, { useEffect, useRef, useState } from "react";
import BlogCard from "@/components/cards/BlogCard";
import { BlogPost, client } from "@/utils/sanity";

export default function Blog() {
  const [page, setPage] = useState(1);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const observerTarget = useRef(null);

  const limit = 9; // Number of blogs to fetch per page

  // Custom fetch function that uses pagination with Sanity
  const fetchBlogs = async (pageNumber: number) => {
    try {
      setIsLoading(true);

      // Calculate the start position based on page number
      const start = (pageNumber - 1) * limit;

      const query = `*[_type == "post"] | order(_createdAt desc) [${start}...${
        start + limit
      }] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        _rev,
        title,
        slug,
        author->{
          name,
          image,
          bio
        },
        mainImage,
        "categories": categories[]->{ _id, title },
        body
      }`;

      const result = await client.fetch<BlogPost[]>(query);
      console.log(`Fetched blogs for page ${pageNumber}:`, result);

      // If we receive fewer blogs than the limit, we've reached the end
      if (result.length < limit) {
        setHasMore(false);
      }

      // Add new blogs to our collection, avoiding duplicates
      setAllBlogs((prevBlogs) => {
        const newBlogs = result.filter(
          (newBlog) =>
            !prevBlogs.some((prevBlog) => prevBlog._id === newBlog._id)
        );
        return [...prevBlogs, ...newBlogs];
      });

      // Mark initial load as complete for empty state handling
      if (pageNumber === 1) {
        setInitialLoadComplete(true);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred")
      );
      setInitialLoadComplete(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch and pagination handling
  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading]);

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

            {/* Empty state for no blogs */}
            {initialLoadComplete &&
              allBlogs.length === 0 &&
              !isLoading &&
              !error && (
                <div className="w-full py-16 flex flex-col items-center justify-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 dark:text-gray-500"
                  >
                    <path d="M2 6h4"></path>
                    <path d="M6 6V4c0-1 .6-2 2-2h9c.3 0 .7 0 1 .1"></path>
                    <path d="M22 14v3c0 1.7-1.3 3-3 3h-1"></path>
                    <rect width="8" height="8" x="2" y="6" rx="1"></rect>
                    <path d="M14 6c0-1.1.9-2 2-2"></path>
                    <path d="M14 10h8"></path>
                    <path d="M14 14h8"></path>
                    <path d="M9 18c.6.4 1.3.8 2 1.1"></path>
                    <path d="M18 22c1.1 0 2.1-.4 2.8-1.2"></path>
                    <path d="m9 22 9-9"></path>
                  </svg>
                  <p className="text-lg font-medium text-[#131319] dark:text-[#FFFFFFCC]">
                    No articles found
                  </p>
                  <p className="text-[#6B7280] dark:text-[#9CA3AF] text-center max-w-md">
                    There are currently no blog articles published. Check back
                    later for updates.
                  </p>
                </div>
              )}

            {/* Blog grid */}
            {allBlogs.length > 0 && (
              <div className="w-full grid gap-y-8 xs:gap-y-10 xl:gap-y-12 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6">
                {allBlogs.map((item) => (
                  <BlogCard key={item._id} blog={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="w-full flex justify-center">
          <p className="text-red-500 dark:text-red-400">
            Failed to load articles: {error.message}
          </p>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="w-full flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0B0B0D] dark:border-white"></div>
        </div>
      )}

      {/* Observer target element */}
      {hasMore && allBlogs.length > 0 && (
        <div ref={observerTarget} className="h-4" />
      )}

      {/* End of content message */}
      {!hasMore && allBlogs.length > 0 && (
        <div className="w-full flex justify-center">
          <p className="text-[#131319] dark:text-[#FFFFFFCC] text-base">
            No more articles to load
          </p>
        </div>
      )}
    </div>
  );
}
