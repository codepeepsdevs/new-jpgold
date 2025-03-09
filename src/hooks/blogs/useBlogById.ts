import { useState, useEffect } from "react";
import { BlogPost, client } from "@/utils/sanity";

export const useBlogById = (id: string) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const query = `*[_type == "post" && _id == $id][0] {
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
          categories[]->{
            _id,
            title
          },
          body
        }`;

        const result = await client.fetch<BlogPost>(query, { id });
        setBlog(result || null);
      } catch (err) {
        console.error(`Error fetching blog with ID ${id}:`, err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { blog, isLoading, error };
};
