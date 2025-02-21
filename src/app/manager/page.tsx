"use client"
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);
  const salesData = [
    { month: "Enero", ventas: 4000, devoluciones: 200 },
    { month: "Febrero", ventas: 3000, devoluciones: 150 },
    { month: "Marzo", ventas: 5000, devoluciones: 300 },
    { month: "Abril", ventas: 7000, devoluciones: 250 },]

  return (
    <div className={`flex h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Barra lateral */}
      <nav className={`w-64 p-4 space-y-3 ${darkMode ? "bg-black" : "bg-black"} text-white`}>
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

{activeTab === "orders" && (
  <div>
    <h2 className="text-3xl font-bold mb-4">📦 Gestión de Pedidos</h2>
    <form className="space-y-4">
      <div>
        <label className="block text-lg font-semibold">📍 Dirección de Envío</label>
        <input
          type="text"
          placeholder="Ingresa la dirección"
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold">🚚 Transportadora</label>
        <select className="w-full p-2 border rounded-lg">
          <option value="">Selecciona una opción</option>
          <option value="DHL">DHL</option>
          <option value="FedEx">FedEx</option>
          <option value="UPS">UPS</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-semibold">⏳ Tiempo estimado de entrega</label>
        <input
          type="text"
          placeholder="Ej: 3-5 días hábiles"
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold">💰 Recargo por domicilio</label>
        <input
          type="number"
          placeholder="Ej: 5000"
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Guardar Pedido
      </button>
    </form>
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

{activeTab === "analytics" && (
  <div>
    <h2 className="text-3xl font-bold mb-4">📊 Análisis y Reportes</h2>

    {/* Gráfico de Ventas */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">📈 Reporte de Ventas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="ventas" stroke="#4CAF50" strokeWidth={3} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Gráfico de Devoluciones */}
    <div>
      <h3 className="text-xl font-semibold mb-2">🔄 Reporte de Devoluciones</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="devoluciones" fill="#F44336" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)}

        {/* Descuentos y Cupones */}
        {activeTab === "discounts" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">🎟️ Descuentos y Cupones</h2>
            <p>⚡ Aplicar descuentos a productos</p>
          </div>
        )}

{activeTab === "inventory" && (
  <div>
    <h2 className="text-3xl font-bold mb-4">📦 Control de Inventario</h2>

    {/* Buscar por referencia */}
    <div className="mb-4">
      <label className="block text-lg font-semibold">🔍 Buscar por referencia</label>
      <input
        type="text"
        placeholder="Ingresa la referencia"
        className="w-full p-2 border rounded-lg"
      />
    </div>

    {/* Filtrar por color */}
    <div className="mb-4">
      <label className="block text-lg font-semibold">🎨 Filtrar por color</label>
      <select className="w-full p-2 border rounded-lg">
        <option value="">Selecciona un color</option>
        <option value="rojo">Rojo</option>
        <option value="azul">Azul</option>
        <option value="verde">Verde</option>
        <option value="negro">Negro</option>
        <option value="blanco">Blanco</option>
      </select>
    </div>

    {/* Filtrar por talla */}
    <div className="mb-4">
      <label className="block text-lg font-semibold">📏 Filtrar por talla</label>
      <select className="w-full p-2 border rounded-lg">
        <option value="">Selecciona una talla</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </div>

    {/* Botón de búsqueda */}
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
    >
      Aplicar Filtros
    </button>
  </div>
)}


        {/* Seguridad y Configuración */}
        {activeTab === "settings" && (
  <div>
    <h2 className="text-3xl font-bold mb-4">🔐 Seguridad y Configuración</h2>

    {/* Modo Oscuro */}
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span>🌙 Modo Oscuro</span>
      </label>
    </div>

    {/* Cambio de Contraseña */}
    <div className="mb-4">
      <label className="block text-lg font-semibold">🔑 Cambiar Contraseña</label>
      <input
        type="password"
        placeholder="Nueva Contraseña"
        className="w-full p-2 border rounded-lg mb-2"
      />
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        className="w-full p-2 border rounded-lg"
      />
      <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-lg hover:bg-blue-600 transition">
        Guardar Cambios
      </button>
    </div>

    {/* Cambio de Correo Electrónico */}
    <div className="mb-4">
      <label className="block text-lg font-semibold">📧 Actualizar Correo</label>
      <input
        type="email"
        placeholder="Nuevo Correo Electrónico"
        className="w-full p-2 border rounded-lg mb-2"
      />
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
        Actualizar Correo
      </button>
    </div>

    {/* Autenticación en Dos Pasos */}
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <input type="checkbox" />
        <span>🛡️ Activar Autenticación en Dos Pasos</span>
      </label>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

