import Link from "next/link";
import { Truck, ShieldCheck, List, CreditCard } from "lucide-react";
import React from "react";

const buttons = [
  { label: "Free Shipping", icon: <Truck />, href: "/envios" },
  { label: "Protected Purchase", icon: <ShieldCheck />, href: "/proteccion" },
  { label: "Categories", icon: <List />, href: "/categorias" },
  { label: "Payment Methods", icon: <CreditCard />, href: "/pagos" },
];

const Buttons = () => {
  return (
    <div className="w-full bg-black py-6 flex justify-center">
      <div className="max-w-4xl w-full flex justify-evenly">
        {buttons.map(({ label, icon, href }, index) => (
          <Link
            key={index}
            href={href}
            className="flex flex-col items-center text-white transition transform hover:scale-110"
          >
            {/* Círculo gris externo */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 border-gray-400">
              {/* Botón circular interno */}
              <div className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-md">
                {React.cloneElement(icon, { size: 30, className: "text-blue-500" })}
              </div>
            </div>
            {/* Texto debajo */}
            <span className="mt-2 text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
