"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}
export function ProductCard({ products, small = false }: { products: Product[]; small?: boolean }) {
  const router = useRouter();

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No hay productos disponibles</p>;
  }

  return (
    <div className="space-y-4 ">
      <div className={`grid ${small ? "grid-cols-4 gap-2 overflow-x-auto flex-nowrap" : "grid-cols-1 gap-4"}`}>
        {products.slice(-4).map(({ id, name, price, image }) => (
          <div
            key={id}
            className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border ${small ? "w-28" : "w-full"}`}
            onClick={() => router.push(`/productDetail/${id}`)} // 🔹 Hace toda la tarjeta clickeable
            style={{ cursor: "pointer" }} // 🔹 Cambia el cursor para indicar interactividad
          >
            {/* Imagen del producto */}
            <div className="relative w-full h-40">
              <Image
                src={image || "/placeholder-image.png"}
                alt={name}
                width={200}
                height={150}
                className="w-full h-full object-cover transition-transform transform group-hover:scale-110 duration-700"
              />
            </div>

            {/* Información del producto */}
            <div className={`p-3 ${small ? "text-xs" : "text-base"}`}>
              <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {name}
              </h3>

              {/* Precio */}
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-indigo-600 text-lg">${Number(price).toFixed(2)}</span>

                {/* Botón para ver detalles */}
                <button
                  className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/productDetail/${id}`);
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
