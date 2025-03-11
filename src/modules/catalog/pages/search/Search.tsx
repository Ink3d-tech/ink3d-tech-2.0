// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import EmptySearch from "./components/EmptySearch";
// import { useProducts } from "@/modules/user/pages/manager/context/Products.context";

// // Definir el tipo de producto
// interface IProduct {
//     id?: string
//     name: string
//     description: string
//     price: number | ""
//     stock: number | ""
//     image: string[]
//     size: string
//     color: string
//     discount?: number | ""
//     category: string
//     isActive?: boolean
//     style: string
// }



// // Supongamos que fetchProducts ya tiene todos los productos cargados externamente
// // const fetchProducts: IProduct[] = [
// //     { id: 1, name: "Impresora 3D Pro", price: 500 },
// //     { id: 2, name: "Filamento PLA Azul", price: 20 },
// //     { id: 3, name: "Resina UV Negra", price: 35 },
// //     { id: 4, name: "Boquilla de latón 0.4mm", price: 5 },
// // ];

// export default function SearchResults() {

//     const searchParams = useSearchParams();
//     const query = searchParams.get("query") || "";
//     const { products } = useProducts();
//     const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

//         const [searchQuery, setSearchQuery] = useState("");
//         const router = useRouter();
    
//         const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
//                 if (event.key === "Enter" && searchQuery.trim() !== "") {
//                     router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
//                 }
//             };

//     useEffect(() => {
//         if (!query.trim()) {
//             setFilteredProducts([]);
//             return;
//         }

//         const results = products.filter(product =>
//             product.name.toLowerCase().includes(query.toLowerCase())
//         );
//         setFilteredProducts(results);
//     }, [query]);
    

//     return (
//         <div className="p-4">
//             {query ? ( 
//                 <div>
//                     <div className='md:hidden flex justify-center my-4'>
//                         <input
//                             type="text"
//                             placeholder="Buscar..."
//                             className="p-2 rounded-md bg-white text-black border w-3/4 lg:w-48 transition-all duration-300 ease-in-out"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             onKeyDown={handleSearch}
//                         />
//                     </div>
//                     <h2 className="text-xl font-bold">Resultados para: "{query}"</h2>
//                     {filteredProducts.length > 0 ? (
//                     <ul className="mt-4">
//                         {filteredProducts.map(product => (
//                             <li key={product.id} className="p-2 border-b">
//                                 <Link href={`/product/${product.id}`} className="text-blue-600 hover:underline">
//                                     {product.name} - ${product.price}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                     ) : (
//                         <p className="text-gray-500 mt-4">No se encontraron resultados.</p>
//                     )}
//             </div>
//             ) : <EmptySearch />}
            
            
//         </div>
//     );
// }
