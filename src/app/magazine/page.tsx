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
        const response = await fetch(`${API_BACK}/api/magazine`);
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
      <h1 className="text-5xl font-bold text-center uppercase tracking-widest mt-10 mb-10">
        Magazine
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
