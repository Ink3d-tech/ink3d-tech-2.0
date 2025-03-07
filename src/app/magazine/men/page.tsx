"use client"; 

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MenPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <nav className="flex justify-between items-center mb-6">
        <button onClick={() => router.push("/magazine")} className="text-xl">
          Volver
        </button>
        <h1 className="text-2xl font-bold">Outfits para Hombres</h1>
      </nav>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Image
            src="/man1.jpg"
            alt="Outfit 1"
            width={300}
            height={256}
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Outfit Casual 1</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Image
            src="/man3.jpg"
            alt="Outfit 2"
            width={300}
            height={256}
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Outfit Formal 2</p>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <Image
            src="/man2.jpg"
            alt="Outfit 3"
            width={300}
            height={256}
            className="w-full h-64 object-cover"
          />
          <p className="mt-4 text-center">Outfit Deportivo 3</p>
        </div>
      </div>
    </div>
  );
};

export default MenPage;
