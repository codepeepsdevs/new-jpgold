import { BlogPost, client } from "@/utils/sanity";
import { useState, useEffect } from "react";

// Update the BlogPost interface to include resolved categories

export const useBlogs = (limit: number = 3) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "post"] | order(_createdAt desc) [0...${limit}] {
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
        console.log("Fetched blogs:", result);
        setBlogs(result);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [limit]);

  return { blogs, isLoading, error };
};
