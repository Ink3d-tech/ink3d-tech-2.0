"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { API_BACK } from "@/shared/config/api/getEnv";
import { CommentPanel } from "@/shared/components/magazine/CommentPanel";
import { CommentPanel2 } from "@/shared/components/magazine/CommentPanel2";
import { ProductCard } from "@/shared/components/magazine/ProductCard";
import { ProductCard2 } from "@/shared/components/magazine/ProductCard2";
import { ArrowRight, MessageSquare } from "lucide-react";
import SkeletonMagazineId from "./SkeletonMagazineId";

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

interface Product {
  id: string;
  name: string;
  image: string | string[];
  price: number;
  rating?: number;
}

const ArticlePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [showComments2, setShowComments2] = useState(false);
  const [isMobile, setIsMobile] = useState(false);  // Estado para controlar el tamaño de la pantalla

  // Efecto para detectar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);  // Cambia el valor si prefieres otro tamaño de pantalla para mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize();  // Llamada inicial para establecer el tamaño correcto al cargar

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_BACK}/api/magazine/${id}`);
        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);
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
        const products: Product[] = await res.json();
        setLatestProducts(products.slice(-5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
    fetchProducts();
  }, [id]);

  if (loading) return <SkeletonMagazineId/>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-screen-xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar de productos */}
          <aside className="hidden lg:block lg:col-span-2 xl:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Últimos Productos
                </h2>
                <button
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                  onClick={() => router.push("/products")}
                >
                  Ver todos <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <ProductCard
                products={latestProducts.map((product) => ({
                  ...product,
                  image: Array.isArray(product.image)
                    ? product.image[0]
                    : product.image || "/placeholder-image.png",
                  rating: product.rating ?? 0,
                }))}
              />
            </div>
          </aside>

          {/* Contenido del artículo */}
          <main className="lg:col-span-6 xl:col-span-6">
            <article className="rounded-3xl shadow-xl border border-indigo-50 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article?.image || "/placeholder-image.png"}
                  alt={article?.title || "Imagen del artículo"}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h1 className="absolute bottom-0 left-0 right-0 text-4xl md:text-5xl font-bold text-white p-8">
                  {article?.title}
                </h1>
              </div>
              <div className="p-8">
                <p className="text-gray-600">
                  {article?.date} · {article?.author}
                </p>
                <div className="prose max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: article?.content || "" }}
                  />
                </div>

                {/* Contenedor relativo para los comentarios y el botón */}
                <div className="relative">
                  {/* Botón para abrir/ocultar comentarios */}
                  <button
                    className="lg:hidden bg-indigo-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 mt-4"
                    onClick={() => setShowComments2(!showComments2)}
                  >
                    <MessageSquare className="w-5 h-5" />
                    {showComments2 ? "Ocultar comentarios" : "Ver comentarios"}
                  </button>

                  {/* Panel de comentarios, dentro del contenedor */}
                  {isMobile && showComments2 && (
                    <div className="mt-4 w-full h-auto overflow-hidden">
                      <CommentPanel2 magazineId={Array.isArray(id) ? id[0] : id || ""} />
                    </div>
                  )}
                </div>
              </div>
            </article>
          </main>

          {/* Panel de comentarios para pantallas grandes */}
          <aside className="hidden lg:block lg:col-span-1 xl:col-span-1">
          <CommentPanel magazineId={Array.isArray(id) ? id[0] : id || ""} />
          </aside>
        </div>

        {/* ProductCard2 - Visible en pantallas pequeñas */}
        <div className="lg:hidden mt-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Últimos Productos
              </h2>
              <button
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                onClick={() => router.push("/products")}
              >
                Ver todos <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <ProductCard2
              products={latestProducts.map((product) => ({
                ...product,
                image: Array.isArray(product.image)
                  ? product.image[0]
                  : product.image || "/placeholder-image.png",
                rating: product.rating ?? 0,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
