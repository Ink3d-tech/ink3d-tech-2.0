"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_BACK } from "@/shared/config/api/getEnv"
import { getAuthHeaders } from "./getAuthHeaders"
import { Mixin } from "@/modules/auth/shared/components/MixinAlert"


export interface CategoryInterface {
    id?: string
    name: string
}

interface CategoryContextType {
    categories: CategoryInterface[]
    loading: boolean
    error: string | undefined
    createCategory: (category: CategoryInterface) => Promise<void>
    // getCategoryById: (categoryId: string | undefined) => Promise<void>
    deleteCategory: (id: string) => Promise<void>
}

const CategoriesContext = createContext<CategoryContextType>({
    categories: [],
    loading: false,
    error: undefined,
    createCategory: async() => {},
    // getCategoryById: async() => {},
    deleteCategory: async() => {},
})

export const CategoriesProvider = ({children}: {children: React.ReactNode}) => {
    const [categories, setCategories] = useState<CategoryInterface[]>([])
    // const [categoryId, setCategoryId] = useState<CategoryInterface>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get<CategoryInterface[]>(`${API_BACK}/categories`, getAuthHeaders());
                if (res) setCategories(res.data);
                
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error interno del servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [])

    const createCategory = async (category: CategoryInterface) => { 
        try {
            const res = await axios.post<CategoryInterface>(`${API_BACK}/categories`, category,
                getAuthHeaders()
            );

            setCategories([...categories, res.data]);
        } catch (error) {
            Mixin.fire("Error al crear la categoria", "", "error")
            setError(error instanceof Error ? error.message : "Error al crear la categoria");
        }
    }

    // const getCategoryById = async (categoryId: string | undefined) => {
    //     try {
    //         const res = await axios.get<CategoryInterface>(
    //             `${API_BACK}/categories/${categoryId}`, getAuthHeaders()
    //         )
    //         setCategoryId(res.data)
    //     } catch (error) {
    //         setError(error instanceof Error ? error.message : "Error al obtener la categoria");
    //     }
    // }

    const deleteCategory = async (id: string) => {
        await axios.delete<CategoryInterface>(`${API_BACK}/categories/${id}`, getAuthHeaders())
        setCategories(categories.filter(category => category.id !== id));
    }

    const value = {
        categories,
        loading,
        error,
        createCategory,
        deleteCategory,
        // getCategoryById
    }

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}

export const useCategories = (): CategoryContextType => {
    const context = useContext(CategoriesContext)
    if (!context) throw new Error("useCategories must be used within a CategoriesProvider");
    return context;
}
