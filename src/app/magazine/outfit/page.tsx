"use client"; // Asegúrate de usar 'use client'

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Importa Image desde next/image

const Outfit: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-6">
        <button onClick={() => router.push("/magazine")} className="text-xl">
          Volver
        </button>
        <h1 className="text-2xl font-bold">Streetwear</h1>
      </nav>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        
        <div className="bg-white p-4 shadow-lg rounded-lg">
        <Image
            src="/images/buzo3.jpg" // Usa la ruta de la imagen
            alt="Item 1"
            width={500} // Especifica un ancho
            height={400} // Especifica una altura
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Artículo 1</p>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Image
            src="/buzo1.jpg" // Usa la ruta de la imagen
            alt="Item 2"
            width={500} // Especifica un ancho
            height={400} // Especifica una altura
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Artículo 2</p>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Image
            src="/images/buzo2.jpg" // Usa la ruta de la imagen
            alt="Item 3"
            width={500} // Especifica un ancho
            height={400} // Especifica una altura
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Artículo 3</p>
        </div>
      </div>
    </div>
  );
};

export default Outfit;
