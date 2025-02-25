"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://project-ink3d-back-1.onrender.com/products");

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-300 p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Productos</h1>

      {loading && <p className="text-gray-500">Cargando productos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center bg-white overflow-hidden shadow-lg rounded-lg"
          >
            <div className="w-full overflow-hidden">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <span className="text-gray-500">Imagen no disponible</span>
              )}
            </div>

            <div className="p-4 text-center">
            {typeof product.category === "string" ? (
                <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 uppercase">
                    {product.category}
                </span>
                ) : (
                <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 uppercase">
                    Asian
                </span>
                )}

              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{product.description}</p>
              <p className="text-2xl font-bold mt-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
