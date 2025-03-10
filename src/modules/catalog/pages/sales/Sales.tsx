// "use client";

// import React, { useState, useEffect } from "react";
// import { Gift, ShoppingBag } from "lucide-react";
// import { API_BACK } from "@/shared/config/api/getEnv";
// import DiscountTrivia from "@/shared/components/trivia/DiscountTrivia";

// export default function Sales() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetch(`${API_BACK}/products`)
//       .then((res) => res.json())
//       .then((data) => {
//         const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
//         setProducts(shuffled);
//       })
//       .catch((error) => console.error("Error cargando productos:", error));

//     const timer = setTimeout(() => setShowModal(true), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Header */}
//       <header className="bg-red-600 py-6">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <ShoppingBag className="h-8 w-8 text-white" />
//             <h1 className="text-2xl font-bold">🔥 INK3D 🔥</h1>
//           </div>
//           <Gift className="h-6 w-6 text-white" />
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
//             >
//               <img
//                 src={product.image[0]}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold">{product.name}</h3>
//                 <p className="text-gray-400">{product.description}</p>
//                 <div className="flex justify-between items-center mt-4">
//                   <span className="text-2xl font-bold text-red-500">
//                     ${product.price}
//                   </span>
//                   {product.discount > 0 && (
//                     <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                       {product.discount}% OFF
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Trivia Modal */}
//       <DiscountTrivia showModal={showModal} setShowModal={setShowModal} />
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Gift, ShoppingBag, Gamepad2 } from "lucide-react";
import { API_BACK } from "@/shared/config/api/getEnv";
import { Product } from "@/modules/checkout/pages/cart/context/Cart.context";
import Image from "next/image";
// import DiscountGames from "@/shared/components/trivia/DiscountGames";

export default function Sales() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [showGamesModal, setShowGamesModal] = useState(false);

  useEffect(() => {
    fetch(`${API_BACK}/products`)
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 6);
        setProducts(shuffled);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-red-600 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold">🔥 INK3D 🔥</h1>
          </div>
          <div className="flex space-x-4">
            <Gift className="h-6 w-6 text-white" />
            <button
              // onClick={() => setShowGamesModal(true)}
              className="flex items-center bg-red-700 px-4 py-2 rounded-lg text-white hover:bg-red-800 transition"
            >
              <Gamepad2 className="h-5 w-5 mr-2" /> Juega y Gana
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <Image
                src={product.image[0]}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-400">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-red-500">
                    ${product.price}
                  </span>
                  {product.discount > 0 && (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modales de Juegos
      <DiscountGames
        showGamesModal={showGamesModal}
        setShowGamesModal={setShowGamesModal}
      /> */}
    </div>
  );
}
