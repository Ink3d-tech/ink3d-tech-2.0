import Link from "next/link";
import { Newspaper, ShieldCheck, List, CreditCard } from "lucide-react";
import React from "react";

const buttons = [
  { label: "Magazine", icon: <Newspaper />, href: "/manager/magazine", highlight: true },
  { label: "Compra protegida", icon: <ShieldCheck />, href: "/proteccion" },
  { label: "Categorias", icon: <List />, href: "/categories" },
  { label: "Metodos de pago", icon: <CreditCard />, href: "/pagos" },
];

const ButtonsMini = () => {
  return (
    <div className="w-full bg-black py-6 flex justify-center mt-6">
      <div className="max-w-4xl w-full flex justify-evenly">
        {buttons.map(({ label, icon, href, highlight }, index) => (
          <Link
            key={index}
            href={href}
            className={`relative flex flex-col items-center text-white transition transform hover:scale-110 ${
              highlight ? "highlight-button" : ""
            }`}
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ButtonsMini;
