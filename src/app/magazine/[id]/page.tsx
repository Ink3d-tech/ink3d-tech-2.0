"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_BACK } from "@/shared/config/api/getEnv";
import { CommentPanel } from "@/shared/components/magazine/CommentPanel";
import { ProductCard } from "@/shared/components/magazine/ProductCard";
import { ArrowRight, MessageSquare } from "lucide-react";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestProducts, setLatestProducts] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_BACK}/api/magazine/${id}`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data: Article = await response.json();
        setArticle(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BACK}/products`);
        if (!res.ok) throw new Error("Error al obtener los productos");
        const products = await res.json();
        setLatestProducts(products.slice(-4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticle();
    fetchProducts();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Cargando artículo...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 lg:order-first">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Últimos Productos</h2>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="hidden lg:block space-y-4">
                <ProductCard products={latestProducts} />
              </div>
            </div>
          </aside>

          <main className="lg:col-span-6 order-1 lg:order-none">
            <article className="bg-white rounded-3xl shadow-xl border border-indigo-50 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={article?.image || "/placeholder-image.png"}
                  alt={article?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h1 className="absolute bottom-0 left-0 right-0 text-4xl md:text-5xl font-bold text-white p-8">
                  {article?.title}
                </h1>
              </div>
              <div className="p-8">
                <p className="text-gray-600">{article?.date} · {article?.author}</p>
                <div className="prose max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed">{article?.content}</p>
                </div>
              </div>
            </article>
          </main>

          <aside className={`lg:col-span-3 lg:order-last ${showComments ? "block" : "hidden lg:block"}`}>
            <CommentPanel />
          </aside>
        </div>

        <button
          className="lg:hidden flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-full mt-4 mx-auto"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="w-5 h-5" />
          {showComments ? "Ocultar comentarios" : "Ver comentarios"}
        </button>

        <div className="lg:hidden mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimos Productos</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-4">
              <ProductCard products={latestProducts} small />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
