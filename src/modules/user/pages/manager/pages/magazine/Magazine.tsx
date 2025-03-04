"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "Las Tendencias Más Hot de la Temporada",
        author: "Laura Jimenez",
        date: "15 Feb 2024",
        image: "/images/01.png",
        description:
          "Descubre las últimas tendencias en moda que están dominando las pasarelas y cómo puedes incorporarlas a tu estilo diario.",
      },
      {
        id: 2,
        title: "Secretos del Estilo Urbano Chic",
        author: "Nacho",
        date: "10 Feb 2024",
        image: "/images/02.png",
        description:
          "Los trucos y consejos para dominar el estilo urbano sin perder la elegancia. Inspirado en las grandes ciudades del mundo.",
      },
      {
        id: 3,
        title: "Colores que Dominarán en Primavera",
        author: "Laura Jimenez",
        date: "05 Feb 2024",
        image: "/images/03.png",
        description:
          "Una guía completa sobre los colores que serán tendencia esta primavera y cómo combinarlos para lograr un look espectacular.",
      },
    ]);
  }, []);

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
            <Image
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover"
              width={200}
              height={200}
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

