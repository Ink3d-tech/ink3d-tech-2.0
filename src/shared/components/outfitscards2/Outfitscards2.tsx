"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface Outfit {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
}

export function OutfitsCards({ outfits }: { outfits: Outfit[] }) {
  const router = useRouter();

  if (!outfits || outfits.length === 0) {
    return <p className="text-center text-gray-500">No hay outfits disponibles</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {outfits.map(({ id, name, price, image, brand }) => (
          <div
            key={id}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border cursor-pointer"
            onClick={() => router.push(`/streetwear/${id}`)}
          >
            {/* Imagen */}
            <div className="relative w-full h-52">
              <Image
                src={image || "/placeholder-image.png"}
                alt={name}
                width={300}
                height={200}
                className="w-full h-full object-cover transition-transform transform group-hover:scale-110 duration-700"
              />
            </div>

            {/* Información */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-red-600 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500">{brand}</p>

              {/* Precio + Botón */}
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-red-600 text-lg">${Number(price).toFixed(2)}</span>
                <button
                  className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/streetwear/${id}`);
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
