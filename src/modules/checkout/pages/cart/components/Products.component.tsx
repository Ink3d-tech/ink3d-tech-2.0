"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductInterface, useProducts } from "@/modules/user/pages/manager/context/Products.context";
import { getRoute } from "./getRoute";
import { ArrowRight } from "lucide-react";
import SkeletonProducts from "./SkeletonProducts";

export const CardProductComponent = ({ product }: { product: ProductInterface }) => {
    const getStyleClasses = (style: string | undefined) => {
        if (!style) return "bg-blue-500 text-white";
        const normalizedStyle = style.trim().toLowerCase();
        const styleColors: Record<string, string> = {
            motorsport: "bg-red-500 text-white",
            asian: "text-green-600 bg-green-100",
            streetwear: "bg-black text-white",
        };

        return styleColors[normalizedStyle] || "bg-blue-500 text-white";
    };
    return (
        <div className="relative flex flex-col bg-white overflow-hidden rounded-lg cursor-pointer transition-transform group">
            <div className="flex gap-2 ">
                <span
                    className={`absolute top-3 right-0 text-xs font-semibold uppercase px-4 py-1 
            rounded-bl-lg rounded-tl-lg opacity-0 shadow-md
            group-hover:opacity-100 
            transition-opacity duration-300 ease-in-out z-[100] ${getStyleClasses(
                        product.style
                    )}`}
                >
                    {product.style || "Sin estilo"}
                </span>
            </div>
            {product.stock === 0 && (
                <div
                    className="absolute top-3 left-0 bg-gray-800 text-white text-xs font-semibold uppercase px-4 py-1 
    rounded-br-lg rounded-tr-lg shadow-md opacity-100"
                >
                    Sin Stock
                </div>
            )}

            <div className="overflow-hidden w-full">
                {product.image.length === 1 ? (
                    <>
                        <Image
                        src={product.image[0]}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="w-full h-64 object-cover rounded transition duration-300 transform group-hover:scale-110"
                        />
        
                        <Image
                            src={product.image[0]}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="w-full h-64 object-cover rounded transition duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100"
                        />
                    </>
                ) : (
                    <>
                        <Image
                        src={product.image[0]}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="w-full h-64 object-cover rounded transition duration-300 transform group-hover:scale-110"
                        />

                        <Image
                            src={product.image[1]}
                            alt={product.name}
                            width={800}
                            height={800}
                            className="w-full h-64 object-cover rounded transition duration-300 absolute top-0 left-0 opacity-0 group-hover:opacity-100"
                        />
                    </>
                )}
               
            </div>
            <div className="p-3 text-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm truncate">
                    {product.description}
                </p>
                <p className="text-lg font-bold mt-1 text-green-700">
                    ${product.price}
                </p>
            </div>
        </div>
    );
};

export const ProductsComponent = () => {
    const { products, loading } = useProducts();

    if(loading) return <SkeletonProducts/>

    return (
        <section className="bg-gray-50 py-12 z-0">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
                    Tops INK3DS: Lo mejor de la semana para ti
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        products.slice(0, 4).map((product) => (
                                <Link key={product.id} href={product.id ? getRoute("/productDetail/:id", { id: product.id }) : ""}>
                                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <CardProductComponent product={product} />
                                    </div>
                                </Link>
                        ))
                            
                    }
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            window.location.href = "/products"
                        }}
                        type="submit"
                        className="w-60 bg-black text-white py-3 rounded-xl font-semibold 
                            hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200
                            flex items-center justify-center gap-2"
                    >
                        Ver más
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>


    );
};

export default ProductsComponent;