"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const [size, setSize] = useState(24);
  const [y, setY] = useState(0);
  // const maxSize = 120;
  const resetTime = 1000;

  useEffect(() => {
    if (size > 24) {
      const timer = setTimeout(() => {
        setSize(24);
        setY(0);
      }, resetTime);

      return () => clearTimeout(timer);
    }
  }, [size, y]);

  // const handleClick = () => {
  //   if (size < maxSize) {
  //     setSize(size + 10);
  //     setY(y - 20);
  //   }
  // };

  return (
    <footer className="bg-black text-white w-full py-6 px-4 md:px-8 bottom-0 relative z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-0">
          Comprar ropa por internet nunca fue tan fácil
        </p>

        <div className="flex space-x-6">
          <Link href="/aboutus" className="text-gray-400 hover:text-white transition">
            Acerca de nosotros
          </Link>
          <Link href="/home" className="text-gray-400 hover:text-white transition">
            Tienda
          </Link>
          <Link href="/magazine" className="text-gray-400 hover:text-white transition">
            Magazine
          </Link>
        </div>
      </div>

      {/* Contenedor del corazoncito y las redes sociales */}
      <div className="flex flex-col items-center mt-6">
        {/* Corazoncito animado ❤️ */}
        <motion.div
          className="mb-2"
          animate={{ scale: [1, 1.3, 1] }} 
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} 
        >
          <FaHeart className="text-red-500 text-3xl" />
        </motion.div>

        {/* Redes sociales centradas */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/ink3d_asian/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
            <FaInstagram />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-2xl">
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Texto de derechos reservados */}
      <p className="text-center text-gray-500 text-xs mt-4">
        © {new Date().getFullYear()} Ink3D Fashion. Todos los derechos reservados.
      </p>
    </footer>
  );
}

