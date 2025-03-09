// components/DashboardPanel.tsx
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const salesData = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 5000 },
  { name: "Abr", ventas: 2000 },
  { name: "May", ventas: 6000 },
];

export default function DashboardPanel() {
  return (
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
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// type Discount = {
//   id: string;
//   amount: number;
//   status: string;
//   expiresAt: string;
//   userId: string;
// };

// const DashboardPanel = () => {
//   const [discounts, setDiscounts] = useState<Discount[]>([]);
//   const [newDiscount, setNewDiscount] = useState<Partial<Discount>>({
//     amount: 0,
//     status: "active",
//     expiresAt: "",
//     userId: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDiscounts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get<Discount[]>(`${API_BACK}/discounts`);
//       setDiscounts(response.data);
//     } catch (error) {
//       console.error("❌ Error al obtener descuentos:", error);
//       setError("Hubo un error al cargar los descuentos.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createDiscount = async () => {
//     try {
//       await axios.post(`${API_BACK}/discounts`, newDiscount);
//       fetchDiscounts();
//     } catch (error) {
//       console.error("❌ Error al crear descuento:", error);
//       setError("Hubo un error al crear el descuento.");
//     }
//   };

//   useEffect(() => {
//     fetchDiscounts();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Gestión de Descuentos</h1>
//       {loading && <p>Cargando descuentos...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         {discounts.map((discount) => (
//           <div key={discount.id} className="border rounded-lg p-4 shadow-md">
//             <p>Monto: {discount.amount}</p>
//             <p>Estado: {discount.status}</p>
//             <p>
//               Expira:{" "}
//               {discount.expiresAt
//                 ? new Date(discount.expiresAt).toLocaleDateString()
//                 : "No disponible"}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6 p-4 border rounded-lg">
//         <h2 className="text-lg font-semibold">Crear Nuevo Descuento</h2>
//         <input
//           className="border p-2 rounded-md w-full"
//           placeholder="Monto"
//           value={newDiscount.amount}
//           onChange={(e) => setNewDiscount({ ...newDiscount, amount: Number(e.target.value) })}
//         />
//         <input
//           className="border p-2 rounded-md w-full mt-2"
//           placeholder="Fecha de expiración"
//           type="datetime-local"
//           value={newDiscount.expiresAt}
//           onChange={(e) => setNewDiscount({ ...newDiscount, expiresAt: e.target.value })}
//         />
//         <input
//           className="border p-2 rounded-md w-full mt-2"
//           placeholder="ID de usuario"
//           value={newDiscount.userId}
//           onChange={(e) => setNewDiscount({ ...newDiscount, userId: e.target.value })}
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={createDiscount}>
//           Crear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DashboardPanel;


// "use client";

// import React, { useState } from "react";
// import { QRCodeSVG } from "qrcode.react";
// import { format } from "date-fns";
// import { Ticket, Plus, X, QrCode, Check, Calendar } from "lucide-react";

// interface Discount {
//   id: string;
//   code: string;
//   amount: number;
//   status: "active" | "used" | "expired";
//   expiresAt: string;
//   createdAt: string;
// }

// function DiscountsApp() {
//   const [discounts, setDiscounts] = useState<Discount[]>([]);
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [amount, setAmount] = useState<string>("");
//   const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

//   const createDiscount = () => {
//     if (!amount || isNaN(parseFloat(amount))) return;

//     const newDiscount: Discount = {
//       id: Math.random().toString(36).substr(2, 9),
//       code: Math.random().toString(36).substr(2, 8).toUpperCase(),
//       amount: parseFloat(amount),
//       status: "active",
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
//       createdAt: new Date().toISOString(),
//     };

//     setDiscounts([...discounts, newDiscount]);
//     setShowForm(false);
//     setAmount("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
//         <h1 className="text-2xl font-bold text-gray-800 flex items-center">
//           <Ticket className="h-6 w-6 mr-2 text-indigo-600" /> Sistema de Descuentos
//         </h1>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center hover:bg-indigo-700 transition"
//         >
//           <Plus className="h-5 w-5 mr-2" /> Nuevo Descuento
//         </button>
//       </header>

//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Crear Nuevo Descuento</h2>
//               <button onClick={() => setShowForm(false)} className="text-gray-600 hover:text-gray-800">
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <input
//               type="number"
//               placeholder="Monto del descuento"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
//             />
//             <button
//               onClick={createDiscount}
//               className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md shadow-md flex items-center justify-center hover:bg-indigo-700 transition"
//             >
//               <Check className="h-5 w-5 mr-2" /> Crear Descuento
//             </button>
//           </div>
//         </div>
//       )}

//       {selectedDiscount && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Código QR del Descuento</h2>
//             <QRCodeSVG value={selectedDiscount.code} size={200} />
//             <p className="mt-4 text-gray-700 font-semibold">Código: {selectedDiscount.code}</p>
//             <p className="text-gray-500">Monto: ${selectedDiscount.amount}</p>
//             <button
//               onClick={() => setSelectedDiscount(null)}
//               className="mt-4 bg-red-500 text-white py-2 rounded-md shadow-md w-full hover:bg-red-600 transition"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {discounts.map((discount) => (
//           <div key={discount.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//             <div>
//               <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs font-semibold">
//                 {discount.status}
//               </span>
//               <p className="text-lg font-semibold mt-2">${discount.amount}</p>
//               <p className="text-gray-500 text-sm">Expira: {format(new Date(discount.expiresAt), "dd/MM/yyyy")}</p>
//             </div>
//             <button
//               onClick={() => setSelectedDiscount(discount)}
//               className="p-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
//             >
//               <QrCode className="h-5 w-5" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DiscountsApp;
















///////estoy pribando esto //////


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
