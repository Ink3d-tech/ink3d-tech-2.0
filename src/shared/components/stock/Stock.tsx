"use client";
import { useState, useEffect } from "react";
import axios from "axios";

// Definir tipos de datos
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string | null;
  size: string;
  isActive: boolean;
  category: string;
}

interface StockMovement {
  id: string;
  quantity: number;
  type: string;
  reason: string;
  createdAt: string;
  product: Product;
}

interface Category {
  id: string;
  name: string;
}

export default function Stock() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchStockMovements = async () => {
      try {
        setLoading(true);
        const response = await axios.get<StockMovement[]>(
          "http://localhost:3000/stock-movements"
        );
        setStockMovements(response.data);
      } catch (error) {
        console.error(" Error al obtener movimientos de stock:", error);
        alert("Hubo un error al cargar los movimientos de stock.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(" Error al obtener categorías:", error);
      }
    };

    fetchStockMovements();
    fetchCategories();
  }, []);

  // Filtrar productos por categoría seleccionada
  const filteredStock = selectedCategory
    ? stockMovements.filter((m) => m.product.category === selectedCategory)
    : stockMovements;

  // Función para realizar una venta (restar stock)
  const handleSell = async (productId: string) => {
    try {
      const quantityToSell = 1;

      await axios.post("http://localhost:3000/sell-product", {
        productId,
        quantity: quantityToSell,
      });

      // Actualizar el estado después de la venta
      setStockMovements((prev) =>
        prev.map((m) =>
          m.product.id === productId
            ? { ...m, product: { ...m.product, stock: m.product.stock - quantityToSell } }
            : m
        )
      );

      alert(" Venta realizada con éxito.");
    } catch (error) {
      console.error(" Error al realizar la venta:", error);
      alert("Hubo un problema al procesar la venta.");
    }
  };

  if (loading) return <p className="text-white"> Cargando stock...</p>;

  return (
    <div className="p-6 bg-black shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-red-500 mb-4">
        Movimientos de Stock 
      </h2>

      {/* Filtro de categorías */}
      <div className="mb-4">
        <label className="text-white">Filtrar por categoría: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-2 p-2 bg-gray-800 text-white rounded-md"
        >
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de movimientos de stock */}
      <table className="w-full border-collapse border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="border border-red-500 p-2"> Producto</th>
            <th className="border border-red-500 p-2"> Nombre</th>
            <th className="border border-red-500 p-2">Stock</th>
            <th className="border border-red-500 p-2"> Precio</th>
            <th className="border border-red-500 p-2">Fecha</th>
            <th className="border border-red-500 p-2"> Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredStock.length > 0 ? (
            filteredStock.map((movement) => (
              <tr key={movement.id} className="text-center text-white bg-black">
                <td className="border border-red-500 p-2">{movement.product.id}</td>
                <td className="border border-red-500 p-2">{movement.product.name}</td>
                <td className="border border-red-500 p-2">{movement.product.stock}</td>
                <td className="border border-red-500 p-2">${movement.product.price}</td>
                <td className="border border-red-500 p-2">
                  {new Date(movement.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-red-500 p-2">
                  <button
                    onClick={() => handleSell(movement.product.id)}
                    disabled={movement.product.stock <= 0}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 disabled:bg-gray-600"
                  >
                    🛒 Vender
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-white text-center p-4">
                 No hay productos disponibles en esta categoría
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
