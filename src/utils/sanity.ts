// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: typeof document !== "undefined",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

// Define mark definition types
export interface MarkDefinition {
  _key: string;
  _type: string;
  [key: string]: unknown; // For additional properties depending on mark type
}

// Define span types used in PortableText
export interface PortableTextSpan {
  _key: string;
  _type: string;
  marks: string[];
  text: string;
}

// Define types for PortableText blocks
export interface PortableTextBlock {
  _key: string;
  _type: string;
  style: string;
  markDefs: MarkDefinition[];
  children: PortableTextSpan[];
}

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

// Asset reference type
export interface SanityAssetReference {
  _type: string;
  _ref: string;
}

// Base Sanity image type
export interface SanityImage {
  _type: string;
  asset: SanityAssetReference;
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Base Sanity reference type
export interface SanityReference {
  _type: string;
  _ref: string;
}

// Author interfaces
export type AuthorReference = SanityReference;

export interface Author {
  _id: string;
  _type: string;
  name: string;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

// Category interfaces
export type CategoryReference = SanityReference;

export interface Category {
  _id: string;
  _type: string;
  title: string;
  description?: string;
  bio?: PortableTextBlock[]; // Changed from any[] to PortableTextBlock[]
}

// Raw blog post from Sanity (with references)
export interface BlogPostProps {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  excerpt?: string;
  slug: {
    current: string;
    _type: string;
  };
  author: AuthorReference;
  mainImage?: SanityImage;
  categories: Array<CategoryReference>;
  body: PortableTextBlock[];
}

// Expanded blog post (with resolved references)
export interface BlogPost extends Omit<BlogPostProps, "categories" | "author"> {
  categories?: Array<Category>;
  author?: Author;
  excerpt?: string;
}
