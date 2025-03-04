"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  description: string;
}

const ArticlePage = () => {
  const { id } = useParams(); // ✅ Obtiene el ID de la URL
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // No hacer la solicitud si no hay ID aún

    const fetchArticle = async () => {
      try {
        console.log(`📡 Fetching article ${id}...`);
        const response = await fetch(`http://localhost:3000/api/magazine/${id}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: Article = await response.json();
        setArticle(data);
      } catch (err) {
        console.error("❌ Error fetching article:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Cargando artículo...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-10">
      <button onClick={() => router.push("/magazine")} className="mb-5 text-blue-500 hover:underline">
        ⬅ Volver al Magazine
      </button>
      {article && (
        <div className="max-w-2xl bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
          <p className="text-gray-600">{article.date} · {article.author}</p>
          <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-lg my-4" />
          <p className="text-lg text-gray-700">{article.description}</p>

        </div>

        
      )}

<div className="max-w-2xl max-w-md mt-6">
  <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>

  <div className="flex flex-col gap-1">
    <input
      type="text"
      placeholder="@user"
      className="border border-gray-300 p-2 rounded-lg"
    />
    <input
      type="text"
      placeholder="Escribe un comentario aqui..."
      className="border border-gray-300 p-2 rounded-lg"
    />
    <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-black">
      Comentar
    </button>
  </div>
</div>
    </div>
  );
};

export default ArticlePage;
