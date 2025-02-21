import Link from "next/link";
import { Newspaper, ShieldCheck, List, CreditCard } from "lucide-react";
import React from "react";

const buttons = [
  { label: "Magazine", icon: <Newspaper />, href: "/magazine", highlight: true },
  { label: "Compra protegida", icon: <ShieldCheck />, href: "/proteccion" },
  { label: "Categorias", icon: <List />, href: "/categories" },
  { label: "Metodos de pago", icon: <CreditCard />, href: "/pagos" },
];

const Buttons = () => {
  return (
    <div className="w-full py-6 flex justify-center mt-6 bg-black">
      <div className="w-full flex justify-evenly gap-6 sm:gap-10 lg:gap-12 px-14 flex-wrap">
        {buttons.map(({ label, icon, href }, index) => (
          <Link
            key={index}
            href={href}
            className={`relative flex items-center justify-center text-red-500 transition-transform transform hover:scale-105 
              w-full sm:w-1/4 lg:w-1/5 h-32 bg-red-300 border-2 border-gray-600 p-6 rounded-lg`}
          >
            <div className="flex items-center justify-center w-full h-full">
              {/* Ícono */}
              <div className="w-16 h-16 flex items-center justify-center rounded-lg text-red-500 mr-4">
                {React.cloneElement(icon, { size: 48 })} {/* Aumentar tamaño del ícono */}
              </div>
              {/* Texto */}
              <span className="text-lg font-semibold">{label}</span> {/* Aumentar tamaño del texto */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
