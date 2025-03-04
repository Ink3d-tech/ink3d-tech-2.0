// /pages/outfitsink3d/motorsport.tsx

"use client"; // Asegúrate de usar 'use client'

import React from "react";
import { useRouter } from "next/navigation"; // Correcto

const MundoSportPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-6">
        <button onClick={() => router.push("/magazine")} className="text-xl">
          Volver
        </button>
        <h1 className="text-2xl font-bold">Mundo Sport</h1>
      </nav>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img src="/mundo-sport-item1.jpg" alt="Item 1" className="w-full h-64 object-cover" />
          <p className="mt-4 text-center">Artículo 1</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img src="/mundo-sport-item2.jpg" alt="Item 2" className="w-full h-64 object-cover" />
          <p className="mt-4 text-center">Artículo 2</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <img src="/mundo-sport-item3.jpg" alt="Item 3" className="w-full h-64 object-cover" />
          <p className="mt-4 text-center">Artículo 3</p>
        </div>
      </div>
    </div>
  );
};

export default MundoSportPage;
