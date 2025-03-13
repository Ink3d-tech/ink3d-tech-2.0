"use client"
import { PowerOff, Power } from "lucide-react";
import { ProductInterface, useProducts } from "../../../context/Products.context";
import Image from "next/image";
import { useState } from "react";
import Spinner from "@/modules/checkout/pages/cart/components/Spinner.component";


export default function ProductRow({ product }: { product: ProductInterface }) {
    const { deactivateProduct, activateProduct } = useProducts()
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleProductStatus = async () => {
        if (!product.id) return; 
        setIsLoading(true);

        try {
            if (product.isActive) {
                await deactivateProduct(product.id);
            } else {
                await activateProduct(product.id);
            }
        } catch (err) {
            console.error("Hubo un error al crear el product", err)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <tr className="hover:bg-gray-700 transition-colors">
            <td className="px-6 py-4">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                    width={200}
                    height={200}
                />
            </td>
            <td className="px-6 py-4 text-gray-200 font-medium">
                {product.name ? product.name : 'No Name'}
            </td>
            <td className="px-6 py-4 text-gray-200">
                ${product.price}
                {product.discount && (
                    <span className="ml-2 text-green-400 text-sm">-{product.discount}%</span>
                )}
            </td>
            <td className="px-6 py-4 text-gray-200">{product.stock}</td>
            <td className="px-6 py-4 text-gray-200">{product.size}</td>
            <td className="px-6 py-4 text-gray-200">{product.category[1]}</td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-sm ${product.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {product.isActive ? "Activo" : "Inactivo"}
                </span>
            </td>
            <td className="px-6 py-4">
                <button
                    onClick={handleToggleProductStatus}
                    className={`
                        ${isLoading ? "cursor-not-allowed" : ""}
                        p-2 rounded-full transition-colors 
                        ${product.isActive ? 
                          'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 
                          'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }
                      `}
                >
                    {isLoading ? (
                        <Spinner/>  
                    ) : product.isActive ? (
                        <PowerOff size={18} />
                    ) : (
                        <Power size={18} />
                    )}
                </button>
    
            </td>
        </tr>
    )
};
