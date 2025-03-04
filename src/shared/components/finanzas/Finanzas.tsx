import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

// Definir tipos
interface Venta {
  id: number;
  producto: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface VentasPorProducto {
  producto: string;
  cantidadVendida: number;
}

interface Stats {
  totalVentas: number;
  productosVendidos: number;
  ticketPromedio: number;
  productoMasVendido: string;
}

const Finanzas = () => {
  const [stats, setStats] = useState<Stats>({
    totalVentas: 0,
    productosVendidos: 0,
    ticketPromedio: 0,
    productoMasVendido: "",
  });

  const [ventasPorProducto, setVentasPorProducto] = useState<VentasPorProducto[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    axios.get<Stats>("") // Sustituye con la URL real
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error al obtener resumen:", err));

    axios.get<VentasPorProducto[]>("") // Sustituye con la URL real
      .then((res) => setVentasPorProducto(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Error al obtener ventas por producto:", err));

    axios.get<Venta[]>("") // Sustituye con la URL real
      .then((res) => setVentas(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Error al obtener ventas:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen  text-white">
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-semibold mb-4 text-red-500"> Finanzas</h2>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Total Ventas</h3>
            <p className="text-xl">
              ${typeof stats.totalVentas === "number" ? stats.totalVentas.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="bg-white text-black p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Productos Vendidos</h3>
            <p className="text-xl">{stats.productosVendidos}</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Ticket Promedio</h3>
            <p className="text-xl">${(stats.ticketPromedio ?? 0).toFixed(2)}</p>
          </div>
          <div className="bg-white text-black p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Producto Más Vendido</h3>
            <p className="text-xl">{stats.productoMasVendido || "N/A"}</p>
          </div>
        </div>

        {/* Gráfico de ventas por producto */}
        <div className="bg-white p-4 rounded-md shadow-md text-black mb-6">
          <h3 className="text-xl font-semibold mb-2 text-center"> Ventas por Producto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasPorProducto}>
              <XAxis dataKey="producto" stroke="black" />
              <YAxis stroke="black" />
              <Tooltip />
              <Bar dataKey="cantidadVendida" fill="#1a1a1a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de detalle de ventas */}
        <div className="bg-white text-black p-4 rounded-md shadow-md overflow-auto max-h-[400px]">
          <h3 className="text-xl font-semibold mb-2 text-center"> Detalle de Ventas</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Producto</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Cantidad</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(ventas) && ventas.length > 0 ? (
                ventas.map((venta) => (
                  <tr key={venta.id} className="text-center border-b">
                    <td className="p-3">{venta.id}</td>
                    <td className="p-3">{venta.producto}</td>
                    <td className="p-3">${venta.precio.toFixed(2)}</td>
                    <td className="p-3">{venta.cantidad}</td>
                    <td className="p-3">${venta.total.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center">
                    No hay ventas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Finanzas;



