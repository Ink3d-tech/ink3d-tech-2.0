import Link from "next/link";
import { Newspaper, List, ShoppingBag, Percent } from "lucide-react";
import React from "react";

const buttons = [
  { label: "Magazine", icon: <Newspaper />, href: "/magazine", highlight: true },
  { label: "Categorias", icon: <List />, href: "/categories" },
  { label: "Ofertas", icon: <Percent />, href: "/sales" },
  { label: "Mis compras", icon: <ShoppingBag />, href: "/orders" },
];

const ButtonsMini = () => {
  return (
    <div>
      {/* Buttons Mini */}
      <div className="w-full bg-black py-6 flex justify-center mt-6">
        <div className="max-w-4xl w-full flex justify-evenly">
          {buttons.map(({ label, icon, href, highlight }, index) => (
            <Link
              key={index}
              href={href}
              className={`relative flex flex-col items-center text-white transition transform hover:scale-110  ${
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

      {/* Gradiente Invertido debajo de ButtonsMini */}

    </div>
  );
};

export default ButtonsMini;
