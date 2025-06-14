import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ]
  }
};

export default nextConfig;
