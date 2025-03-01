"use client";
import { useState, useEffect } from "react";

// Definir el tipo correcto de producto
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string | null;
  size: string;
  isActive: boolean;
  category: string; // Se mantiene flexible en caso de futuras categorías
}

// Mapear categorías a emojis
const categoryEmojis: Record<string, string> = {
  Remeras: "👕",
  Joggers: "👖",
  Buzos: "🧥",
  Pantalones: "👖",
};

// Categorías disponibles
const categories = ["All", "Remeras", "Joggers", "Buzos", "Pantalones"];

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);

  
  useEffect(() => {
    setLoading(true);
    fetch("https://project-ink3d-back-1.onrender.com/stock-movements")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("📦 Productos cargados:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error al obtener productos:", error);
        alert("Hubo un error al cargar los productos. Revisa la consola.");
        setLoading(false);
      });
  }, []);

  // Filtrar productos por categoría
  const filteredProducts =
    categoryFilter === "All"
      ? products
      : products.filter((product) => product.category === categoryFilter);

  // Función para vender un producto
  const handleSell = async (id: string, quantity: number) => {
    try {
      const response = await fetch(
        `https://project-ink3d-back-1.onrender.com/stock-movements/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === id ? { ...p, stock: p.stock - quantity } : p
          )
        );
        alert("✅ Compra realizada con éxito");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("❌ Error en la compra:", error);
      alert("Hubo un error al procesar la compra.");
    }
  };

  if (loading) return <p className="text-white">⏳ Cargando stock...</p>;

  return (
    <div className="p-6 bg-black shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-red-500 mb-4">
        🔥 Stock de Productos 🔥
      </h2>

      {/* Selector de categoría */}
      <div className="mb-4">
        <label className="text-lg font-medium text-white mr-2">
          📌 Filtrar por categoría:
        </label>
        <select
          className="border border-red-500 p-2 rounded-md bg-black text-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {categoryEmojis[cat] || "🌍"} {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de productos */}
      <table className="w-full border-collapse border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="border border-red-500 p-2">🆔 ID</th>
            <th className="border border-red-500 p-2">📸 Imagen</th>
            <th className="border border-red-500 p-2">📦 Nombre</th>
            <th className="border border-red-500 p-2">📂 Categoría</th>
            <th className="border border-red-500 p-2">📊 Stock</th>
            <th className="border border-red-500 p-2">💰 Precio</th>
            <th className="border border-red-500 p-2">⚡ Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id} className="text-center text-white bg-black">
                <td className="border border-red-500 p-2">{product.id}</td>
                <td className="border border-red-500 p-2">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    "❌ Sin imagen"
                  )}
                </td>
                <td className="border border-red-500 p-2">{product.name}</td>
                <td className="border border-red-500 p-2">
                  {categoryEmojis[product.category] || "📦"} {product.category}
                </td>
                <td className="border border-red-500 p-2">{product.stock}</td>
                <td className="border border-red-500 p-2">${product.price}</td>
                <td className="border border-red-500 p-2">
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-white text-center p-4">
                ⚠️ No hay productos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
