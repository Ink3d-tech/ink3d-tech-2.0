"use client"; 

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Motorsport: React.FC = () => {
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
          <Image
            src="/motorsport1.jpg"
            alt="Artículo 1"
            width={300}
            height={256}
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Artículo 1</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Image
            src="/motorsport2.jpg"
            alt="Artículo 2"
            width={300}
            height={256}
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Artículo 2</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Image
            src="/motorsport3.jpg"
            alt="Artículo 3"
            width={300}
            height={256}
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Artículo 3</p>
        </div>
      </div>
    </div>
  );
};

export default Motorsport;
