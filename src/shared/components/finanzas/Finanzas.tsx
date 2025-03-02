

 import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Finanzas = () => {
  const transactions = [
    { id: 1, producto: "Jogger", precio: 49.99, cantidad: 10, total: 499.9 },
    { id: 2, producto: "Remera", precio: 19.99, cantidad: 15, total: 299.85 },
    { id: 3, producto: "Buzo", precio: 39.99, cantidad: 8, total: 319.92 },
  ];

  const chartData = transactions.map((t) => ({
    name: t.producto,
    ventas: t.total,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-semibold mb-4 text-red-500">📊 Finanzas</h2>

        {/* Contenedor de métricas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Total Ventas</h3>
            <p className="text-xl">$1,119.67</p>
          </div>
          <div className="bg-white text-black p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Productos Vendidos</h3>
            <p className="text-xl">33</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Ganancias Netas</h3>
            <p className="text-xl">$560.45</p>
          </div>
        </div>

        {/* Gráfico de ventas */}
        <div className="bg-white p-4 rounded-md shadow-md text-black mb-6">
          <h3 className="text-xl font-semibold mb-2 text-center">📊 Ventas por Producto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="black" />
              <YAxis stroke="black" />
              <Tooltip />
              <Bar dataKey="ventas" fill="#1a1a1a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de transacciones */}
        <div className="overflow-auto max-h-[500px] bg-white text-black p-4 rounded-md shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="text-center border-b">
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">{t.producto}</td>
                  <td className="p-2">${t.precio.toFixed(2)}</td>
                  <td className="p-2">{t.cantidad}</td>
                  <td className="p-2">${t.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer fijo */}
      <footer className="bg-red-500 text-white text-center p-4">
        © 2024 Mi Tienda - Finanzas
      </footer>
    </div>
  );
};

export default Finanzas