"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { useBlogById } from "@/hooks/blogs/useBlogById";
import { useRelatedBlogs } from "@/hooks/blogs/useRelatedBlogs";
import { urlFor } from "@/utils/sanity";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { blog, isLoading, error } = useBlogById(id);

  // Get category IDs for related posts query - only do this after blog is loaded
  const categoryIds = blog?.categories?.map((cat) => cat._id) || [];

  // Only call useRelatedBlogs when blog data is actually loaded
  const {
    relatedBlogs,
    isLoading: relatedLoading,
    error: relatedError,
  } = useRelatedBlogs(blog ? id : "", categoryIds);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px] bg-white dark:bg-bg-700">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px] bg-white dark:bg-bg-700">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Error loading blog: {error.message}
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px] bg-white dark:bg-bg-700">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Blog not found
        </p>
      </div>
    );
  }

  // Get the image URL using urlFor helper
  const mainImageUrl = blog.mainImage
    ? urlFor(blog.mainImage).url()
    : "/placeholder.jpg";
  const authorImageUrl = blog.author?.image
    ? urlFor(blog.author.image).url()
    : "/placeholder-author.jpg";

  return (
    <div className="w-full flex flex-col justify-center bg-white dark:bg-bg-700 py-8">
      <div className="container w-[90%] space-y-4 md:space-y-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 md:gap-5 text-lg mb-6 md:mb-10">
            <span className="font-bold text-[#060809] dark:text-white">
              {blog.categories?.[0]?.title || "Uncategorized"}
            </span>
            <span className="text-[#7B828E] font-medium">
              {new Date(blog._createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-3xl xs:text-4xl lg:text-5xl font-isemibold text-black dark:text-white mb-6 md:mb-10">
            {blog.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[30rem] md:h-[40rem] md:rounded-xl overflow-hidden">
          <Image
            src={mainImageUrl}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          <PortableText
            value={blog.body}
            components={{
              block: {
                // Customize the rendering of different block types if needed
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-[#0B0B0D] dark:text-white mb-4">
                    {children}
                  </h2>
                ),
                normal: ({ children }) => (
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {children}
                  </p>
                ),
              },
            }}
          />
        </div>

        {/* author */}
        <div className="flex items-center gap-2">
          <div className="relative w-14 h-14 rounded-full overflow-hidden">
            <Image
              src={authorImageUrl}
              alt={blog.author?.name || "Author"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-lg text-[#060809] dark:text-white">
              {blog.author?.name || "Author"}
            </p>
            {blog.author?.bio && (
              <div className="text-[#393E46] dark:text-white/70">
                <PortableText value={blog.author.bio} />
              </div>
            )}
          </div>
        </div>

        {/* Share Post Section */}
        <div className="flex flex-col gap-4">
          <p className="text-[#8F96A3] font-semibold">SHARE THIS POST ON</p>
          <div className="flex gap-4">
            <button
              onClick={() =>
                window.open(
                  `https://facebook.com/share.php?u=${window.location.href}`,
                  "_blank"
                )
              }
              className="w-10 h-10 rounded-full bg-[#F8F8F8] dark:bg-white flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-gray-700 transition-colors"
            >
              <FaFacebookF className="text-[#D4A015]" />
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${window.location.href}`,
                  "_blank"
                )
              }
              className="w-10 h-10 rounded-full bg-[#F8F8F8] dark:bg-white flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-gray-700 transition-colors"
            >
              <FaTwitter className="text-[#D4A015]" />
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                  "_blank"
                )
              }
              className="w-10 h-10 rounded-full bg-[#F8F8F8] dark:bg-white flex items-center justify-center hover:bg-[#E5E5E5] dark:hover:bg-gray-700 transition-colors"
            >
              <FaLinkedinIn className="text-[#D4A015]" />
            </button>
          </div>
        </div>
      </div>

      {/* More Posts Section with data from Sanity */}
      {/* More Posts Section - Only show when not loading the main blog */}
      {!isLoading && blog && (
        <div className="mt-10 md:mt-16 py-10 md:py-16 bg-[#FBF9E9] dark:bg-[#171718]">
          <div className="container w-[90%]">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-8">
              More posts like this
            </h2>

            {relatedLoading ? (
              <p className="text-gray-600 dark:text-gray-400">
                Loading related posts...
              </p>
            ) : relatedError ? (
              <p className="text-gray-600 dark:text-gray-400">
                Error loading related posts
              </p>
            ) : relatedBlogs.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No related posts found
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map((post) => (
                  <div key={post._id} className="flex flex-col">
                    <Link href={`/blog/${post._id}`}>
                      <div className="relative w-full h-72 rounded-t-lg overflow-hidden">
                        <Image
                          src={
                            post.mainImage
                              ? urlFor(post.mainImage).url()
                              : "/placeholder.jpg"
                          }
                          alt={post.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    </Link>
                    <div className="flex flex-col gap-2 bg-white dark:bg-[#3D3D3D] rounded-b-lg p-4">
                      <Link href={`/blog/${post._id}`}>
                        <h3 className="text-lg font-semibold text-[#0B0B0D] dark:text-white transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm font-medium text-[#060809] dark:text-[#D9D9D9] line-clamp-2">
                        {post.excerpt || ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
