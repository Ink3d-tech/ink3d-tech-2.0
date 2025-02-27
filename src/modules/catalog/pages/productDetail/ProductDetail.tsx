"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/shared/components/buttons/BackButton.component";
import { Heart } from "lucide-react"; // Importamos el ícono de corazón

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
  const [isFavorited, setIsFavorited] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://project-ink3d-back-1.onrender.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFavoriteClick = () => {
    const newState = !isFavorited;
    setIsFavorited(newState);
    setNotificationMessage(newState ? "Se añadió a favoritos!" : "Se quitó de favoritos!");

    setTimeout(() => {
      setNotificationMessage(null);
    }, 2000);
  };

  if (loading) return <p className="text-gray-500 text-center mt-10">Cargando producto...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!product) return <p className="text-gray-500 text-center mt-10">Producto no encontrado</p>;

  return (
    <div>
      <BackButton tab="Producto" />
      <div className="min-h-screen flex items-center justify-center bg-gray-300 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6 relative">

          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            onClick={handleFavoriteClick}
          >
            <Heart size={20} fill={isFavorited ? "black" : "none"} stroke="black" />
          </button>

          {/* Notificación dinámica */}
          {notificationMessage && (
            <div className="absolute -top-9 right-0 bg-black text-white text-sm px-3 py-1 rounded-md shadow-lg animate-fade-in">
              {notificationMessage}
            </div>
          )}

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
                <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 uppercase mt-2 inline-block">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
