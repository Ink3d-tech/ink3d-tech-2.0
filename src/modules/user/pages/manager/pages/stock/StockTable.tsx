import { StockMovement } from "./types";
import { Dispatch, SetStateAction } from "react";

interface StockTableProps {
  data: Record<string, StockMovement[]>; 
  type: "byProduct" | "bySize";
  setSelectedMovement: Dispatch<SetStateAction<StockMovement | null>>; // ✅ Corrección aquí
}

export default function StockTable({ data, type, setSelectedMovement }: StockTableProps) {
  return (
    <>
      {Object.keys(data).map((key) => {
        const stockData = data[key]; 
        return (
          <div key={key} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              {type === "byProduct" ? `📦 Producto: ${key}` : `👕 Talla: ${key}`}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-gray-800">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2 text-left">{type === "byProduct" ? "Talla" : "Producto"}</th>
                    <th className="border p-2 text-left">Stock Inicial</th>
                    <th className="border p-2 text-left">Vendidos</th>
                    <th className="border p-2 text-left">Stock Actual</th>
                    <th className="border p-2 text-left">Último Movimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((stock) => (
                    <tr
                      key={`${stock.product.id}-${stock.size}`}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectedMovement(prev => ({
                        ...stock,
                        id: prev?.id || "generated-id",
                        quantity: prev?.quantity || 0,
                        type: prev?.type || "sale",
                        reason: prev?.reason || "default reason",
                        previousStock: prev?.previousStock || stock.stockInicial,
                        newStock: prev?.newStock || stock.stockActual,
                      }))} 
                    >
                      <td className="border p-2">{type === "byProduct" ? stock.size : stock.product.name}</td>
                      <td className="border p-2">{stock.stockInicial}</td>
                      <td className="border p-2">{stock.vendidos}</td>
                      <td className="border p-2">{stock.stockActual}</td>
                      <td className="border p-2">{stock.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </>
  );
}
