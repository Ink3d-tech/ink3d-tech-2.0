"use client";

import { useState } from "react";
<<<<<<< HEAD
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Boxes,
  Newspaper,
  BarChart3,
  ShieldCheck,
  List, 
  X, 
} from "lucide-react";


import FormMagazine from "@/shared/components/formMagazine/FormMagazine";
import SeguridadConfiguracion from "@/shared/components/seguridadConfiguracion/SeguridadConfiguracion";
import Stock from "./pages/stock/Stock";
import { ManagmentProductForm } from "./pages/management/Managment";
=======
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
>>>>>>> 4d8fd1cbf796bb3fe2a95c5c3ef9f95e617990c7
import ProtectedRouteAdmin from "@/shared/helpers/ProtectedRouteAdmin";

export default function Manager() {
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ProtectedRouteAdmin>
<<<<<<< HEAD
<div className="flex bg-white text-black min-h-screen overflow-hidden">
        <button 
          className="md:hidden fixed top-25 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>
        <nav className={`fixed md:relative bg-black p-6 border-r border-gray-800 transition-transform
  ${menuOpen ? "translate-x-0 w-3/4 sm:w-1/2 md:w-80" : "-translate-x-full"} 
  md:translate-x-0 md:w-80 md:block h-screen overflow-y-auto`}
>
          <h2 className="text-gray-400 text-sm uppercase mb-2">General</h2>
          {[
            { icon: <LayoutDashboard />, name: "Panel de Control", id: "overview" },
            { icon: <Package />, name: "Gestión de Productos", id: "products" },
            { icon: <ShoppingCart />, name: "Gestión de Pedidos", id: "orders" },
            { icon: <Users />, name: "Gestión de Usuarios", id: "users" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-3 rounded-lg w-full transition-all 
              ${activeTab === tab.id 
                ? "bg-black text-white border-l-4 border-gray-400" 
                : "bg-black text-gray-300 hover:bg-gray-800"}`}
              onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
            >
              <span className="mr-3">{tab.icon}</span> {tab.name}
            </button>
          ))}
          
          {/* Sección Mi Negocio */}
          <h2 className="text-gray-400 text-sm uppercase mt-6 mb-2">Mi Negocio</h2>
          {[
            { icon: <BarChart3 />, name: "Finanzas", id: "finance" },
            { icon: <Boxes />, name: "Stock", id: "invent" },
            { icon: <Newspaper />, name: "Magazine", id: "forum" },
            { icon: <ShieldCheck />, name: "Seguridad", id: "settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-3 rounded-lg w-full transition-all 
              ${activeTab === tab.id 
                ? "bg-black text-white border-l-4 border-gray-400" 
                : "bg-black text-gray-300 hover:bg-gray-800"}`}
              onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
            >
              <span className="mr-3">{tab.icon}</span> {tab.name}
            </button>
          ))}
        </nav>

        {/* Contenido Principal */}
        <div className="flex-1 p-6 overflow-auto">
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

          {activeTab === "orders" && <OrderList />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "invent" && <Stock />}
          
          {activeTab === "products" && <ManagmentProductForm />}
          {activeTab === "forum" && <FormMagazine />}
          {activeTab === "settings" && <SeguridadConfiguracion />}
        </div>
=======
      <div className="flex bg-white text-black min-h-screen overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MainContent activeTab={activeTab} />
>>>>>>> 4d8fd1cbf796bb3fe2a95c5c3ef9f95e617990c7
      </div>
    </ProtectedRouteAdmin>
  );
}