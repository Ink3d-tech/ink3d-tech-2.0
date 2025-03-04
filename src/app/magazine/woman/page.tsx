// /app/magazine/woman/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Importa desde 'next/navigation'

const woman: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-6">
        <button onClick={() => router.push("/magazine")} className="text-xl">
          Volver
        </button>
        <h1 className="text-2xl font-bold">Outfits para Mujeres</h1>
      </nav>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img src="/women-outfit1.jpg" alt="Outfit 1" className="w-full h-64 object-cover" />
          <p className="mt-4 text-center">Outfit Elegante 1</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img src="/women-outfit2.jpg" alt="Outfit 2" className="w-full h-64 object-cover" />
          <p className="mt-4 text-center">Outfit Casual 2</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img src="/women-outfit3.jpg" alt="Outfit 3" className="w-full h-64 object-cover" />
          <p className="mt-4 text-center">Outfit Deportivo 3</p>
        </div>
      </div>
    </div>
  );
};

export default woman;
