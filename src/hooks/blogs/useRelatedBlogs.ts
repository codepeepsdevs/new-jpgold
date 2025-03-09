import { useState, useEffect } from "react";
import { BlogPost, client } from "@/utils/sanity";

export const useRelatedBlogs = (
  currentBlogId: string,
  categoryIds: string[]
) => {
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!currentBlogId || categoryIds.length === 0) {
        setRelatedBlogs([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Query to fetch related blogs based on categories, excluding the current blog
        const query = `*[_type == "post" && _id != $currentBlogId && count((categories[]->_id)[@ in $categoryIds]) > 0] | order(_createdAt desc)[0...2] {
          _id,
          title,
          excerpt,
          mainImage,
          slug,
          _createdAt
        }`;

        const result = await client.fetch<BlogPost[]>(query, {
          currentBlogId,
          categoryIds,
        });

        setRelatedBlogs(result || []);
      } catch (err) {
        console.error("Error fetching related blogs:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [currentBlogId, categoryIds]);

  return { relatedBlogs, isLoading, error };
};
