// import React from 'react';
// import { ExternalLink, Star } from 'lucide-react';

// interface ProductCardProps {
//   title: string;
//   price: number;
//   image: string;
//   rating: number;
//   discount?: number;
// }

// export function ProductCard({ title, price, image, rating, discount }: ProductCardProps) {
//   return (
//     <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
//       {discount && (
//         <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full z-10">
//           -{discount}%
//         </div>
//       )}
//       <div className="relative aspect-[4/3] overflow-hidden">
//         <img 
//           src={image} 
//           alt={title}
//           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
//           {title}
//         </h3>
//         <div className="flex items-center mt-2 space-x-1">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//             />
//           ))}
//         </div>
//         <div className="mt-3 flex items-center justify-between">
//           <div className="flex items-baseline gap-2">
//             <span className="text-2xl font-bold text-indigo-600">${price}</span>
//             {discount && (
//               <span className="text-sm text-gray-400 line-through">${(price * (100 + discount) / 100).toFixed(2)}</span>
//             )}
//           </div>
//           <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
//             <ExternalLink className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { ExternalLink, Star } from "lucide-react";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   discount?: number;
// }
// export function ProductCard({ products }: { products: Product[] }) {
//     if (!products || products.length === 0)
//       return <p className="text-center text-gray-500">No hay productos disponibles</p>;
  
//     return (
//       <div className="grid grid-cols-1 gap-4">
//         {products.map(({ id, name, price, image, rating, discount }) => (
//           <div
//             key={id}
//             className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             {discount && (
//               <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full z-10">
//                 -{discount}%
//               </div>
//             )}
//             <div className="relative aspect-[4/3] overflow-hidden">
//               <img
//                 src={image}
//                 alt={name}
//                 className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
//                 {name}
//               </h3>
//               <div className="flex items-center mt-2 space-x-1">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
//                   />
//                 ))}
//               </div>
//               <div className="mt-3 flex items-center justify-between">
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-2xl font-bold text-indigo-600">${price}</span>
//                   {discount && (
//                     <span className="text-sm text-gray-400 line-through">
//                       ${(price * (100 + discount) / 100).toFixed(2)}
//                     </span>
//                   )}
//                 </div>
//                 <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
//                   <ExternalLink className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }
  




"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { API_BACK } from "@/shared/config/api/getEnv";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
}
export function ProductCard({ products, small = false }: { products: Product[]; small?: boolean }) {
  if (!products || products.length === 0)
    return <p className="text-center text-gray-500">No hay productos disponibles</p>;

  return (
    <div className={`grid ${small ? "grid-cols-4 gap-2 overflow-x-auto flex-nowrap" : "grid-cols-1 gap-4"}`}>
      {products.map(({ id, name, price, image, rating, discount }) => (
        <div
          key={id}
          className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${small ? "w-28" : "w-full"}`}
        >
          {discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
              -{discount}%
            </div>
          )}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className={`p-2 ${small ? "text-xs" : "text-base"}`}>
            <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center mt-1 space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className={`font-bold text-indigo-600 ${small ? "text-sm" : "text-2xl"}`}>${price}</span>
                {discount && (
                  <span className="text-xs text-gray-400 line-through">
                    ${(price * (100 + discount) / 100).toFixed(2)}
                  </span>
                )}
              </div>
              <button className="p-1 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
