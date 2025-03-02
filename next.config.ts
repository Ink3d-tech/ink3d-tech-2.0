import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "co.pinterest.com",
      },
      {
        protocol: "https",
        hostname: "imagenssprueba.png", // ¿Es un dominio válido?
      },
    ],
  },
};

export default nextConfig;
