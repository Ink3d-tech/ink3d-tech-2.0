// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { API_BACK } from "@/shared/config/api/getEnv";
// import Image from "next/image";

// interface Article {
//   id: number;
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   content: string;
// }

// const ArticlePage = () => {
//   const { id } = useParams(); // ✅ Obtiene el ID de la URL
//   const router = useRouter();
//   const [article, setArticle] = useState<Article | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return; // No hacer la solicitud si no hay ID aún

//     const fetchArticle = async () => {
//       try {
//         console.log(`📡 Fetching article ${id}...`);
//         const response = await fetch(`${API_BACK}/api/magazine/${id}`);

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data: Article = await response.json();
//         setArticle(data);
//       } catch (err) {
//         console.error("❌ Error fetching article:", err);
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticle();
//   }, [id]);

//   if (loading) return <p className="text-center text-gray-500">Cargando artículo...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center p-10">
//       <button onClick={() => router.push("/magazine")} className="mb-5 text-blue-500 hover:underline">
//         ⬅ Volver al Magazine
//       </button>
//       {article && (
//         <div className="max-w-2xl bg-gray-100 p-6 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
//           <p className="text-gray-600">{article.date} · {article.author}</p>
//           <Image src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-lg my-4" width={200} height={200}/>
//           <p className="text-lg text-gray-500">{article.content}</p>

//         </div>


//       )}

//       <div className=" max-w-md mt-6">
//         <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>

//         <div className="flex flex-col gap-1">
//           <input
//             type="text"
//             placeholder="@user"
//             className="border border-gray-300 p-2 rounded-lg"
//           />
//           <input
//             type="text"
//             placeholder="Escribe un comentario aqui..."
//             className="border border-gray-300 p-2 rounded-lg"
//           />
//           <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-black">
//             Comentar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticlePage;


// // -----------------------------------------------------------------------------------------------------------------------------------------


// "use client";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { API_BACK } from "@/shared/config/api/getEnv";
// import { CommentPanel } from "@/shared/components/magazine/CommentPanel";
// import { ProductCard } from "@/shared/components/magazine/ProductCard";
// import { ArrowRight } from "lucide-react";

// interface Article {
//   id: number;
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   content: string;
// }

// const ArticlePage = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const [article, setArticle] = useState<Article | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [latestProducts, setLatestProducts] = useState([]);

//   useEffect(() => {
//     if (!id) return;

//     const fetchArticle = async () => {
//       try {
//         const response = await fetch(`${API_BACK}/api/magazine/${id}`);
//         if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

//         const data: Article = await response.json();
//         setArticle(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BACK}/products`);
//         if (!res.ok) throw new Error("Error al obtener los productos");
//         const products = await res.json();
//         setLatestProducts(products.slice(-4));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchArticle();
//     fetchProducts();
//   }, [id]);
//   if (loading) return <p className="text-center text-gray-500">Cargando artículo...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           <aside className="lg:col-span-3 space-y-6">
//             <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Últimos Productos</h2>
//                 <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
//                   Ver todos <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="space-y-4">
//   <ProductCard products={latestProducts} />
// </div>

//             </div>
//           </aside>
//           <main className="lg:col-span-6">
//             <article className="bg-white rounded-3xl shadow-xl border border-indigo-50 overflow-hidden">
//               <div className="relative aspect-video overflow-hidden">
//                 <img
//                   src={article?.image || "/placeholder-image.png"}
//                   alt={article?.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <h1 className="absolute bottom-0 left-0 right-0 text-4xl md:text-5xl font-bold text-white p-8">
//                   {article?.title}
//                 </h1>
//               </div>
//               <div className="p-8">
//                 <p className="text-gray-600">{article?.date} · {article?.author}</p>
//                 <div className="prose max-w-none">
//                   <p className="text-gray-600 text-lg leading-relaxed">{article?.content}</p>
//                 </div>
//               </div>
//             </article>
//           </main>
//           <aside className="lg:col-span-3">
//             <CommentPanel />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticlePage;





// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { API_BACK } from "@/shared/config/api/getEnv";
// import { CommentPanel } from "@/shared/components/magazine/CommentPanel";
// import { ProductCard } from "@/shared/components/magazine/ProductCard";
// import { ArrowRight, MessageSquare } from "lucide-react";

// interface Article {
//   id: number;
//   title: string;
//   author: string;
//   date: string;
//   image: string;
//   content: string;
// }

// const ArticlePage = () => {
//   const { id } = useParams();
//   const [article, setArticle] = useState<Article | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [latestProducts, setLatestProducts] = useState([]);
//   const [showComments, setShowComments] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchArticle = async () => {
//       try {
//         const response = await fetch(`${API_BACK}/api/magazine/${id}`);
//         if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

//         const data: Article = await response.json();
//         setArticle(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${API_BACK}/products`);
//         if (!res.ok) throw new Error("Error al obtener los productos");
//         const products = await res.json();
//         setLatestProducts(products.slice(-4));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchArticle();
//     fetchProducts();
//   }, [id]);

//   if (loading) return <p className="text-center text-gray-500">Cargando artículo...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Contenedor principal con disposición adaptable */}
//         <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
//           {/* Sección principal (Artículo) */}
//           <main className="lg:col-span-6 order-1 lg:order-none">
//             <article className="bg-white rounded-3xl shadow-xl border border-indigo-50 overflow-hidden">
//               <div className="relative aspect-video overflow-hidden">
//                 <img
//                   src={article?.image || "/placeholder-image.png"}
//                   alt={article?.title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <h1 className="absolute bottom-0 left-0 right-0 text-4xl md:text-5xl font-bold text-white p-8">
//                   {article?.title}
//                 </h1>
//               </div>
//               <div className="p-8">
//                 <p className="text-gray-600">{article?.date} · {article?.author}</p>
//                 <div className="prose max-w-none">
//                   <p className="text-gray-600 text-lg leading-relaxed">{article?.content}</p>
//                 </div>
//               </div>
//             </article>
//           </main>

//           {/* Botón para mostrar comentarios en móviles */}
//           <button
//             className="lg:hidden flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-full mt-4 mx-auto"
//             onClick={() => setShowComments(!showComments)}
//           >
//             <MessageSquare className="w-5 h-5" />
//             {showComments ? "Ocultar comentarios" : "Ver comentarios"}
//           </button>

//           {/* Sección de comentarios (oculta en móviles hasta que se active) */}
//           <aside className={`lg:col-span-3 ${showComments ? "block" : "hidden lg:block"}`}>
//             <CommentPanel />
//           </aside>

//           {/* Sección de productos (en desktop: a la izquierda, en móviles: abajo y horizontal) */}
//           <aside className="lg:col-span-3 order-3 lg:order-none">
//             <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-50">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">Últimos Productos</h2>
//                 <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
//                   Ver todos <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="hidden lg:block space-y-4">
//                 <ProductCard products={latestProducts} />
//               </div>
//             </div>
//           </aside>
//         </div>

//         {/* Sección de productos en la parte inferior en móviles */}
//         <div className="lg:hidden mt-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimos Productos</h2>
//           <div className="overflow-x-auto">
//             <div className="flex gap-4">
//               <ProductCard products={latestProducts} small />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticlePage;




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
        {/* Contenedor principal con disposición adaptable */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          {/* Sección de productos (A la izquierda en desktop) */}
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

          {/* Sección principal (Artículo) */}
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

          {/* Sección de comentarios (A la derecha en desktop) */}
          <aside className={`lg:col-span-3 lg:order-last ${showComments ? "block" : "hidden lg:block"}`}>
            <CommentPanel />
          </aside>
        </div>

        {/* Botón para mostrar comentarios en móviles */}
        <button
          className="lg:hidden flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-full mt-4 mx-auto"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="w-5 h-5" />
          {showComments ? "Ocultar comentarios" : "Ver comentarios"}
        </button>

        {/* Sección de productos en la parte inferior en móviles */}
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
