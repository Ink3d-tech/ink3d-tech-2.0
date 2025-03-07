"use client";

import { useState, useEffect } from "react";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  description: string;
}

export default function MundoasianPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/magazine");
        if (!response.ok) throw new Error("Error al obtener los artículos");

        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <header className="text-center py-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-red-500">
          MOTORSPORT
        </h1>
        <h2 className="text-lg text-gray-600">Lo más exclusivo del momento</h2>
      </header>

      {loading ? (
        <p className="text-center text-gray-500">Cargando artículos...</p>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={article.image || "/motorsport2.jpg"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm">{article.date}</p>
                <p className="text-gray-800 mt-2">{article.description}</p>
                <p className="text-gray-500 text-sm mt-2">Por: {article.author}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay artículos disponibles</p>
      )}
    </div>
  );
}
