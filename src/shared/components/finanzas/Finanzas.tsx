"use client";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  status: string;
  date: string;
}

interface Product {
  producto: string;
  cantidad_vendida: number;
}

interface SalesDetail {
  venta_id: string;
  producto: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface CategorySales {
  categoria: string;
  cantidad_vendida: number;
}

export default function FinanzasDashboard() {
  const [totalVentas, setTotalVentas] = useState<number>(0);
  const [ticketPromedio, setTicketPromedio] = useState<number>(0);
  const [productoMasVendido, setProductoMasVendido] = useState<Product | null>(null);
  const [productosPorCategoria, setProductosPorCategoria] = useState<CategorySales[]>([]);
  const [transacciones, setTransacciones] = useState<Transaction[]>([]);
  const [detalleVentas, setDetalleVentas] = useState<SalesDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ventasRes, ticketRes, productoRes, categoriasRes, transRes, detallesRes] = await Promise.all([
          fetch("/api/finance/total-ventas").then(res => res.json()),
          fetch("/api/finance/ticket-promedio").then(res => res.json()),
          fetch("/api/finance/producto-mas-vendido").then(res => res.json()),
          fetch("/api/finance/productos-vendidos-categoria").then(res => res.json()),
          fetch("/api/finance/transacciones").then(res => res.json()),
          fetch("/api/finance/detalle-ventas").then(res => res.json()),
        ]);

        setTotalVentas(ventasRes.total || 0);
        setTicketPromedio(ticketRes.ticket_promedio || 0);
        setProductoMasVendido(productoRes || null);
        setProductosPorCategoria(categoriasRes || []);
        setTransacciones(transRes || []);
        setDetalleVentas(detallesRes || []);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-zinc-100 min-h-screen text-white">
      <h1 className=" text-black text-3xl font-bold mb-6">Dashboard Financiero</h1>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-pink-500 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-black"> Total Ventas</h2>
          <p className="text-2xl">${totalVentas.toFixed(2)}</p>
        </div>
        <div className="bg-orange-500 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-black"> Ticket Promedio</h2>
          <p className="text-2xl">${ticketPromedio.toFixed(2)}</p>
        </div>
        <div className="bg-violet-500 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-black"> Producto Más Vendido</h2>
          <p className="text-xl">{productoMasVendido?.producto || "N/A"}</p>
          <p className="text-sm">Cantidad: {productoMasVendido?.cantidad_vendida || 0}</p>
        </div>
      </div>

      {/* Productos vendidos por categoría */}
<h2 className="text-2xl font-bold mt-6 text-black">📦 Productos por Categoría</h2>

<div className="overflow-x-auto mt-4">
  <table className="min-w-full bg-orange-500 rounded-lg">
    <thead>
      <tr className="border-b border-gray-600">
        <th className="p-3 text-left text-white">Categoría</th>
        <th className="p-3 text-left text-white">Cantidad Vendida</th>
      </tr>
    </thead>
    <tbody>
      {productosPorCategoria.map((item, index) => (
        <tr key={index} className="border-b border-orange-700">
          <td className="p-3 text-black">{item.categoria}</td>
          <td className="p-3 text-black">{item.cantidad_vendida}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Últimas transacciones */}
      <h2 className="text-2xl font-bold mt-6 text-black"> Últimas Transacciones</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-pink-500 rounded-lg">
          <thead>
            <tr className="border-b border-pink-500">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Monto</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map(trans => (
              <tr key={trans.id} className="border-b border-pink-500">
                <td className="p-3">{trans.id}</td>
                <td className="p-3">${trans.amount.toFixed(2)}</td>
                <td className={`p-3 ${trans.status === "completed" ? "text-green-400" : "text-red-400"}`}>
                  {trans.status}
                </td>
                <td className="p-3">{new Date(trans.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle de ventas */}
      <h2 className="text-2xl font-bold mt-6 text-black"> Detalle de Ventas</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-orange-500 rounded-lg">
          <thead>
            <tr className="border-b border-pink-600">
              <th className="p-3 text-left">Venta ID</th>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Cantidad</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {detalleVentas.map((detalle, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3">{detalle.venta_id}</td>
                <td className="p-3">{detalle.producto}</td>
                <td className="p-3">${detalle.precio.toFixed(2)}</td>
                <td className="p-3">{detalle.cantidad}</td>
                <td className="p-3">${detalle.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
