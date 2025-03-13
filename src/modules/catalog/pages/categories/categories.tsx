"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BACK } from "@/shared/config/api/getEnv";
import Loading from "@/app/loading";

interface Product {
  id: string;
  style: string;
}

// Imágenes adicionales por estilo
const styleImages: Record<string, string[]> = {
  Motorsport: [
    "https://i.pinimg.com/736x/62/9e/ae/629eaed82ef18d6cdb819c229480dfdf.jpg",
    "https://i.pinimg.com/736x/19/86/dc/1986dc7fe0d2a9cd6d1731e0258c5fa4.jpg",
    "https://i.pinimg.com/736x/9e/68/c9/9e68c99de37b176fc94956375aad4546.jpg",
  ],
  Asian: [
    "https://i.pinimg.com/736x/e1/2d/ad/e12dad37fefb2ada0cca074e0b4f342d.jpg",
    "https://i.pinimg.com/736x/10/d4/8d/10d48d0fbc257ad86be9a3f3f315ede5.jpg",
    "https://i.pinimg.com/736x/5d/08/86/5d0886fd03e9f5a51a98cc6a2684bdab.jpg",
  ],
  Streetwear: [
    "https://i.pinimg.com/736x/75/b9/b1/75b9b18b3a6ec4063d6ec3d3ec04b4a6.jpg",
    "https://i.pinimg.com/736x/7c/33/63/7c3363228f3c5a82fd3f65fd08757fc1.jpg",
    "https://i.pinimg.com/736x/8f/0b/8a/8f0b8add66e1bce8f7b4cf0bccc51311.jpg",
  ],
};

// Imágenes predeterminadas si no hay imágenes en styleImages
const defaultImages: Record<string, string> = {
  Motorsport: "/images/LogoMotorsport.png",
  Asian: "/images/LogoAsian.png",
  Streetwear: "/images/LogoStreetwear.png",
};

export default function Categories() {
  const [styles, setStyles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImages, setCurrentImages] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BACK}/products`);
        if (!response.ok) throw new Error("Error al obtener los productos");
        const data: Product[] = await response.json();

        // Extraer estilos únicos de los productos
        const uniqueStyles = [...new Set(data.map((product) => product.style))];
        setStyles(uniqueStyles);

        // Inicializar el índice de imagen para cada estilo
        const initialIndexes = uniqueStyles.reduce((acc, style) => {
          acc[style] = 0;
          return acc;
        }, {} as Record<string, number>);
        setCurrentImages(initialIndexes);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Cambiar la imagen de cada estilo cada 10 segundos si tiene varias imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        styles.forEach((style) => {
          if (styleImages[style]?.length > 1) {
            newIndexes[style] = (prevIndexes[style] + 1) % styleImages[style].length;
          }
        });
        return newIndexes;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [styles]);

  let gridClass = "grid-cols-1";

  if (styles.length === 3) {
    gridClass = "md:grid-cols-3";
  } else if (styles.length === 4) {
    gridClass = "md:grid-cols-2";
  }

  return (
    <div className="min-h-screen bg-black -mb-44">
      {/* Barra de navegación de estilos */}
      <div className="flex overflow-x-auto space-x-2 p-4 bg-black shadow-md sticky top-0 z-10">
        <Link href="/products" className="px-4 py-2 text-white rounded-full text-sm hover:bg-gray-900">
          Todos
        </Link>
        {styles.map((style) => (
          <Link key={style} href={`/products?style=${style}`} className="px-4 py-2 text-white rounded-full text-sm hover:bg-gray-900">
            {style}
          </Link>
        ))}
      </div>

      {/* Mostrar errores o carga */}
      {loading && <Loading/>}
      {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}

      {/* Contenedor de imágenes con reglas dinámicas */}
      <div className={`grid ${gridClass} gap-0 w-full px-4`}>
        {styles.map((style) => {
          const images = styleImages[style] || [];
          const hasCustomImages = images.length > 0;
          const currentImageIndex = currentImages[style] || 0;
          const imageToShow = hasCustomImages ? images[currentImageIndex] : defaultImages[style];

          return (
            <Link key={style} href={`/products?style=${style}`} passHref>
              <div
                className={`group relative overflow-hidden transform hover:scale-[1.01] transition-all duration-200`}
              >
                <div className="relative w-full h-[70vh] cursor-pointer overflow-hidden">
                  <Image
                    src={imageToShow}
                    alt={style}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-all duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <p className="text-white font-extrabold text-3xl uppercase text-center">{style}</p>
                  </div>
                </div>
              </div>
              <div className="bg-black h-10 relative index-90"></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
