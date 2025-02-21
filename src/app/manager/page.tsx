"use client"
import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Barra lateral */}
      <nav className={`w-64 p-4 space-y-3 ${darkMode ? "bg-gray-900" : "bg-black"} text-white`}>
        <img src="/Logoink3d.png" alt="Logo" className="w-32 mx-auto mb-4" />
        {[
          { name: "📊 Panel de Control", id: "overview" },
          { name: "🛍️ Gestión de Productos", id: "products" },
          { name: "📦 Gestión de Pedidos", id: "orders" },
          { name: "👥 Gestión de Usuarios", id: "users" },
          { name: "📊 Análisis y Reportes", id: "analytics" },
          { name: "🎟️ Descuentos y Cupones", id: "discounts" },
          { name: "📦 Control de Inventario", id: "inventory" },
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

      {/* Contenido Principal */}
      <div className="flex-1 p-6">
        {/* Panel de Control */}
        {activeTab === "overview" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">📊 Panel de Control</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3 className="text-xl font-bold">💰 Ventas Totales</h3>
                <p className="text-2xl">$1,234,567</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3 className="text-xl font-bold">📦 Pedidos Pendientes</h3>
                <p className="text-2xl">45</p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3 className="text-xl font-bold">📊 Usuarios Registrados</h3>
                <p className="text-2xl">1,200</p>
              </div>
            </div>
          </div>
        )}

        {/* Gestión de Productos */}
        {activeTab === "products" && (
          <div>
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
                <option>Rojo</option>
                <option>Turquesa</option>
              </select>
              <textarea placeholder="Descripción" className="w-full p-2 border"></textarea>
              <button className="bg-black text-white px-4 py-2 rounded">Subir Producto</button>
            </form>
          </div>
        )}

        {/* Gestión de Pedidos */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">📦 Gestión de Pedidos</h2>
            <p>📍 Dirección de Envío</p>
            <p>🚚 Transportadora</p>
            <p>⏳ Tiempo estimado de entrega</p>
            <p>💰 Recargo por domicilio</p>
          </div>
        )}

        {/* Gestión de Usuarios */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">👥 Gestión de Usuarios</h2>
            <p>✉️ Correo del Usuario</p>
            <p>🔑 Rol del Usuario</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Eliminar Usuario</button>
          </div>
        )}

        {/* Análisis y Reportes */}
        {activeTab === "analytics" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">📊 Análisis y Reportes</h2>
            <p>📈 Reporte de Ventas</p>
            <p>🔄 Reporte de Devoluciones</p>
          </div>
        )}

        {/* Descuentos y Cupones */}
        {activeTab === "discounts" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">🎟️ Descuentos y Cupones</h2>
            <p>⚡ Aplicar descuentos a productos</p>
          </div>
        )}

        {/* Control de Inventario */}
        {activeTab === "inventory" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">📦 Control de Inventario</h2>
            <p>🔍 Buscar por referencia</p>
            <p>🎨 Filtrar por color</p>
            <p>📏 Filtrar por talla</p>
          </div>
        )}

        {/* Seguridad y Configuración */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">🔐 Seguridad y Configuración</h2>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span>🌙 Modo Oscuro</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
