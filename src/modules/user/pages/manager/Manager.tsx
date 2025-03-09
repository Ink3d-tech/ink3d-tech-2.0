// "use client";

// import { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   Users,
//   Boxes,
//   Newspaper,
//   BarChart3,
//   ShieldCheck,
//   List, 
//   X, 
// } from "lucide-react";

// import Finanzas from "@/shared/components/finanzas/Finanzas";
// import FormMagazine from "@/shared/components/formMagazine/FormMagazine";
// import SeguridadConfiguracion from "@/shared/components/seguridadConfiguracion/SeguridadConfiguracion";
// import Stock from "./pages/stock/Stock";
// import { ManagmentProductForm } from "./pages/management/Managment";
// import ProtectedRouteAdmin from "@/shared/helpers/ProtectedRouteAdmin";
// import Image from "next/image";
// import UserManagement from "./general/GestionUsuarios/UserManagement";
// import OrderList from "./general/GestionPedidos/OrderList";

// export default function Manager() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const salesData = [
//     { name: "Ene", ventas: 4000 },
//     { name: "Feb", ventas: 3000 },
//     { name: "Mar", ventas: 5000 },
//     { name: "Abr", ventas: 2000 },
//     { name: "May", ventas: 6000 },
//   ];

//   return (
//     <ProtectedRouteAdmin>
// <div className="flex bg-white text-black min-h-screen overflow-hidden">
//         <button 
//           className="md:hidden fixed top-25 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={24} /> : <List size={24} />}
//         </button>
//         <nav className={`fixed md:relative bg-black p-6 border-r border-gray-800 transition-transform
//   ${menuOpen ? "translate-x-0 w-3/4 sm:w-1/2 md:w-80" : "-translate-x-full"} 
//   md:translate-x-0 md:w-80 md:block h-screen overflow-y-auto`}
// >
//           <h2 className="text-gray-400 text-sm uppercase mb-2">General</h2>
//           {[
//             { icon: <LayoutDashboard />, name: "Panel de Control", id: "overview" },
//             { icon: <Package />, name: "Gestión de Productos", id: "products" },
//             { icon: <ShoppingCart />, name: "Gestión de Pedidos", id: "orders" },
//             { icon: <Users />, name: "Gestión de Usuarios", id: "users" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               className={`flex items-center px-4 py-3 rounded-lg w-full transition-all 
//               ${activeTab === tab.id 
//                 ? "bg-black text-white border-l-4 border-gray-400" 
//                 : "bg-black text-gray-300 hover:bg-gray-800"}`}
//               onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
//             >
//               <span className="mr-3">{tab.icon}</span> {tab.name}
//             </button>
//           ))}
          
//           {/* Sección Mi Negocio */}
//           <h2 className="text-gray-400 text-sm uppercase mt-6 mb-2">Mi Negocio</h2>
//           {[
//             { icon: <BarChart3 />, name: "Finanzas", id: "finance" },
//             { icon: <Boxes />, name: "Stock", id: "invent" },
//             { icon: <Newspaper />, name: "Magazine", id: "forum" },
//             { icon: <ShieldCheck />, name: "Seguridad", id: "settings" },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               className={`flex items-center px-4 py-3 rounded-lg w-full transition-all 
//               ${activeTab === tab.id 
//                 ? "bg-black text-white border-l-4 border-gray-400" 
//                 : "bg-black text-gray-300 hover:bg-gray-800"}`}
//               onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
//             >
//               <span className="mr-3">{tab.icon}</span> {tab.name}
//             </button>
//           ))}
//         </nav>

//         {/* Contenido Principal */}
//         <div className="flex-1 p-6 overflow-auto">
//           {activeTab === "overview" && (
//             <div>
//               <h2 className="text-3xl font-bold mb-4">📊 Panel de Control</h2>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="bg-gray-200 p-4 rounded-lg">
//                   <h3>💰 Ventas Totales</h3>
//                   <p>$1,234,567</p>
//                 </div>
//                 <div className="bg-gray-200 p-4 rounded-lg">
//                   <h3>📦 Pedidos Pendientes</h3>
//                   <p>45</p>
//                 </div>
//                 <div className="bg-gray-200 p-4 rounded-lg">
//                   <h3>🔄 Devoluciones</h3>
//                   <p>12</p>
//                 </div>
//               </div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={salesData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <Line type="monotone" dataKey="ventas" stroke="#8884d8" strokeWidth={2} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           )}

//           {activeTab === "orders" && <OrderList />}
//           {activeTab === "users" && <UserManagement />}
//           {activeTab === "invent" && <Stock />}
//           {activeTab === "finance" && <Finanzas />}
//           {activeTab === "products" && <ManagmentProductForm />}
//           {activeTab === "forum" && <FormMagazine />}
//           {activeTab === "settings" && <SeguridadConfiguracion />}
//         </div>
//       </div>
//     </ProtectedRouteAdmin>
//   );
// }


"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import ProtectedRouteAdmin from "@/shared/helpers/ProtectedRouteAdmin";

export default function Manager() {
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ProtectedRouteAdmin>
      <div className="flex bg-white text-black min-h-screen overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MainContent activeTab={activeTab} />
      </div>
    </ProtectedRouteAdmin>
  );
}
















/////// descuentos


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";
// import { format } from "date-fns";
// import { BadgeCheck, XCircle, Calendar, Ticket, Hash } from "lucide-react";

// function DiscountsApp() {
//   const [discounts, setDiscounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchDiscounts = async () => {
//     try {
//       console.log("🔍 Fetching discounts...");
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("❌ No token found!");
//         setError("No hay token de autenticación.");
//         return;
//       }

//       const response = await axios.get(`${API_BACK}/discounts`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("✅ Data received:", response.data);
//       setDiscounts(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching discounts:", error);
//       setError("Error al cargar los descuentos.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDiscounts();
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Cargando descuentos...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
//         <h1 className="text-2xl font-bold text-gray-800 flex items-center">
//           <Ticket className="h-6 w-6 mr-2 text-indigo-600" /> Lista de Descuentos
//         </h1>
//       </header>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {discounts.length === 0 ? (
//           <p className="text-center col-span-3 text-gray-500">No hay descuentos disponibles.</p>
//         ) : (
//           discounts.map((discount) => (
//             <div key={discount.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-600">
//               <div className="flex justify-between items-center">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     discount.isUsed ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
//                   }`}
//                 >
//                   {discount.isUsed ? "Usado" : "Disponible"}
//                 </span>
//               </div>

//               {/* ID del Descuento */}
//               <div className="flex items-center text-gray-500 text-sm mt-2">
//                 <Hash className="h-4 w-4 mr-1 text-indigo-500" />
//                 <span className="font-mono">{discount.id}</span>
//               </div>

//               {/* Porcentaje de Descuento */}
//               <h2 className="text-xl font-semibold text-gray-800 mt-2">{discount.amount}% de descuento</h2>

//               {/* Fecha de Creación */}
//               <div className="flex items-center text-gray-500 text-sm mt-1">
//                 <Calendar className="h-4 w-4 mr-1" />
//                 Creado: {format(new Date(discount.createdAt), "dd/MM/yyyy")}
//               </div>

//               {/* Fecha de Expiración */}
//               {discount.expiresAt ? (
//                 <div className="flex items-center text-gray-500 text-sm mt-1">
//                   <XCircle className="h-4 w-4 mr-1 text-red-500" />
//                   Expira: {format(new Date(discount.expiresAt), "dd/MM/yyyy")}
//                 </div>
//               ) : (
//                 <div className="flex items-center text-gray-500 text-sm mt-1">
//                   <BadgeCheck className="h-4 w-4 mr-1 text-green-500" />
//                   No expira
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default DiscountsApp;
