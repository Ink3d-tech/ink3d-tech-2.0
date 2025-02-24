"use client";
import { useState } from "react";
import { FaTruck, FaCoins } from "react-icons/fa"; // Importamos los íconos

export default function myCash() {
  const [sales, setSales] = useState(15000); // Ventas totales
  const [shippingCost, setShippingCost] = useState(3000); // Costos de envío

  const netProfit = sales - shippingCost; // Cálculo del balance neto

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">💰 Mi Dinero</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Ingresos Totales */}
        <div className="flex items-center justify-between border-b pb-4">
          <span className="text-lg font-semibold">Total de Ventas</span>
          <div className="flex items-center">
            <FaCoins className="text-yellow-500 text-2xl mr-2" />
            <span className="text-xl font-bold text-green-600">${sales}</span>
          </div>
        </div>

        {/* Costos de Envío */}
        <div className="flex items-center justify-between border-b py-4">
          <span className="text-lg font-semibold">Costos de Envío</span>
          <div className="flex items-center">
            <FaTruck className="text-blue-500 text-2xl mr-2" />
            <span className="text-xl font-bold text-red-600">-${shippingCost}</span>
          </div>
        </div>

        {/* Balance Neto */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-lg font-semibold">Ganancias Netas</span>
          <span className="text-2xl font-bold text-gray-900">${netProfit}</span>
        </div>
      </div>
    </div>
  );
}
