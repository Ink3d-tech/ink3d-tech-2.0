"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ProductCard from "./SearchProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

export default function SearchProductList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const filteredProducts = query
          ? shownProducts.filter((product: Product) =>
              product.name.toLowerCase().includes(query.toLowerCase())
            )
          : [];
        setShownProducts(filteredProducts);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto my-6 bg-white rounded-lg p-4 border border-gray-300 shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-left">
        Resultados para: "{query}"
      </h2>
      <div className="w-full h-px bg-gray-300 my-2"></div>

      {loading && <p className="text-gray-500 text-center mt-4">Cargando productos...</p>}
      {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}

      {shownProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          {shownProducts.map((shownProducts) => (
            <ProductCard key={shownProducts.id} product={shownProducts} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No se encontraron resultados.</p>
      )}
    </div>
  );
}
