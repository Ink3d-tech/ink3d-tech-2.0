"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BACK } from "@/shared/config/api/getEnv";
import MagazineSkeleton from "./SkeletonMagazine";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  description: string;
  category: string;
}

const MagazinePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BACK}/api/magazine/active`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data: Article[] = await response.json();
        setArticles(data);

        const uniqueCategories = Array.from(new Set(data.map((article) => article.category))).filter(Boolean);
        setCategories(["Todas", ...uniqueCategories]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (!category || category === "Todas") {
      const fetchAllArticles = async () => {
        setLoading(true);
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

      fetchAllArticles();
      return;
    }

    const fetchFilteredArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BACK}/api/magazine?category=${category}`);
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

    fetchFilteredArticles();
  }, [category]);

  if (loading) return <MagazineSkeleton/>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Navbar */}
      <nav className=" bg-white text-black shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">


          <ul className="flex gap-6 text-sm uppercase">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer transition ${category === cat ? "text-red-500 font-bold" : "hover:text-red-500"}`}
                onClick={() => router.push(cat === "Todas" ? "/magazine" : `/magazine?category=${cat}`)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <h1 className="text-5xl font-bold text-center uppercase tracking-widest py-5 mt-20 mb-10">
        {category && category !== "Todas" ? category : "INK3D Magazine"}
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {articles.map(({ id, title, author, date, image, description }) => (
          <div key={id} className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 flex flex-col">
            <Image src={image} alt={title} width={500} height={300} className="w-full h-64 object-cover" priority />
            <div className="p-5 flex-grow flex flex-col">
              <p className="text-gray-500 text-sm">{date} · <span className="font-bold">{author}</span></p>
              <button onClick={() => router.push(`/magazine/${id}`)} className="text-xl font-semibold mt-2 hover:text-red-500 transition">
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
