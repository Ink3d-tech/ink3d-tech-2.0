"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  category: "Remeras" | "Joggers" | "Buzos";
  stock: number;
  price: number;
  image: string; // Nueva propiedad para la imagen
}

// Mapear categorías a emojis
const categoryEmojis: Record<string, string> = {
  Remeras: "👕",
  Joggers: "👖",
  Buzos: "🧥",
};

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Remeras" | "Joggers" | "Buzos">("All");
  const [loading, setLoading] = useState(true);

  // Obtener movimientos de stock desde el backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3002/stock-movements")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("📦 Movimientos de stock cargados:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ Error al obtener movimientos de stock:", error);
        alert("Hubo un error al cargar los movimientos. Revisa la consola.");
        setLoading(false);
      });
  }, []);

  // Filtrar productos según categoría
  const filteredProducts = categoryFilter === "All"
    ? products
    : products.filter(product => product.category === categoryFilter);

  // Función para vender un producto y actualizar stock
  const handleSell = async (id: number, quantity: number) => {
    const response = await fetch("https://project-ink3d-back-1.onrender.com/api#/StockMovements/StockMovementsController_getAllStockMovements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, quantity }),
    });

    const data = await response.json();

    if (response.ok) {
      setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock - quantity } : p));
      alert("✅ Compra realizada con éxito");
    } else {
      alert("❌ " + data.message);
    }
  };

  if (loading) return <p className="text-white">⏳ Cargando stock...</p>;

  return (
    <div className="p-6 bg-black shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-red-500 mb-4">🔥 Stock de Productos 🔥</h2>

      {/* Selector de categoría */}
      <div className="mb-4">
        <label className="text-lg font-medium text-white mr-2">📌 Filtrar por categoría:</label>
        <select 
          className="border border-red-500 p-2 rounded-md bg-black text-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as "All" | "Remeras" | "Joggers" | "Buzos")}
        >
          <option value="All">🌍 Todos</option>
          <option value="Remeras">👕 Remeras</option>
          <option value="Joggers">👖 Joggers</option>
          <option value="Buzos">🧥 Buzos</option>
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
            filteredProducts.map(product => (
              <tr key={product.id} className="text-center text-white bg-black">
                <td className="border border-red-500 p-2">{product.id}</td>
                <td className="border border-red-500 p-2">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border border-red-500 p-2">{product.name}</td>
                <td className="border border-red-500 p-2">{categoryEmojis[product.category]} {product.category}</td>
                <td className="border border-red-500 p-2">{product.stock}</td>
                <td className="border border-red-500 p-2">${product.price}</td>
                <td className="border border-red-500 p-2">
                  <button 
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
                    disabled={product.stock === 0}
                    onClick={() => handleSell(product.id, 1)}
                  >
                    🛒 Comprar 1
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-white text-center p-4">⚠️ No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

