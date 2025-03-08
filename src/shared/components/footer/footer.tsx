import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full py-6 px-4 md:px-8  bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-0">
        Comprar ropa por internet nunca fue tan fácil 
        </p>
        <FaHeart className="text-red-500 inline-block " />
                <div className="flex space-x-6">
          <Link href="/magazine/acercaDeNosotros" className="text-gray-400 hover:text-white transition">
            Acerca de nosotros
          </Link>
          <Link href="/home" className="text-gray-400 hover:text-white transition">
            Tienda
          </Link>
          <Link href="/magazine" className="text-gray-400 hover:text-white transition">
            Magazine
          </Link>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
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
      <p className="text-center text-gray-500 text-xs mt-4">
        © {new Date().getFullYear()} Ink3D Fashion. Todos los derechos reservados.
      </p>
    </footer>
  );
}
