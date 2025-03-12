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

export function ProductCard2({ products }: { products: Product[] }) {
  const router = useRouter();

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No hay productos disponibles</p>;
  }

  return (
    <div className="lg:hidden block mt-6">
      <div className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide sm:px-2 md:px-4">
        {products.slice(-5).map(({ id, name, price, image }) => ( // Ahora toma los últimos 5 productos
          <div
            key={id}
            className="flex-shrink-0 w-36 sm:w-40 md:w-48 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border"
            onClick={() => router.push(`/productDetail/${id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="relative w-full h-32">
              <Image
                src={image || "/placeholder-image.png"}
                alt={name}
                width={160}
                height={120}
                className="w-full h-full object-cover rounded-t-2xl transition-transform transform hover:scale-105 duration-500"
              />
            </div>

            <div className="p-2 text-sm">
              <h3 className="font-semibold text-gray-800 line-clamp-1 hover:text-indigo-600 transition-colors">
                {name}
              </h3>

              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-indigo-600">${Number(price).toFixed(2)}</span>

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
