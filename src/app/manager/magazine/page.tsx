"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

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

  // Artículo Hardcodeado
  const hardcodedArticle: Article = {
    id: 2,
    title: "Secretos del Estilo Urbano Chic",
    author: "Nacho",
    date: "10 Feb 2024",
    image: "/images/02.png",
    description:
      "Los trucos y consejos para dominar el estilo urbano sin perder la elegancia. Inspirado en las grandes ciudades del mundo.",
  
  }
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/magazine");
        if (!response.ok) {
          throw new Error("Error al obtener los artículos");
        }
        const data: Article[] = await response.json();
        setArticles([hardcodedArticle, ...data]); // Agrega el artículo fijo al inicio
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando artículos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* 🔹 Navbar Lateral */}
      <nav className="w-64 bg-black text-white h-screen fixed top-0 left-0 p-6 flex flex-col justify-start space-y-10">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-center">Magazine</h2>
        <div className="space-y-8 text-lg">
          <Link href="/" className="block hover:text-red-500 transition">
            🏠 Volver a la Tienda
          </Link>
          <Link href="/shop" className="block hover:text-red-500 transition">
            🛒 Ir al carrito de compras
          </Link>
          <Link href="/tshirts" className="block hover:text-red-500 transition">
            👕 Camisetas Inked
          </Link>
          <Link href="/trends" className="block hover:text-red-500 transition">
            🔥 Tendencias Asian
          </Link>
        </div>
      </nav>

      {/* 🔹 Contenido Principal */}
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-5xl font-bold text-center uppercase tracking-widest mt-10 mb-10">
          Magazine
        </h1>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 flex flex-col"
            >
              <Link href={`/manager/magazine/${article.id}`}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover cursor-pointer"
                />
              </Link>
              <div className="p-5 flex-grow flex flex-col">
                <p className="text-gray-500 text-sm">
                  {article.date} · <span className="font-bold">{article.author}</span>
                </p>
                <Link href={`/manager/magazine/${article.id}`} className="text-xl font-semibold mt-2 hover:text-red-500 transition">
                  {article.title}
                </Link>
                <p className="text-gray-700 mt-2">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagazinePage;
