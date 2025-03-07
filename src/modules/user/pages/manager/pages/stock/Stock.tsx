// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { API_BACK } from "@/shared/config/api/getEnv";
// import { Package, Layers, CalendarDays, Info, Search } from "lucide-react";

// interface StockMovement {
//   id: string;
//   quantity: number;
//   type: string;
//   reason: string;
//   createdAt: string;
//   product: {
//     id: string;
//     name: string;
//     description: string;
//     price: string;
//     stock: number;
//     image: string[];
//     size: string;
//   };
// }

// export default function StockMovements() {
//   const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
//   const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);



//   useEffect(() => {
//     const token = localStorage.getItem("token");
  
//     if (!token) {
//       setError("❌ No se ha encontrado el token de autenticación.");
//       setLoading(false);
//       return;
//     }
  
//     const fetchStockMovements = async () => {
//       try {
//         const response = await axios.get<StockMovement[]>(`${API_BACK}/stock-movements`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
  
//         const movements = response.data;
//         setStockMovements(movements);
  
//         if (movements.length > 0) {
//           setSelectedMovement(movements[movements.length - 1]);
//         }
//       } catch (error) {
//         console.error("❌ Error al obtener movimientos de stock:", error);
//         setError("Hubo un error al cargar los movimientos de stock.");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchStockMovements();
//   }, []);

//   const filteredMovements = stockMovements.filter((movement) =>
//     movement.product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) return <p className="text-gray-600 text-center">⏳ Cargando stock...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;

//   return (
//     <div className="min-h-screen bg-white p-6">
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📦 Movimientos de Stock</h2>

//       {/* Barra de búsqueda */}
//       <div className="mb-4 flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
//         <Search className="text-gray-500 w-5 h-5 mr-2" />
//         <input
//           type="text"
//           placeholder="Buscar producto..."
//           className="w-full bg-transparent outline-none"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         {/* Tabla de Movimientos */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300 text-gray-800">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="border p-2 text-left">Producto</th>
//                 <th className="border p-2 text-left">Stock Inicial</th>
//                 <th className="border p-2 text-left">Productos Vendidos</th>
//                 <th className="border p-2 text-left">Stock Actual</th>
//                 <th className="border p-2 text-left">Fecha</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMovements.map((movement) => {
//                 const stockInicial = movement.product.stock + movement.quantity;
//                 return (
//                   <tr
//                     key={movement.id}
//                     className="cursor-pointer hover:bg-gray-100"
//                     onClick={() => setSelectedMovement(movement)}
//                   >
//                     <td className="border p-2">{movement.product.name}</td>
//                     <td className="border p-2">{stockInicial}</td>
//                     <td className="border p-2">{movement.quantity}</td>
//                     <td className="border p-2">{movement.product.stock}</td>
//                     <td className="border p-2">{new Date(movement.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {selectedMovement && (
//           <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-80 mx-auto">
//             <h3 className="text-lg font-semibold text-gray-800 text-center">{selectedMovement.product.name}</h3>
            
//             <div className="relative w-full h-80 rounded-md overflow-hidden my-3">
//               <Image
//                 src={selectedMovement.product.image[0]}
//                 alt={selectedMovement.product.name}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-md"
//               />
//             </div>

//             <p className="text-gray-500 text-sm text-center">{selectedMovement.product.description}</p>
//             <p className="text-teal-600 text-lg font-bold text-center mt-1">${selectedMovement.product.price}</p>

//             <div className="mt-4 space-y-2">
//               <div className="flex items-center text-gray-600 text-sm">
//                 <Layers className="w-4 h-4 text-teal-500 mr-2" />
//                 <span>Stock Inicial: <strong>{selectedMovement.product.stock + selectedMovement.quantity}</strong></span>
//               </div>
//               <div className="flex items-center text-gray-600 text-sm">
//                 <Package className="w-4 h-4 text-blue-500 mr-2" />
//                 <span>Productos Vendidos: <strong>{selectedMovement.quantity}</strong></span>
//               </div>
//               <div className="flex items-center text-gray-600 text-sm">
//                 <Layers className="w-4 h-4 text-teal-500 mr-2" />
//                 <span>Stock Actual: <strong>{selectedMovement.product.stock}</strong></span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { API_BACK } from "@/shared/config/api/getEnv";
import { Package, Layers, CalendarDays, Info, Search, AlertTriangle } from "lucide-react";

interface StockMovement {
  id: string;
  quantity: number;
  type: string;
  reason: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
    image: string[];
    size: string;
  };
}

export default function StockMovements() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("❌ No se ha encontrado el token de autenticación.");
      setLoading(false);
      return;
    }

    const fetchStockMovements = async () => {
      try {
        const response = await axios.get<StockMovement[]>(`${API_BACK}/stock-movements`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const movements = response.data;
        setStockMovements(movements);

        if (movements.length > 0) {
          setSelectedMovement(movements[movements.length - 1]);
        }
      } catch (error) {
        console.error("❌ Error al obtener movimientos de stock:", error);
        setError("Hubo un error al cargar los movimientos de stock.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockMovements();
  }, []);

  const filteredMovements = stockMovements.filter((movement) =>
    movement.product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-gray-600 text-center">⏳ Cargando stock...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">📦 Movimientos de Stock</h2>

      {/* Barra de búsqueda */}
      <div className="mb-4 flex items-center bg-gray-100 p-2 rounded-md shadow-sm">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full bg-transparent outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tabla de Movimientos */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-left">Producto</th>
                <th className="border p-2 text-left">Stock Inicial</th>
                <th className="border p-2 text-left">Productos Vendidos</th>
                <th className="border p-2 text-left">Stock Actual</th>
                <th className="border p-2 text-left">Estado</th>
                <th className="border p-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map((movement) => {
                const stockInicial = movement.product.stock + movement.quantity;
                const stockActual = movement.product.stock;
                
                let stockEstado;
                if (stockActual === 0) {
                  stockEstado = <span className="text-red-600 font-bold">🔥 Agotado</span>;
                } else if (stockActual < 5) {
                  stockEstado = <span className="text-red-500 font-bold">⚠️ Reabastecer</span>;
                } else {
                  stockEstado = <span className="text-green-600 font-semibold">✅ Disponible</span>;
                }

                return (
                  <tr
                    key={movement.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedMovement(movement)}
                  >
                    <td className="border p-2">{movement.product.name}</td>
                    <td className="border p-2">{stockInicial}</td>
                    <td className="border p-2">{movement.quantity}</td>
                    <td className="border p-2">{stockActual}</td>
                    <td className="border p-2">{stockEstado}</td>
                    <td className="border p-2">{new Date(movement.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selectedMovement && (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-80 mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 text-center">{selectedMovement.product.name}</h3>

            <div className="relative w-full h-80 rounded-md overflow-hidden my-3">
              <Image
                src={selectedMovement.product.image[0]}
                alt={selectedMovement.product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>

            <p className="text-gray-500 text-sm text-center">{selectedMovement.product.description}</p>
            <p className="text-teal-600 text-lg font-bold text-center mt-1">${selectedMovement.product.price}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600 text-sm">
                <Layers className="w-4 h-4 text-teal-500 mr-2" />
                <span>Stock Inicial: <strong>{selectedMovement.product.stock + selectedMovement.quantity}</strong></span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Package className="w-4 h-4 text-blue-500 mr-2" />
                <span>Productos Vendidos: <strong>{selectedMovement.quantity}</strong></span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Layers className="w-4 h-4 text-teal-500 mr-2" />
                <span>Stock Actual: <strong>{selectedMovement.product.stock}</strong></span>
              </div>

              {/* Alerta de stock en la tarjeta */}
              {selectedMovement.product.stock < 5 && (
                <div className={`text-center p-2 rounded-md font-bold ${
                  selectedMovement.product.stock === 0 ? "bg-red-600 text-white" : "bg-yellow-500 text-black"
                }`}>
                  {selectedMovement.product.stock === 0 ? "🔥 Agotado" : "⚠️ Reabastecer"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
