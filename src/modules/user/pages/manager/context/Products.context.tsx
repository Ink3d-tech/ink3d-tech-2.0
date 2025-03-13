"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { getAuthHeaders } from "./getAuthHeaders";
import { Mixin } from "@/modules/auth/shared/components/MixinAlert";


export interface CategoryInterface {
    id?: string
    name?: string
}

export interface ProductInterface {
    id?: string | "1"
    name: string
    description: string
    price: number | ""
    stock: number | ""
    image: string[]
    size: string
    color: string
    discount?: number | ""
    category: string
    isActive?: boolean
    style: string
    updatedAt?: string
    createdAt?: string
}

export type ProductWithoutId = {
    name: string
    description: string
    price: number | ""
    stock: number | ""
    image: string[]
    size: string
    color: string
    discount?: number | ""
    category: string
    isActive?: boolean
}

interface ProductsContextType {
    products: ProductInterface[]
    loading: boolean
    error: string | undefined
    createProduct: (product: ProductWithoutId) => Promise<void>
    getProductById: (id: string) => ProductInterface | undefined
    updateProduct: (id: string, data: Partial<ProductInterface>) => Promise<void>
    deleteProduct: (id: string) => Promise<void>
    deactivateProduct: (id: string) => Promise<void>
    activateProduct: (id: string) => Promise<void>
}

const ProductsContext = createContext<ProductsContextType>({
    products: [],
    loading: true,
    error: undefined,
    createProduct: async () => {},
    getProductById: () => undefined,
    updateProduct: async () => {},
    deleteProduct: async () => {},
    deactivateProduct: async() => {},
    activateProduct: async() => {},
});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const res = await axios.get<ProductInterface[]>(`${API_BACK}/products`, getAuthHeaders());
                setProducts(res.data)
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error interno del servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

        

    const createProduct = async (product: ProductWithoutId): Promise<void> => {      
        try {
            const formattedProduct  = {
                ...product,
                category : {
                    id: product.category
                }
            }
            const res = await axios.post<ProductInterface>(`${API_BACK}/products`, formattedProduct,  getAuthHeaders());
            setProducts(prev => [...prev, res.data]);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error al crear el producto");
        }
    };

    const getProductById = (id: string): ProductInterface | undefined => {
        if (!products || products.length === 0) return undefined
        return products.find(product => product.id === id) || undefined;
    };


    const updateProduct = async (id: string, data: Partial<ProductInterface>): Promise<void> => {
        try {
            await axios.patch(`${API_BACK}/products/${id}`, data, getAuthHeaders());
            setProducts(prev => prev.map(product =>
                product.id === id ? { ...product, ...data } : product
            ));
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error actualizando el producto");
        }
    };

    const deleteProduct = async (id: string): Promise<void> => {
        try {
            await axios.delete(`${API_BACK}/products/${id}`,getAuthHeaders())
            setProducts(prev => prev.filter(product => product.id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error eliminando el producto")
        }
    }

    const deactivateProduct = async(id: string): Promise<void>  => {
        try {
            await axios.patch(`${API_BACK}/products/${id}/deactivate`, {}, getAuthHeaders())
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === id ? { ...product, isActive: false } : product
                )
            );
            
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error desactivando el producto")
            console.error("Error al desactivar el producto")
            Mixin.fire("Error al desactivar el product", "", "error")
        }
    }

    const activateProduct = async(id: string): Promise<void>  => {
        try {
            await axios.patch(`${API_BACK}/products/${id}/activate`, {}, getAuthHeaders())
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === id ? { ...product, isActive: true } : product
                )
            );
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error activando el producto")
            console.error("Error al activar el producto")
            Mixin.fire("Error al activar el product", "", "error")
        }
    }

    const value = {
        products,
        loading,
        error,
        getProductById,
        updateProduct,
        createProduct,
        deleteProduct,
        deactivateProduct,
        activateProduct
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error("useProducts must be used within a ProductsProvider");
    return context;
};