
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { Search } from "lucide-react";
import SkeletonStock from "./SkeletonStock";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string[];
  size: string;
  style: string;
  discount: number;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
}

interface StockMovement {
  id: string;
  quantity: number;
  type: string;
  reason: string;
  createdAt: string;
  previousStock: number;
  newStock: number;
  product: Product | null;
}

export default function StockMovements() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  // const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("❌ No se ha encontrado el token de autenticación.");
      setLoading(false);
      return;
    }

    const fetchStockMovements = async () => {
      try {
        const response = await axios.get<StockMovement[]>(`${API_BACK}/stock-movements`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("📦 Movimientos de stock recibidos:", response.data);

        setStockMovements(response.data);

        if (response.data.length > 0) {
          // setSelectedMovement(response.data[response.data.length - 1]);
        }
      } catch (error) {
        console.error("❌ Error al obtener movimientos de stock:", error);
        setError("Hubo un error al cargar los movimientos de stock.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockMovements();
  }, []);

  // Agrupar movimientos por talla
  const groupBySize = stockMovements.reduce((acc, movement) => {
    if (!movement.product) return acc;
    const size = movement.product.size || "Sin Talla";
    if (!acc[size]) acc[size] = [];
    acc[size].push(movement);
    return acc;
  }, {} as Record<string, StockMovement[]>);

  if (loading) return <SkeletonStock/>
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📦 Movimientos de Stock</h2>

      {/* Barra de búsqueda */}
      <div className="mb-4 flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full bg-transparent outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Movimientos agrupados por talla */}
      {Object.entries(groupBySize).map(([size, movements]) => {
        const filteredMovements = movements.filter((movement) =>
          movement.product?.name.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <div key={size} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">👕 Talla: {size}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-gray-800">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2 text-left">Producto</th>
                    <th className="border p-2 text-left">Stock Inicial</th>
                    <th className="border p-2 text-left">Fecha Inicial</th>
                    <th className="border p-2 text-left">Vendidos</th>
                    <th className="border p-2 text-left">Stock Actual</th>
                    <th className="border p-2 text-left">Último Movimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovements.map((movement) => {
                    if (!movement.product) return null;

                    const movimientosProducto = stockMovements.filter(
                      (m) => m.product?.id === movement.product?.id
                    );

                    // Stock Inicial: Buscamos el primer movimiento con "type": "initial_stock"
                    const stockInicialMovimiento = movimientosProducto.find(
                      (m) => m.type === "initial_stock"
                    );

                    const stockInicial = stockInicialMovimiento ? stockInicialMovimiento.newStock : 0;
                    const fechaStockInicial = stockInicialMovimiento
                      ? new Date(stockInicialMovimiento.createdAt).toLocaleDateString()
                      : "N/A";

                    // Vendidos: Suma de todas las ventas ("order_creation")
                    const vendidos = movimientosProducto
                      .filter((m) => m.type === "order_creation")
                      .reduce((sum, m) => sum + Math.abs(m.quantity), 0);

                    // Stock Actual: Calculado como Stock Inicial - Vendidos
                    const stockActual = stockInicial - vendidos;

                    return (
                      <tr
                        key={movement.id}
                        className="cursor-pointer hover:bg-gray-100"
                        // onClick={() => setSelectedMovement(movement)}
                      >
                        <td className="border p-2">{movement.product.name}</td>
                        <td className="border p-2">{stockInicial}</td>
                        <td className="border p-2">{fechaStockInicial}</td>
                        <td className="border p-2">{vendidos}</td>
                        <td className="border p-2">{stockActual}</td>
                        <td className="border p-2">
                          {new Date(movement.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}