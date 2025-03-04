import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagen.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "project-ink3d-back-1.onrender.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com"
      }
    ],
  },
};

export default nextConfig;
