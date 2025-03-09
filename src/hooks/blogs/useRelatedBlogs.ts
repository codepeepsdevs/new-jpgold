import { useState, useEffect } from "react";
import { BlogPost, client } from "@/utils/sanity";

export const useRelatedBlogs = (
  currentBlogId: string,
  categoryIds: string[]
) => {
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Create a memoized string representation of categoryIds
  const categoryIdsString = JSON.stringify(categoryIds);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      // Parse the categoryIds back from the string to use inside the effect
      const parsedCategoryIds = JSON.parse(categoryIdsString);

      if (!currentBlogId || parsedCategoryIds.length === 0) {
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
          categoryIds: parsedCategoryIds,
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
  }, [currentBlogId, categoryIdsString]); // Only depend on the string

  return { relatedBlogs, isLoading, error };
};
