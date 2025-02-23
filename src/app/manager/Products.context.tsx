"use client"

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "../(auth)/shared/helpers/getEnv";

export interface ProductInterface {
    id?: string
    name: string
    description: string
    price: number
    stock: number
    image: string
    discount: number
    categoryId: string
    isActive: boolean
}

interface ProductsContextType {
    products: ProductInterface[]
    loading: boolean
    error: string | undefined
    getAllProducts: () => ProductInterface[]  | undefined
    getProductById: (id: string) => ProductInterface | undefined
    filteredProducts: (selectedCategory: string) => ProductInterface[] | undefined
    desactivateProduct: (id: string) => Promise<void>
    activateProduct: (id: string) => Promise<void>
    createProduct: (product: ProductInterface) => Promise<void>
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
    const [products, setProducts] = useState<ProductInterface[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ProductInterface[]>(`${API_BACK}/products`)
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

    const getProductById = (id: string): ProductInterface | undefined  => {
        return products.find(product => product.id === id)
    }

    const createProduct = async (product: ProductInterface): Promise<void> => {
        await axios.post(`${API_BACK}/products`, product)
    }

    const filteredProducts = (selectedCategory: string): ProductInterface[] | undefined => {
        return selectedCategory
            ? products.filter((product) => product.categoryId === selectedCategory)
            : products;
    }

    const getAllProducts = (): ProductInterface[] => {
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