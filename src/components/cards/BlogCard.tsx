import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost, urlFor } from "@/utils/sanity";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  // Extract the first category title for the tag
  // Use optional chaining and nullish coalescing for safer access
  const tag = blog.categories?.[0]?.title ?? "Article";

  // Create a short description from the first text block if available
  const description =
    blog.body
      ?.find(
        (block) =>
          block._type === "block" &&
          block.style === "normal" &&
          block.children?.[0]?.text
      )
      ?.children?.[0]?.text?.substring(0, 100) + "..." || "";

  // Format date - convert ISO date to readable format
  const date = new Date(blog._createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Estimate reading time (approximately 200 words per minute)
  const wordCount =
    blog.body?.reduce((count, block) => {
      if (block._type === "block") {
        return (
          count +
          (block.children?.reduce(
            (sum, child) => sum + (child.text?.split(/\s+/).length || 0),
            0
          ) || 0)
        );
      }
      return count;
    }, 0) || 0;

  const duration = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  return (
    <motion.div
      className="w-full flex flex-col gap-3 2xl:gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-3.5 2xl:gap-4">
        <Link href={`/blog/${blog._id}`}>
          <div className="relative w-full h-[16rem] sm:h-[18rem] xl:h-[20rem] rounded-lg sm:rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10 z-10 rounded-lg sm:rounded-xl transition-opacity duration-300 hover:opacity-20"></div>
            {blog.mainImage ? (
              <Image
                src={urlFor(blog.mainImage).url()}
                alt={blog.title || "Blog post"}
                fill
                style={{ objectFit: "cover" }}
                className="z-0 w-full h-full rounded-lg sm:rounded-xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
            )}
          </div>
        </Link>
        <span className="w-fit px-2 py-1.5 rounded-md bg-[#F8F8F8] dark:bg-gray-800 text-[#0B0B0D] dark:text-white font-medium text-xs">
          {tag}
        </span>
      </div>
      <div className="flex flex-col gap-3.5 2xl:gap-4 text-left">
        <Link href={`/blog/${blog._id}`}>
          <h2 className="text-[#0B0B0D] dark:text-white font-semibold text-sm lg:text-base hover:text-[#CC8F00] dark:hover:text-[#CC8F00] transition-colors">
            {blog.title}
          </h2>
        </Link>
        <p className="text-[#6C7574] dark:text-[#D9D9D9] text-xs lg:text-sm">
          {description}
        </p>
        <p className="font-medium text-[#0B0B0D] dark:text-white text-xs">
          {date} -- {duration}
        </p>
      </div>
    </motion.div>
  );
}
