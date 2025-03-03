import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pinimg.com", "co.pinterest.com"], // Agrega los dominios permitidos

    remotePatterns: [
      {
        protocol: "https",
        hostname: "co.pinterest.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "co.images.search.yahoo.com",

      },

      {
        protocol: "https",
        hostname: "imagenssprueba.png",
      },
    ],
  },
};

export default nextConfig;