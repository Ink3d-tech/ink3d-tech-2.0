"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/shared/components/buttons/BackButton.component";
import FilterCategories from "./components/FilterCategories.component";
import { API_BACK } from "@/shared/config/api/getEnv";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BACK}/products/style/${selectedStyle}`);
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
    if (selectedStyle) fetchProducts();
  }, [selectedStyle]);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category.name.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  return (

    <div className="min-h-screen bg-gray-300 pb-2 ">
      <BackButton tab="Asian" />
      <div className="max-w-7xl mx-auto my-6 bg-white rounded-lg p-0 border border-gray-300 shadow-md ">
        <div className="flex justify-between items-center px-30 px-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-left m-3 ">
            Lista de Productos
          </h2>
          <FilterCategories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

        </div>
        <div className="w-full h-px bg-gray-300"></div>

        {loading && (
          <p className="text-gray-500 text-center mt-4">
            Cargando productos...
          </p>
        )}
        {error && (
          <p className="text-red-500 text-center mt-4">Error: {error}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5 px-7 py-2">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/productDetail/${product.id}`}
              passHref
            >
              <div className="relative flex flex-col bg-white overflow-hidden rounded-lg cursor-pointer transition-transform group">
                <div
                  className="absolute top-3 right-0 bg-green-100 text-green-600 text-xs font-semibold uppercase px-4 py-1 
               rounded-bl-lg rounded-tl-lg opacity-0 shadow-md
               group-hover:opacity-100 
               transition-opacity duration-300 ease-in-out"
                >
                  Asian
                </div>
                {product.stock === 0 && (
                  <div
                    className="absolute top-3 left-0 bg-gray-800 text-white text-xs font-semibold uppercase px-4 py-1 
      rounded-br-lg rounded-tr-lg shadow-md opacity-100"
                  >
                    Sin Stock
                  </div>
                )}

                <div className="w-full h-96 bg-gray-100">
                  <Image
                    src={product.image[0] || "/placeholder-image.png"}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm truncate">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold mt-1 text-green-700">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
