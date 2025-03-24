import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
