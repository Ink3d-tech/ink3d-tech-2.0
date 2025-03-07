
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
// } from "lucide-react";

// import Finanzas from "@/shared/components/finanzas/Finanzas";
// import FormMagazine from "@/shared/components/formMagazine/FormMagazine";
// import SeguridadConfiguracion from "@/shared/components/seguridadConfiguracion/SeguridadConfiguracion";
// import Stock from "./pages/stock/Stock";
// import { ManagmentProductForm } from "./pages/management/Managment";
// import ProtectedRouteAdmin from "@/shared/helpers/ProtectedRouteAdmin";
// import Image from "next/image";
// import UserManagement  from "./general/GestionUsuarios/UserManagement";
// import OrderList from "./general/GestionPedidos/OrderList";


// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("overview");
//   // const [darkMode, setDarkMode] = useState(false);

//   const salesData = [
//     { name: "Ene", ventas: 4000 },
//     { name: "Feb", ventas: 3000 },
//     { name: "Mar", ventas: 5000 },
//     { name: "Abr", ventas: 2000 },
//     { name: "May", ventas: 6000 },
//   ];

//   // const userData = [
//   //   { name: "Ene", usuarios: 100 },
//   //   { name: "Feb", usuarios: 150 },
//   //   { name: "Mar", usuarios: 300 },
//   //   { name: "Abr", usuarios: 250 },
//   //   { name: "May", usuarios: 400 },
//   // ];

//   return (
//     <ProtectedRouteAdmin>
//       <div className={`flex bg-white text-black`}>
//         <nav className="w-80 bg-black p-6 border-r border-gray-800">
//           <Image src="/Logoink3d.png" alt="Logo" className="w-32 mx-auto mb-6" width={200} height={200} />
          
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
//                           onClick={() => setActiveTab(tab.id)}
//             >
//               <span className="mr-3">{tab.icon}</span> {tab.name}
//             </button>
//           ))}
          
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
//                           onClick={() => setActiveTab(tab.id)}
//             >
//               <span className="mr-3">{tab.icon}</span> {tab.name}
//             </button>
//           ))}
//         </nav>

//         <div className="flex-1 p-6"

//         >
//           <h2 className="general text-white"> </h2>
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

//           {activeTab === "orders" && (
//             <div>
           
//               <h2 className="text-3xl font-bold mb-4">📦 Gestión de Pedidos</h2>
//               {/* Usamos el componente OrderList aquí */}
//               <OrderList />
//             </div>
            
//           )}





// {activeTab === "users" && <UserManagement />}


//           {activeTab === "invent" && (<Stock />
//           )}



//           {activeTab === "finance" && (<Finanzas />

//           )}

//           {activeTab === "products" && (
//             <div >
//               <h1 className="text-white"> Mi negocio</h1>
//               <h2 className="text-3xl font-bold mb-4">🛍️ Gestión de Productos</h2>
//               <ManagmentProductForm />
//             </div>
//           )}



//           {activeTab === "forum" && (<FormMagazine />)}


//           {activeTab === "settings" && (<SeguridadConfiguracion />)}
//         </div>
//       </div>
//     </ProtectedRouteAdmin>
//   );
// }








"use client";

import { useState } from "react";
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
  List, // Nuevo icono en lugar de Menu
  X, // Para cerrar el menú
} from "lucide-react";

import Finanzas from "@/shared/components/finanzas/Finanzas";
import FormMagazine from "@/shared/components/formMagazine/FormMagazine";
import SeguridadConfiguracion from "@/shared/components/seguridadConfiguracion/SeguridadConfiguracion";
import Stock from "./pages/stock/Stock";
import { ManagmentProductForm } from "./pages/management/Managment";
import ProtectedRouteAdmin from "@/shared/helpers/ProtectedRouteAdmin";
import Image from "next/image";
import UserManagement from "./general/GestionUsuarios/UserManagement";
import OrderList from "./general/GestionPedidos/OrderList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const salesData = [
    { name: "Ene", ventas: 4000 },
    { name: "Feb", ventas: 3000 },
    { name: "Mar", ventas: 5000 },
    { name: "Abr", ventas: 2000 },
    { name: "May", ventas: 6000 },
  ];

  return (
    <ProtectedRouteAdmin>
<div className="flex bg-white text-black min-h-screen overflow-hidden">
        
        {/* Botón del menú hamburguesa (ajustado para que no esté arriba del todo) */}
        <button 
          className="md:hidden fixed top-25 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg transition-transform active:scale-95"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>

        {/* Menú lateral */}
        <nav className={`fixed md:relative bg-black p-6 border-r border-gray-800 transition-transform
  ${menuOpen ? "translate-x-0 w-3/4 sm:w-1/2 md:w-80" : "-translate-x-full"} 
  md:translate-x-0 md:w-80 md:block h-screen overflow-y-auto`}
>

          <Image src="/Logoink3d.png" alt="Logo" className="w-32 mx-auto mb-6" width={200} height={200} />
          
          {/* Sección General */}
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
          {activeTab === "finance" && <Finanzas />}
          {activeTab === "products" && <ManagmentProductForm />}
          {activeTab === "forum" && <FormMagazine />}
          {activeTab === "settings" && <SeguridadConfiguracion />}
        </div>
      </div>
    </ProtectedRouteAdmin>
  );
}
