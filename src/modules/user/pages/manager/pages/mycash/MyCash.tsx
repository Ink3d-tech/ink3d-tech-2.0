"use client"
import { useState, useEffect } from "react";
import { FaTruck, FaCoins, FaChartLine } from "react-icons/fa";

export default function MyCash() {
  const [financeData, setFinanceData] = useState({
    totalSales: 0,
    shippingCosts: 0,
    netProfit: 0,
  });

  useEffect(() => {
    fetch("/manager/finance")
      .then((res) => res.json())
      .then((data) => setFinanceData(data))
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">💰 Finanzas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Total de Ventas</h3>
            <p className="text-2xl font-bold text-green-600">${financeData.totalSales}</p>
          </div>
          <FaCoins className="text-yellow-500 text-3xl" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Costos de Envío</h3>
            <p className="text-2xl font-bold text-red-600">-${financeData.shippingCosts}</p>
          </div>
          <FaTruck className="text-blue-500 text-3xl" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Ganancias Netas</h3>
            <p className="text-2xl font-bold text-gray-900">${financeData.netProfit}</p>
          </div>
          <FaChartLine className="text-green-500 text-3xl" />
        </div>
      </div>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        onClick={() => alert("Descargando Reporte...")}
      >
        📊 Descargar Reporte
      </button>
    </div>
  );
}


