import Link from "next/link";
import { Newspaper, List, ShoppingBag, Gamepad } from "lucide-react";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "@/shared/styles/Alert.style.css";

const buttons = [
  { label: "Magazine", icon: <Newspaper />, href: "/magazine", highlight: true },
  { label: "Categorias", icon: <List />, href: "/categories" },
  { label: "Juega y Gana", icon: <Gamepad />, href: "/sales", isTriviaButton: true },
  { label: "Mis compras", icon: <ShoppingBag />, href: "/orders" },
];

const ButtonsMini = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  // Verificar si el usuario está autenticado en el momento de montar el componente
  useEffect(() => {
    // Aquí puedes reemplazar con tu lógica de autenticación, ejemplo con localStorage
    const user = localStorage.getItem("user"); // O lo que estés usando para comprobar el login
    setIsAuthenticated(!!user); // Si "user" existe, se considera logueado
  }, []);

  const handlePlayTrivia = () => {
    if (!isAuthenticated) {
      Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          popup: 'custom-toast',
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      }).fire({
        icon: 'error',
        title: '¡Debes estar logueado para Jugar nuestra trivia!'
      });
    } else {
      window.location.href = "/sales";  // Redirige a la página de ventas si está autenticado
    }
  };

  return (
    <div>
      <div className="w-full bg-black py-6 flex justify-center mt-6">
        <div className="max-w-4xl w-full flex justify-evenly">
          {buttons.map(({ label, icon, href, highlight, isTriviaButton }, index) => (
            <div key={index} className="relative flex flex-col items-center text-white transition transform hover:scale-110">
              {isTriviaButton ? (
                <div
                  onClick={handlePlayTrivia}
                  className={`relative flex flex-col items-center text-white transition transform hover:scale-110 ${highlight ? "highlight-button" : ""}`}
                >
                  <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-gray-300 relative">
                    {highlight && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-20 h-20 bg-blue-400 opacity-20 rounded-full animate-pulse"></div>
                        <div className="absolute w-16 h-16 bg-blue-400 opacity-40 rounded-full animate-ping"></div>
                      </div>
                    )}
                    <div className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-md relative z-10">
                      {React.cloneElement(icon, { size: 30, className: "text-blue-500" })}
                    </div>
                  </div>
                  <span className="mt-2 text-sm hidden sm:block">{label}</span>
                </div>
              ) : (
                <Link href={href} className={`relative flex flex-col items-center text-white transition transform hover:scale-110 ${highlight ? "highlight-button" : ""}`}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-gray-300 relative">
                    {highlight && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-20 h-20 bg-blue-400 opacity-20 rounded-full animate-pulse"></div>
                        <div className="absolute w-16 h-16 bg-blue-400 opacity-40 rounded-full animate-ping"></div>
                      </div>
                    )}
                    <div className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-md relative z-10">
                      {React.cloneElement(icon, { size: 30, className: "text-blue-500" })}
                    </div>
                  </div>
                  <span className="mt-2 text-sm hidden sm:block">{label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonsMini;
