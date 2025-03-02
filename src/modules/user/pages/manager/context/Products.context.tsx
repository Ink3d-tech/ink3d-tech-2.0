"use client"

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "../../../../../shared/config/api/getEnv";
import { Product } from "@/modules/checkout/pages/cart/context/Cart.context";

interface ProductsContextType {
    products: Product[]
    loading: boolean
    error: string | undefined
    getAllProducts: () => Product[]  | undefined
    getProductById: (id: string) => Product | undefined
    filteredProducts: (selectedCategory: string) => Product[] | undefined
    desactivateProduct: (id: string) => Promise<void>
    activateProduct: (id: string) => Promise<void>
    createProduct: (product: Product) => Promise<void>
}

const ProductsContext = createContext<ProductsContextType>({
    products: [],
    loading: true,
    error: undefined,
    getAllProducts: () => undefined,
    getProductById: () => undefined,
    filteredProducts: () => undefined,
    desactivateProduct: async () => {},
    activateProduct: async() => {},
    createProduct: async () => {}
});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<Product[]>(`${API_BACK}/products`)
                if(res) setProducts(res.data)
            } catch (error) {
                setError(
                    error instanceof Error ? error.message : "Error interno del servidor"
                )
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const getProductById = (id: string): Product | undefined  => {
        return products.find(product => product.id === id)
    }

    const createProduct = async (product: Product): Promise<void> => {
        await axios.post(`${API_BACK}/products`, product)
    }

    const filteredProducts = (selectedCategory: string): Product[] | undefined => {
        return selectedCategory
            ? products.filter((product) => product.category.id === selectedCategory)
            : products;
    }

    const getAllProducts = (): Product[] => {
        console.log('====================================');
        console.log(products);
        console.log('====================================');
        return products
    }

    const activateProduct = async (id: string): Promise<void> => {
        await axios.patch(`${API_BACK}/${id}/activate`)
    };

    const desactivateProduct = async (id: string): Promise<void> => {
        await axios.patch(`${API_BACK}/${id}/desactivate`);
    }

    const value = {
        products,
        loading,
        error,
        getProductById,
        filteredProducts,
        getAllProducts,
        activateProduct,
        desactivateProduct,
        createProduct
    }

    return (
        <ProductsContext.Provider value={value}>
            { children }
        </ProductsContext.Provider>
    )
}

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext)

    if (!context) throw new Error("useProdudcts must be used  within an ProductsProvider")
    return context
}