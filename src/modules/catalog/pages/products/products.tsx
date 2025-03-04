"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "@/shared/components/buttons/BackButton.component";
import FilterCategories from "./components/FilterCategories.component";
// import { API_BACK } from "@/shared/config/api/getEnv";


interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    id: string;
    name: string;
  };
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://project-ink3d-back-1.onrender.com/auth/google/login/products`);

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

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.id === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-300 pb-2">
      <BackButton tab="Asian" />
      <div className="max-w-7xl mx-auto my-6 bg-white rounded-lg p-6 border border-gray-300 shadow-md">
        <div className="flex justify-between items-center mb-4 px-3">
          <h2 className="text-2xl font-semibold text-gray-800 text-left m-3">Lista de Productos</h2>
          <FilterCategories onSelectCategory={setSelectedCategory} />
        </div>
        <div className="w-full h-px bg-gray-300"></div>

        {loading && <p className="text-gray-500 text-center mt-4">Cargando productos...</p>}
        {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 m-4">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/productDetail/${product.id}`} passHref>
              <div className="flex flex-col items-center bg-white overflow-hidden shadow-md rounded-lg cursor-pointer transition-transform transform border border-gray-300 ">
                <div className="w-full overflow-hidden">
                  <Image
                    src={product.image[0] || "/placeholder-image.png"}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 uppercase">
                    Asian
                  </span>
                  <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                  <p className="text-2xl font-bold mt-2">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
