import { Dispatch, SetStateAction } from "react";
import { StockMovement } from "./types";

interface SummaryTableProps {
  groupedByProduct: Record<string, StockMovement[]>; 
  setSelectedMovement: Dispatch<SetStateAction<StockMovement | null>>; // ✅ Usa Dispatch aquí
}


export default function SummaryTable({ groupedByProduct, setSelectedMovement }: SummaryTableProps) {
  return (
    <>
      <h3 className="text-xl font-semibold text-gray-700">📊 Resumen de Stock</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-gray-800">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 text-left">Producto</th>
              <th className="border p-2 text-left">Stock Inicial</th>
              <th className="border p-2 text-left">Vendidos</th>
              <th className="border p-2 text-left">Stock Actual</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedByProduct).map((productName) => {
              const productStock = groupedByProduct[productName];

              // ✅ Evitar errores asegurando que `productStock` no esté vacío
              if (!productStock || productStock.length === 0) return null;

              const totalStock = productStock.reduce(
                (acc, stock) => {
                  acc.stockInicial += stock.stockInicial;
                  acc.vendidos += stock.vendidos;
                  acc.stockActual += stock.stockActual;
                  return acc;
                },
                { stockInicial: 0, vendidos: 0, stockActual: 0 }
              );

              return (
                <tr
                  key={productName}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedMovement({ 
                    ...productStock[0], 
                    id: "generated-id",  
                    quantity: 0,       
                    type: "sale",
                    reason: "default reason",
                  })}
                                  >
                  <td className="border p-2">{productName}</td>
                  <td className="border p-2">{totalStock.stockInicial}</td>
                  <td className="border p-2">{totalStock.vendidos}</td>
                  <td className="border p-2">{totalStock.stockActual}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
