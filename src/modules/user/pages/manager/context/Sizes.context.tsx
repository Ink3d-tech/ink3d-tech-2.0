"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_BACK } from "@/shared/config/api/getEnv"
import { getAuthHeaders } from "./getAuthHeaders"
import { Mixin } from "@/modules/auth/shared/components/MixinAlert"


export interface SizeInterface {
    id?: string
    name: string
}

interface SizeContextType {
    sizes: SizeInterface[]
    loading: boolean
    error: string | undefined
    createSize: (Size: SizeInterface) => Promise<void>
    getSizeById: (SizeId: string | undefined) => Promise<void>
    deleteSize: (id: string) => Promise<void>
}

const SizesContext = createContext<SizeContextType>({
    sizes: [],
    loading: false,
    error: undefined,
    createSize: async() => {},
    getSizeById: async() => {},
    deleteSize: async() => {},
})

export const SizesProvider = ({children}: {children: React.ReactNode}) => {
    const [sizes, setSizes] = useState<SizeInterface[]>([])
    const [sizeId, setSizeId] = useState<SizeInterface>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    
    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const res = await axios.get<SizeInterface[]>(`${API_BACK}/sizes`, getAuthHeaders());
                if (res) setSizes(res.data);
                
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error interno del servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchSizes();
    }, [])

    const createSize = async (Size: SizeInterface) => { 
        try {
            const res = await axios.post<SizeInterface>(`http://localhost:3000/sizes`, Size);

            setSizes(prev => [...prev, res.data]);
        } catch (error) {
            Mixin.fire("Error al crear la categoria", "", "error")
            setError(error instanceof Error ? error.message : "Error al crear la categoria");
        }
    }

    const getSizeById = async (SizeId: string | undefined) => {
        try {
            const res = await axios.get<SizeInterface>(
                `${API_BACK}/sizes/${SizeId}`, getAuthHeaders()
            )
            setSizeId(res.data)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error al obtener la categoria");
        }
    }

    const deleteSize = async (id: string) => {
        await axios.delete<SizeInterface>(`${API_BACK}/sizes/${id}`, getAuthHeaders())
        setSizes(sizes.filter(size => size.id !== id));
    }

    const value = {
        sizes,
        loading,
        error,
        createSize,
        deleteSize,
        getSizeById
    }

    return (
        <SizesContext.Provider value={value}>
            {children}
        </SizesContext.Provider>
    )
}

export const useSizes = (): SizeContextType => {
    const context = useContext(SizesContext)
    if (!context) throw new Error("useSizes must be used within a SizesProvider");
    return context;
}
