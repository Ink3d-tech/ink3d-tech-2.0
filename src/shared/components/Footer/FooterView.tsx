import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Sección superior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Logo y descripción */}
          <div>
            <h2 className="text-3xl font-bold mb-3">Ink3D Fashion</h2>
            <p className="text-gray-400">
              Innovación y estilo en cada prenda.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/home" className="text-gray-400 hover:text-white transition">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/manager/magazine" className="text-gray-400 hover:text-white transition">
                  Magazine
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
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
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Sección inferior */}
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Ink3D Fashion. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
