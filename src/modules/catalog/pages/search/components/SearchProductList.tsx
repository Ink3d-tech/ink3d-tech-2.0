"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EmptySearch from "./EmptySearch";
import { useProducts } from "@/modules/user/pages/manager/context/Products.context";
import "./search.css";   // bg-color del body al gris 
import { CardProductComponent } from "@/modules/checkout/pages/cart/components/Products.component";
import Loading from "@/app/loading";
import Link from "next/link";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number | "";
  stock: number | "";
  image: string[];
  size: string;
  color: string;
  discount?: number | "";
  category: string;
  isActive?: boolean;
  style: string;
}

export default function SearchProductList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const filteredProducts = query
      ? products.filter((product: Product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

    setShownProducts(filteredProducts);
    setLoading(false);
  }, [query, products]);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Capa de fondo con imagen en mosaico y blur */}
      <div
        className="absolute inset-0 bg-repeat blur-xl z-0"
        style={{
          backgroundImage: "url('/images/textures/8.jpg')",
          backgroundSize: "1000px", // Ajusta el tamaño del mosaico
          backgroundPosition: "center",
          backgroundRepeat: "repeat", // Hace que la imagen se repita en mosaico
          filter: "blur(10px)", // Aplica el desenfoque
        }}
      />

      <div className="relative z-10">
        {query ? (
          <div>
            <input
              type="text"
              placeholder="Buscar..."
              className="flex md:hidden p-2 mx-auto mt-10 rounded-md bg-white text-black border w-3/4 transition-all duration-300 ease-in-out"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="md:w-3/4 w-5/6 mx-auto my-6 bg-white rounded-lg p-4 border border-gray-300 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 text-left">
                Resultados para: {query}
              </h2>
              <div className="w-full h-px bg-gray-300 my-2"></div>

              {loading && <Loading/>}

              {shownProducts?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                  {shownProducts.map((shownProduct) => (
                    <Link key={shownProduct.id} href={`/productDetail/${shownProduct.id}`}>
                      <CardProductComponent  product={shownProduct} />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center mt-4">No se encontraron resultados.</p>
              )}
            </div>
          </div>
        ) : (
          <EmptySearch />
        )}
      </div>
    </div>
  );
}
