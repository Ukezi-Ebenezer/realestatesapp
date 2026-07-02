import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore - To bypass potential typing issues with newer Next.js config properties
  allowedDevOrigins: ['10.14.0.40'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
