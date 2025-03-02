"use client";
import Image from "next/image";
import { useState } from "react";

interface Article {
  id: number;
  author: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
  fetchArticles: (page: number) => void;
}

export default function ArticleList({ articles, onEdit, onDelete, fetchArticles }: Props) {
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    fetchArticles(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      fetchArticles(page - 1);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">📚 Artículos Publicados</h2>
      {articles.length === 0 ? (
        <p>No hay artículos aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <div key={article.id} className="border p-4 rounded shadow-md">
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-sm text-gray-500">✍️ {article.author}</p>
              <p>{article.description}</p>
              {article.image && (
                <div className="relative w-full h-40 mt-2">
                  <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" className="rounded" />
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <button onClick={() => onEdit(article)} className="bg-yellow-400 text-black px-4 py-2 rounded">✏️ Editar</button>
                <button onClick={() => onDelete(article.id)} className="bg-red-500 text-white px-4 py-2 rounded">🗑 Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button onClick={handlePrevPage} disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded">⬅️ Anterior</button>
        <button onClick={handleNextPage} className="ml-4 px-4 py-2 bg-gray-300 rounded">Siguiente ➡️</button>
      </div>
    </div>
  );
}
