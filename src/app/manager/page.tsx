
"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import React from "react";

import Stock from "../../shared/components/stock/Stock"

import FormMagazine from "../../shared/components/formMagazine/FormMagazine";

import Finanzas from "../../shared/components/finanzas/Finanzas";

import SeguridadConfiguracion from "../../shared/components/seguridadConfiguracion/SeguridadConfiguracion";



export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  
  const salesData = [
    { name: "Ene", ventas: 4000 },
    { name: "Feb", ventas: 3000 },
    { name: "Mar", ventas: 5000 },
    { name: "Abr", ventas: 2000 },
    { name: "May", ventas: 6000 },
  ];

  const userData = [
    { name: "Ene", usuarios: 100 },
    { name: "Feb", usuarios: 150 },
    { name: "Mar", usuarios: 300 },
    { name: "Abr", usuarios: 250 },
    { name: "May", usuarios: 400 },
  ];

  return (
    <div className={`flex h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <nav className={`w-64 p-4 space-y-3 ${darkMode ? "bg-gray-900" : "bg-black"} text-white`}>

        <img src="/Logoink3d.png" alt="Logo" className="w-32 mx-auto  mt-10 mb-4" />
        <h2 className= "text-white"> General </h2>
        
        {[
          { name: "📊 Panel de Control", id: "overview" },
          { name: "🛍️ Gestión de Productos", id: "products" },
          { name: "📦 Gestión de Pedidos", id: "orders" },
          { name: "👥 Gestión de Usuarios", id: "users" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`w-full text-left px-3 py-2 rounded-lg ${
              activeTab === tab.id ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </button>
        ))}
         <h2 className="text-white mt-4">Mi Negocio</h2>
      {[
        { name: "💲 finanzas", id: "finance" },
        { name: " 🏷️ stock", id: "invent" },
        { name: "💬 Magazine", id: "forum" },
        { name: "🔐 Seguridad y Configuración", id: "settings" },
      ].map((tab) => (
        <button
          key={tab.id}
          className={`w-full text-left px-3 py-2 rounded-lg ${
            activeTab === tab.id ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.name}
        </button>
      ))}
    </nav>
  

      <div className="flex-1 p-6"
      
      >
      <h2 className= "general text-white"> </h2>
        {activeTab === "overview" && (
          <div>

            <h2 className="text-3xl font-bold mb-4">📊 Panel de Control</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3>💰 Ventas Totales</h3>
                <p>$1,234,567</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3>📦 Pedidos Pendientes</h3>
                <p>45</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3>🔄 Devoluciones</h3>
                <p>12</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="ventas" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">📦 Gestión de Pedidos</h2>
            <form className="space-y-4 bg-gray-200 p-6 rounded-lg">
              <input type="text" placeholder="Nombre del Cliente" className="w-full p-2 border" />
              <input type="text" placeholder="Dirección" className="w-full p-2 border" />
              <input type="text" placeholder="Ciudad" className="w-full p-2 border" />
              <input type="text" placeholder="Medio de Pago" className="w-full p-2 border" />
              <input type="number" placeholder="Cantidad de Producto" className="w-full p-2 border" />
              <button className="bg-black text-white px-4 py-2 rounded">Registrar Pedido</button>
            </form>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">👥 Gestión de Usuarios</h2>
            <table className="w-full bg-gray-200 p-6 rounded-lg">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan Pérez</td>
                  <td>juan@example.com</td>
                  <td>
                    <select className="p-1 border">
                      <option>User</option>
                      <option>Admin</option>
                    </select>
                  </td>
                  <td>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
         
        {activeTab === "invent" && (<Stock/>
        )}

          
         
        {activeTab === "finance" && (<Finanzas/>
         
        )}

        {activeTab === "products" && (
          <div >
            <h1 className="text-white"> Mi negocio</h1>
            <h2 className="text-3xl font-bold mb-4">🛍️ Gestión de Productos</h2>
            <form className="space-y-4 bg-gray-200 p-6 rounded-lg">
              <input type="text" placeholder="Nombre del Producto" className="w-full p-2 border" />
              <input type="number" placeholder="Stock" className="w-full p-2 border" />
              <select className="w-full p-2 border">
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <select className="w-full p-2 border">
                <option>Blanco</option>
                <option>Negro</option>
                <option>Azul</option>
                <option>Turquesa</option>
                <option>Rojo</option>
              </select>
              <textarea placeholder="Descripción" className="w-full p-2 border"></textarea>
              <input type="file" className="w-full p-2 border" />
              <button className="bg-black text-white px-4 py-2 rounded">Subir Producto</button>
            </form>
          </div>
        )}
 
 

 {activeTab === "forum" && (
 
            <FormMagazine />
 )}
          

        {activeTab === "settings" && ( <SeguridadConfiguracion/> )}
      </div>
    </div>
  );
}
