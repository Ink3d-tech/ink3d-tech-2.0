"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
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
  return (


    <footer className="bg-black text-white w-full py-6 px-4 md:px-8 bottom-0 relative">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <Link href="/team" className="text-gray-400 hover:text-white transition">
        Equipo de desarrollo
        </Link>

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

