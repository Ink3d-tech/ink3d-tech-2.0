"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
      setIsScrolling(true);

      // Limpiamos el timeout previo para evitar parpadeos
      clearTimeout(timeout);

      // Espera 1.5s después de que el usuario deja de mover la página
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-7 right-7 bg-blue-500 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-500
        ${isVisible ? (isScrolling ? "opacity-100" : "opacity-50") : "opacity-0 pointer-events-none"}
        hover:opacity-100 hover:scale-110 hover:shadow-xl`}>
      
      {/* Icono grande para pantallas medianas y grandes */}
      <ArrowUp size={24} className="hidden sm:block" />

      {/* Icono pequeño para pantallas chicas */}
      <ArrowUp size={15} className="sm:hidden" />
    </button>
  );  
};

export default ScrollToTop;
