import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.pinimg.com",
      "co.pinterest.com",
      "i0.wp.com", // ← Agregado aquí
    ],

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
        hostname: "imagenssprueba.png",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com", // ← Agregado aquí también
      },
      

    ],
  },
};

export default nextConfig;
