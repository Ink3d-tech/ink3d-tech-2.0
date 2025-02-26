"use client";
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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/magazine");
        if (!response.ok) {
          throw new Error("Error al obtener los artículos");
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

  if (loading) {
    return <p className="text-center text-gray-500">Cargando artículos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-5xl font-bold text-center uppercase tracking-widest mt-10 mb-10">
        Magazine
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 flex flex-col"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-5 flex-grow flex flex-col">
              <p className="text-gray-500 text-sm">
                {article.date} · <span className="font-bold">{article.author}</span>
              </p>
              <Link
                href={`/manager/magazine/${article.id}`}
                className="text-xl font-semibold mt-2 text-blue-600 hover:underline"
              >
                {article.title}
              </Link>
              <p className="text-gray-600 mt-2 flex-grow">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagazinePage;

