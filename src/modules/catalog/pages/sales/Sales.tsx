"use client";

import React, { useState, useEffect } from "react";
import { Gift, ShoppingBag, Gamepad2 } from "lucide-react";
import { API_BACK } from "@/shared/config/api/getEnv";
import { Product } from "@/modules/checkout/pages/cart/context/Cart.context";
import ProductCards from "../products/components/ProductCards";

export default function Sales() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BACK}/products`)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
        setProducts(shuffled);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  const getStyleClasses = (style: string | undefined) => {
    if (!style) return "bg-gray-800"; // Si no tiene estilo, asigna un fondo gris
    // Lógica para asignar estilos personalizados según el `style`
    if (style === "vintage") return "bg-yellow-500"; // Ejemplo de estilo
    if (style === "modern") return "bg-blue-500";  // Otro ejemplo
    return "bg-gray-700"; // Por defecto
  };
  
  return (
    <div className="min-h-screen text-white relative">
      {/* Header */}
      <header className="bg-red-600 py-6 z-10 relative">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold">🔥 INK3D 🔥</h1>
          </div>
          <div className="flex space-x-4">
            <Gift className="h-6 w-6 text-white" />
            <button
              // onClick={() => setShowGamesModal(true)}
              className="flex items-center bg-red-700 px-4 py-2 rounded-lg text-white hover:bg-red-800 transition"
            >
              <Gamepad2 className="h-5 w-5 mr-2" /> Juega y Gana
            </button>
          </div>
        </div>
      </header>

      {/* Background */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCards
              key={product.id}
              product={product}
              getStyleClasses={getStyleClasses} // Pasa la función de estilos
            />
          ))}
        </div>
      </main>

      {/* Modales de Juegos
      <DiscountGames
        showGamesModal={showGamesModal}
        setShowGamesModal={setShowGamesModal}
      /> */}
    </div>
  );
}
