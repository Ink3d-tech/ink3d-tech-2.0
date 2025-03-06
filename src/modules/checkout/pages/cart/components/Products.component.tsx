"use client";

import Image from "next/image";
import { ButtonBase } from "./ButtonBase.component";
import Link from "next/link";
import { ProductInterface, useProducts } from "@/modules/user/pages/manager/context/Products.context";
import { getRoute } from "./getRoute";

export const CardProductComponent = ({ product }: { product: ProductInterface }) => {
    const { name, image, price } = product;

    return (
        <div className="relative">
            <div className="group overflow-hidden w-full">
                <Image
                    className="w-full h-64 object-contain rounded transition duration-300 transform group-hover:scale-150"
                    src={image[0]}
                    alt={name}
                    width={500}
                    height={500}
                />
              
                {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition duration-300">
                    <ButtonBase name="View details"/>
                </div> */}
            </div>
            
            <div className="mt-4">
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{name}</h3>
                <p className="font-bold text-blue-600">${price}</p>
            </div>
        </div>
    );
};

export const ProductsComponent = () => {
    const { products } = useProducts();

    return (
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
                    Productos recomendados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        !products.length
                        ? (Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>    
                        ))) 
                        : (products.slice(0, 4).map((product) => (
                            <Link key={product.id} href={product.id ? getRoute("/productDetail/:id", { id: product.id }): ""}>
                                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <CardProductComponent product={product} />
                                </div>
                            </Link>
                            )
                        ))
                    }
                </div>
                <div className="flex justify-center mt-10">
                    <ButtonBase name="See more products" href={"/products"} />
                </div>
            </div>
        </section>
        
        
    );
};

export default ProductsComponent;