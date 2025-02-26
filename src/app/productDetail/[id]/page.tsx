"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://project-ink3d-back-1.onrender.com/products/${id}`);
        const data = await response.json();

        console.log("Producto recibido:", data);
        setProduct(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-gray-500 text-center mt-10">Cargando producto...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!product) return <p className="text-gray-500 text-center mt-10">Producto no encontrado</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6">
        {/* Imagen del producto */}
        {product.image && (
          <div className="flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg object-cover w-full md:w-[400px] h-auto"
            />
          </div>
        )}

        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-500 text-lg mt-2">{product.description}</p>

            {typeof product.category === "string" ? (
                <span className="text-xs font-bold text-blue-700 bg-blue-200 px-2 py-1 uppercase mt-2 inline-block">
                {product.category}
              </span>
            ) : (
                <span className="text-xs font-bold ext-green-700 bg-green-200 px-2 py-1 uppercase mt-2 inline-block">
                Asian
              </span>
            )}
            <p className="text-3xl font-bold text-black mt-4">${product.price}</p>
          </div>

          <div className="mt-6">
            <div className="mb-4">
              <p className="text-sm font-bold mb-2">Selecciona tu talla:</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="px-3 py-2 border rounded-md hover:bg-gray-200 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                Agregar al carrito 🛒
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                Añadir a favoritos ❤️ 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
