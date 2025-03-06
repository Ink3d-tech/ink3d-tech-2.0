"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
interface Product {
  id: number;
  name: string;
  image: string | string[];
  price: number;
}


const ArticlePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!id) return
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
        console.log("Productos recibidos:", products);
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
      <div className="max-w-screen-xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-2 xl:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Últimos Productos</h2>
                <button
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                  onClick={() => router.push("/products")}
                >
                  Ver todos <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="hidden lg:block space-y-3">

                <ProductCard
                  products={latestProducts.map(product => ({
                    ...product,
                    image: Array.isArray(product.image) ? product.image[0] : product.image || "/placeholder-image.png",
                    rating: (product as any).rating ?? 0
                  }))}
                />
              </div>
            </div>
          </aside>
          <main className="lg:col-span-6 xl:col-span-6">
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
                  <div dangerouslySetInnerHTML={{ __html: article?.content || "" }} />
                </div>
              </div>
            </article>
          </main>
          <aside className="hidden lg:block lg:col-span-1 xl:col-span-1">
            <CommentPanel />
          </aside>

        </div>
        <button
          className="lg:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2"
          onClick={() => setShowComments(true)}
        >
          <MessageSquare className="w-5 h-5" />
          {showComments ? "Ocultar" : "Ver comentarios"}
        </button>
        {showComments && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-11/12 max-w-lg max-h-[80vh] overflow-y-auto rounded-3xl shadow-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowComments(false)}
              >
                ✕
              </button>
              <CommentPanel />
            </div>
          </div>
        )}
        <div className="lg:hidden mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimos Productos</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-4">
              <ProductCard
                products={latestProducts.map(product => ({
                  ...product,
                  image: Array.isArray(product.image) ? product.image[0] : product.image || "/placeholder-image.png",
                  rating: (product as any).rating ?? 0
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;