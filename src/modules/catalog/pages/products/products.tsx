"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterCategories from "./components/FilterCategories.component";
import { API_BACK } from "@/shared/config/api/getEnv";
import ProductCards from "./components/ProductCards";
import Link from "next/link";
import SkeletonProducts from "@/modules/checkout/pages/cart/components/SkeletonProducts";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    id: string;
    name: string;
  };
  image: string[];
  stock: number;
  style: string;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const selectedStyle = searchParams.get("style") || null;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialCategory = searchParams.get("category") || null;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  // Lista fija de estilos (todos los estilos disponibles)
  const allStyles = ["Streetwear", "Asian", "Motorsport"];

  const getStyleClasses = (style: string | undefined) => {
    if (!style) return "bg-blue-500 text-white";
    const normalizedStyle = style.trim().toLowerCase();
    const styleColors: Record<string, string> = {
      motorsport: "bg-red-500 text-white",
      asian: "text-green-600 bg-green-100",
      streetwear: "bg-black text-white",
    };

    return styleColors[normalizedStyle] || "bg-blue-500 text-white";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = "/products";  // No dependemos de un estilo para la búsqueda
        const response = await fetch(`${API_BACK}${endpoint}`);
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos por estilo seleccionado
  const filteredProducts = products.filter((product) => {
    if (selectedStyle) {
      return product.style.toLowerCase() === selectedStyle.toLowerCase();
    }
    return true;
  });

  // Filtrar productos por categoría seleccionada
  const filteredByCategory = selectedCategory
    ? filteredProducts.filter((product) => product.category.name.toLowerCase() === selectedCategory.toLowerCase())
    : filteredProducts;

  // Eliminar duplicados por nombre (si hay productos con el mismo nombre)
  const uniqueProducts = Array.from(
    new Map(filteredByCategory.map((product) => [product.name, product])).values()
  );

  return (
<div className="relative flex flex-col min-h-screen">
  {/* Capa de fondo con imagen y blur */}
  <div
    className="absolute inset-0 bg-repeat blur-xl "
    style={{
      backgroundImage: "url('/images/textures/8.jpg')",
      backgroundSize: "1000px", // Ajusta el tamaño del mosaico a tu gusto
      backgroundPosition: "center",
      backgroundRepeat: "repeat", // Hace que la imagen se repita en mosaico
      filter: "blur(10px)", // Aplica el desenfoque
    }}
  />
  <div className="absolute inset-0 bg-white/30"></div>
    <div className="min-h-screen pb-2 relative index-90">
<div className="flex overflow-x-auto space-x-2 p-4 bg-black shadow-md sticky top-0 z-10">
  <Link
    href="/products"
    className={`px-4 py-2 text-white rounded-full text-sm hover:bg-gray-900 ${
      !selectedStyle ? "border-b-2 border-white" : ""
    }`}
  >
    Todos
  </Link>
  {allStyles.map((style) => (
    <Link
      key={style}
      href={`/products?style=${style}`}
      className={`px-4 py-2 text-white rounded-full text-sm hover:bg-gray-900 ${
        selectedStyle?.toLowerCase() === style.toLowerCase() ? "border-b-2 border-white" : ""
      }`}
    >
      {style}
    </Link>
  ))}
</div>
      <div className="max-w-9xl mx-auto my-6 bg-gray-100 rounded-lg p-0 border border-gray-300 shadow-md pb-5">
        <div className="flex justify-between items-center px-30 px-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-left m-3">
            Lista de Productos
          </h2>
          <FilterCategories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>
        <div className="w-full h-px bg-gray-300"></div>

        {loading && <SkeletonProducts/>}
        {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5 px-7 py-2">
          {uniqueProducts.length === 0 ? (
            <p className="text-gray-500 text-center mt-4">No hay productos disponibles con estos filtros.</p>
          ) : (
            uniqueProducts.map((product) => (
              <ProductCards key={product.id} product={product} getStyleClasses={getStyleClasses} />
            ))
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
