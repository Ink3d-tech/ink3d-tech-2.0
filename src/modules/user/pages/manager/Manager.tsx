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
