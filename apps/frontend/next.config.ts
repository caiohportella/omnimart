import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@shared'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "placeimg.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
            {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
