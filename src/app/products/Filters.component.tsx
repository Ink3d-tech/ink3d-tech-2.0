// "use client";
// import { useState } from "react";

// interface FiltersProps {
//   onSortChange: (sortOption: string) => void;
//   onFilterChange: (filters: { category?: string; size?: string; minPrice?: number; maxPrice?: number; inStock?: boolean }) => void;
//   categories: string[];
//   sizes: string[];
// }

// export default function Filters({ onSortChange, onFilterChange, categories, sizes }: FiltersProps) {
//   const [sort, setSort] = useState("");
//   const [category, setCategory] = useState("");
//   const [size, setSize] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [inStock, setInStock] = useState(false);

//   const handleApplyFilters = () => {
//     onFilterChange({
//       category: category || undefined,
//       size: size || undefined,
//       minPrice: minPrice ? Number(minPrice) : undefined,
//       maxPrice: maxPrice ? Number(maxPrice) : undefined,
//       inStock,
//     });
//   };

//   return (
//     <div className="flex flex-wrap gap-4 justify-center my-4">
//       {/* Ordenar */}
//       <div>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setSort(sort ? "" : "open")}>
//           Ordenar
//         </button>
//         {sort && (
//           <div className="absolute bg-white shadow-lg p-2 mt-2 rounded-md">
//             {["Precio: Menor a Mayor", "Precio: Mayor a Menor", "A - Z", "Z - A", "Más Nuevo al más Viejo", "Más Viejo al más Nuevo", "Más Vendidos"].map(
//               (option) => (
//                 <p key={option} className="cursor-pointer p-1 hover:bg-gray-200" onClick={() => onSortChange(option)}>
//                   {option}
//                 </p>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       {/* Filtrar */}
//       <div>
//         <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => setSort(sort ? "" : "open")}>
//           Filtrar
//         </button>
//         {sort && (
//           <div className="absolute bg-white shadow-lg p-2 mt-2 rounded-md">
//             {/* Categoría */}
//             <select className="block p-2 border rounded-md" onChange={(e) => setCategory(e.target.value)} value={category}>
//               <option value="">Categoría</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>

//             {/* Talles */}
//             <select className="block p-2 border rounded-md mt-2" onChange={(e) => setSize(e.target.value)} value={size}>
//               <option value="">Talle</option>
//               {sizes.map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>

//             {/* Precio mínimo y máximo */}
//             <div className="flex gap-2 mt-2">
//               <input
//                 type="number"
//                 placeholder="Mínimo"
//                 className="p-2 border rounded-md"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Máximo"
//                 className="p-2 border rounded-md"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//               />
//             </div>

//             {/* En stock */}
//             <div className="flex items-center gap-2 mt-2">
//               <input type="checkbox" checked={inStock} onChange={() => setInStock(!inStock)} />
//               <label>Solo en stock</label>
//             </div>

//             {/* Botón aplicar */}
//             <button className="bg-gray-800 text-white px-4 py-2 rounded-md mt-2 w-full" onClick={handleApplyFilters}>
//               Aplicar
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
