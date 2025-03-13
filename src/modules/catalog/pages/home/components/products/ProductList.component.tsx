"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import VerMas from "@/shared/components/buttons/VerMas.component";
import { getProductsByCategoryName } from "../../helpers/productService";
import Loading from "@/app/loading";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    id: string;
    name: string;
  };
  image: string;
  size: string;
  stock: number;
  style: string;
}

interface ProductListProps {
  categoryName: string;
  title: string;
}

export default function ProductList({ categoryName, title }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStyleClasses = (style: string | undefined) => {
    if (!style) return "bg-blue-500 text-white";
    const normalizedStyle = style.trim().toLowerCase();
    const styleColors: Record<string, string> = {
      motorsport: "bg-red-500 text-white",
      asian: "text-green-600 bg-green-100",
      streetwear: "bg-black text-white",
    };

    return styleColors[normalizedStyle] || "bg-blue-500 text-white";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategoryName(categoryName);

        const uniqueProducts = data.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.name === product.name)
        );

        setProducts(uniqueProducts);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="pb-2">
      <div className="max-w-8xl mx-auto my-6 bg-gray-100 rounded-lg p-0 border border-gray-300 shadow-md mt-10">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-left m-3">
            {title}
          </h2>
        </div>
        <div className="w-full h-px bg-gray-300"></div>

        {loading && <Loading />}
        {error && (
          <p className="text-red-500 text-center mt-4">Error: {error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5 px-7 py-2">
          {products.slice(0, 8).map((product) => (
            <Link key={product.id} href={`/productDetail/${product.id}`} passHref>
              <div className="relative flex flex-col bg-white overflow-hidden rounded-lg cursor-pointer transition-transform group shadow-md">

                {product.stock === 0 && (
                  <div className="absolute top-3 left-0 bg-gray-800 text-white text-xs font-semibold uppercase px-4 py-1 rounded-br-lg rounded-tr-lg shadow-md">
                    Sin Stock
                  </div>
                )}

                <span
                  className={`absolute top-3 right-0 text-xs font-semibold uppercase px-4 py-1 rounded-bl-lg rounded-tl-lg 
                    shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10 
                    ${getStyleClasses(product.style)}`}
                >
                  {product.style || "Sin estilo"}
                </span>

                <div className="relative w-full h-[440px] aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image[0]}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover rounded transition duration-500 transform group-hover:opacity-0"
                  />
                  <Image
                    src={product.image[1] ? product.image[1] : product.image[0]}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="p-3 text-center">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm truncate">{product.description}</p>
                  <p className="text-lg font-bold mt-1 text-green-700">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>


        <VerMas href={`/products?category=${encodeURIComponent(title)}`} />
      </div>
    </div>
  );
}
