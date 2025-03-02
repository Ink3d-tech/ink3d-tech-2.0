// "use client";
// import React from "react";
// import { useState, useEffect } from "react";

// interface Product {
//   id: number;
//   name: string;
//   category: "Remeras" | "Joggers" | "Buzos";
//   stock: number;
//   price: number;
// }

// // Mapear categorías a emojis
// const categoryEmojis: Record<string, string> = {
//   Remeras: "👕",
//   Joggers: "👖",
//   Buzos: "🧥",
// };

// export default function Stock() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categoryFilter, setCategoryFilter] = useState<"All" | "Remeras" | "Joggers" | "Buzos">("All");
//   const [loading, setLoading] = useState(true);

//   // Obtener productos desde el backend
//   useEffect(() => {
//     fetch("http://localhost:3000/products")
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(error => console.error("Error al obtener productos:", error));
//   }, []);

//   // Filtrar productos según categoría
//   const filteredProducts = categoryFilter === "All"
//     ? products
//     : products.filter(product => product.category === categoryFilter);

//   // Función para vender un producto y actualizar stock
//   const handleSell = async (id: number, quantity: number) => {
//     const response = await fetch("http://localhost:3000/sell", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id, quantity }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       // Actualizar estado con el nuevo stock
//       setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock - quantity } : p));
//       alert("✅ Compra realizada con éxito");
//     } else {
//       alert("❌ " + data.message);
//     }
//   };

//   if (loading) return <p className="text-white">Cargando stock...</p>;

//   return (
//     <div className="p-6 bg-black shadow-lg rounded-md">
//       <h2 className="text-3xl font-semibold text-red-500 mb-4">🔥 Stock de Productos 🔥</h2>

//       {/* Selector de categoría */}
//       <div className="mb-4">
//         <label className="text-lg font-medium text-white mr-2">📌 Filtrar por categoría:</label>
//         <select 
//           className="border border-red-500 p-2 rounded-md bg-black text-white"
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value as "All" | "Remeras" | "Joggers" | "Buzos")}
//         >
//           <option value="All">Todos</option>
//           <option value="Remeras">👕 Remeras</option>
//           <option value="Joggers">👖 Joggers</option>
//           <option value="Buzos">🧥 Buzos</option>
//         </select>
//       </div>

//       {/* Tabla de productos */}
//       <table className="w-full border-collapse border border-red-500">
//         <thead>
//           <tr className="bg-red-500 text-white">
//             <th className="border border-red-500 p-2">🆔 ID</th>
//             <th className="border border-red-500 p-2">📦 Nombre</th>
//             <th className="border border-red-500 p-2">📂 Categoría</th>
//             <th className="border border-red-500 p-2">📊 Stock</th>
//             <th className="border border-red-500 p-2">💰 Precio</th>
//             <th className="border border-red-500 p-2">⚡ Acción</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.map(product => (
//             <tr key={product.id} className="text-center text-white bg-black">
//               <td className="border border-red-500 p-2">{product.id}</td>
//               <td className="border border-red-500 p-2">{product.name}</td>
//               <td className="border border-red-500 p-2">{categoryEmojis[product.category]} {product.category}</td>
//               <td className="border border-red-500 p-2">{product.stock}</td>
//               <td className="border border-red-500 p-2">${product.price}</td>
//               <td className="border border-red-500 p-2">
//                 <button 
//                   className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
//                   disabled={product.stock === 0}
//                   onClick={() => handleSell(product.id, 1)}
//                 >
//                   🛒 Comprar 1
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  category: "Remeras" | "Joggers" | "Buzos";
  stock: number;
  price: number;
}

// Mapear categorías a emojis
const categoryEmojis: Record<string, string> = {
  Remeras: "👕",
  Joggers: "👖",
  Buzos: "🧥",
};

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Remeras" | "Joggers" | "Buzos">("All");
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Track if we are on the client side

  // Set isClient to true when the component is mounted (client-side only)
  useEffect(() => {
    setIsClient(true); // This ensures the fetch is only made on the client-side
  }, []);

  // Obtener productos desde el backend solo si estamos en el cliente
  useEffect(() => {
    if (isClient) {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error al obtener productos:", error));
    }
  }, [isClient]); // Depend on isClient to make sure it's only fetched on the client

  // Filtrar productos según categoría
  const filteredProducts = categoryFilter === "All"
    ? products
    : products.filter(product => product.category === categoryFilter);

  // Función para vender un producto y actualizar stock
  const handleSell = async (id: number, quantity: number) => {
    const response = await fetch("http://localhost:3000/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, quantity }),
    });

    const data = await response.json();

    if (response.ok) {
      // Actualizar estado con el nuevo stock
      setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock - quantity } : p));
      alert("✅ Compra realizada con éxito");
    } else {
      alert("❌ " + data.message);
    }
  };

  if (loading) return <p className="text-white">Cargando stock...</p>;

  return (
    <div className="p-6 bg-black shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-red-500 mb-4">🔥 Stock de Productos 🔥</h2>

      {/* Selector de categoría */}
      <div className="mb-4">
        <label className="text-lg font-medium text-white mr-2">📌 Filtrar por categoría:</label>
        <select 
          className="border border-red-500 p-2 rounded-md bg-black text-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as "All" | "Remeras" | "Joggers" | "Buzos")}
        >
          <option value="All">Todos</option>
          <option value="Remeras">👕 Remeras</option>
          <option value="Joggers">👖 Joggers</option>
          <option value="Buzos">🧥 Buzos</option>
        </select>
      </div>

      {/* Tabla de productos */}
      <table className="w-full border-collapse border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="border border-red-500 p-2">🆔 ID</th>
            <th className="border border-red-500 p-2">📦 Nombre</th>
            <th className="border border-red-500 p-2">📂 Categoría</th>
            <th className="border border-red-500 p-2">📊 Stock</th>
            <th className="border border-red-500 p-2">💰 Precio</th>
            <th className="border border-red-500 p-2">⚡ Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id} className="text-center text-white bg-black">
              <td className="border border-red-500 p-2">{product.id}</td>
              <td className="border border-red-500 p-2">{product.name}</td>
              <td className="border border-red-500 p-2">{categoryEmojis[product.category]} {product.category}</td>
              <td className="border border-red-500 p-2">{product.stock}</td>
              <td className="border border-red-500 p-2">${product.price}</td>
              <td className="border border-red-500 p-2">
                <button 
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
                  disabled={product.stock === 0}
                  onClick={() => handleSell(product.id, 1)}
                >
                  🛒 Comprar 1
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
