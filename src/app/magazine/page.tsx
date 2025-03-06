"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API_BACK } from "@/shared/config/api/getEnv";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  description: string;
}

const MagazinePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BACK}/api/magazine/active`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando artículos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-white p-8">

         {/* Navbar */}
         {/* Navbar */}
<nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
  <div className="container mx-auto flex justify-between items-center p-4">
    {/* Logo a la izquierda */}
    <div
      className="flex items-center cursor-pointer hover:opacity-80 transition"
      onClick={() => router.push("/home")} // Redirige al Home
    >
      <Image 
        src="/LogoInkedWhite.png" 
        alt="The Ink3D Project" 
        width={50} 
        height={50} 
        className="w-12 h-12 object-contain"
      />
      <h1 className="ml-2 text-xl font-bold uppercase tracking-wide">
        
      </h1>
    </div>

    {/* Categorías */}
    <ul className="flex gap-6 text-sm uppercase">
      <li className="hover:text-red-500 transition cursor-pointer" onClick={() => router.push("/outfits")}>
        Outfits Ink3D
      </li>
      <li className="hover:text-red-500 transition cursor-pointer" onClick={() => router.push("/woman")}>
        Woman
      </li>
      <li className="hover:text-red-500 transition cursor-pointer" onClick={() => router.push("/men")}>
        Men
      </li>
      <li className="hover:text-red-500 transition cursor-pointer" onClick={() => router.push("/compras")}>
        Compras
      </li>
      <li className="hover:text-red-500 transition cursor-pointer" onClick={() => router.push("/mundo-asian")}>
        Mundo Asian
      </li>
      <li className="hover:text-red-500 transition cursor-pointer" onClick={() => router.push("/motorsport")}>
        Motorsport
      </li>
      <li className="hover:text-red-500 transition cursor-pointer" onClick={() => router.push("/streetwear")}>
        Streetwear
      </li>
    </ul>
  </div>
</nav>


       
      <h1 className="text-5xl font-bold text-center uppercase tracking-widest py-5 mt-10 mb-10">
        INK3D Magazine
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {articles.map(({ id, title, author, date, image, description }) => (
          <div key={id} className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 flex flex-col">
            <Image 
              src={image} 
              alt={title} 
              width={500} 
              height={300} 
              className="w-full h-64 object-cover" 
              priority
            />
            <div className="p-5 flex-grow flex flex-col">
              <p className="text-gray-500 text-sm">
                {date} · <span className="font-bold">{author}</span>
              </p>
              <button 
                onClick={() => router.push(`/magazine/${id}`)} 
                className="text-xl font-semibold mt-2 hover:text-red-500 transition"
              >
                {title}
              </button>
              <p className="text-gray-700 mt-2">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagazinePage;
