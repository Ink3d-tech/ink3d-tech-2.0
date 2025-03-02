"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Transaction {
  id: string;
  type: "Ingreso" | "Gasto";
  amount: number;
  date: string;
  description: string;
}

export default function Finanzas() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Transaction[]>("");
        setTransactions(response.data);
      } catch (error) {
        console.error("❌ Error al obtener datos financieros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Calcular métricas
  const ingresos = transactions.filter((t) => t.type === "Ingreso").reduce((sum, t) => sum + t.amount, 0);
  const gastos = transactions.filter((t) => t.type === "Gasto").reduce((sum, t) => sum + t.amount, 0);
  const balance = ingresos - gastos;

  // Formatear datos para el gráfico
  const chartData = transactions.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: t.amount,
    type: t.type,
  }));

  if (loading) return <p className="text-white">⏳ Cargando datos financieros...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-green-400 mb-6">📊 Finanzas</h2>

      {/* Resumen financiero */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-yellow-500 rounded-lg shadow-lg">
          <h3 className="text-xl">💰 Ingresos</h3>
          <p className="text-2xl font-bold">${ingresos.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-pink-500 rounded-lg shadow-lg">
          <h3 className="text-xl">📉 Gastos</h3>
          <p className="text-2xl font-bold">${gastos.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-green-200 rounded-lg shadow-lg">
          <h3 className="text-xl">📈 Balance</h3>
          <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Gráfico de tendencias */}
      <div className="w-full h-60 bg-gray-800 rounded-md p-4 mb-6">
        <h3 className="text-lg text-white mb-3">📈 Tendencia Financiera</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="amount" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de transacciones recientes */}
      <h3 className="text-lg text-white mb-3">📜 Transacciones Recientes</h3>
      <table className="w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="border border-gray-600 p-2">📅 Fecha</th>
            <th className="border border-gray-600 p-2">📋 Descripción</th>
            <th className="border border-gray-600 p-2">💵 Monto</th>
            <th className="border border-gray-600 p-2">📌 Tipo</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="text-center bg-gray-800">
              <td className="border border-gray-600 p-2">{new Date(t.date).toLocaleDateString()}</td>
              <td className="border border-gray-600 p-2">{t.description}</td>
              <td className="border border-gray-600 p-2">${t.amount.toLocaleString()}</td>
              <td className={`border border-gray-600 p-2 ${t.type === "Ingreso" ? "text-green-400" : "text-red-400"}`}>
                {t.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
