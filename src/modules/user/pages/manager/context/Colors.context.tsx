"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_BACK } from "@/shared/config/api/getEnv"
import { getAuthHeaders } from "./getAuthHeaders"
import { Mixin } from "@/modules/auth/shared/components/MixinAlert"

export interface ColorInterface {
    id?: string
    name: string
}

interface ColorContextType {
    colors: ColorInterface[]
    loading: boolean
    error: string | undefined
    createColor: (color: ColorInterface) => Promise<void>
    getColorById: (colorId: string | undefined) => Promise<void>
    deleteColor: (id: string) => Promise<void>
}

const ColorsContext = createContext<ColorContextType>({
    colors: [],
    loading: false,
    error: undefined,
    createColor: async() => {},
    getColorById: async() => {},
    deleteColor: async() => {},
})

export const ColorsProvider = ({children}: {children: React.ReactNode}) => {
    const [colors, setColors] = useState<ColorInterface[]>([])
    const [colorId, setColorId] = useState<ColorInterface>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const res = await axios.get<ColorInterface[]>(`${API_BACK}/colors`, getAuthHeaders());
                if (res) setColors(res.data);
                
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error interno del servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchColors();
    }, [])

    const createColor = async (color: ColorInterface) => { 
        try {
            console.log(color)
            const res = await axios.post<ColorInterface>(`http://localhost:3000/colors`, color);
            setColors(prev => [...prev, res.data]);
        } catch (error) {
            Mixin.fire("Error al crear el color", "", "error")
            setError(error instanceof Error ? error.message : "Error al crear el color");
        }
    }

    const getColorById = async (colorId: string | undefined) => {
        try {
            const res = await axios.get<ColorInterface>(
                `${API_BACK}/colors/${colorId}`, getAuthHeaders()
            )
            setColorId(res.data)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error al obtener el color");
        }
    }

    const deleteColor = async (id: string) => {
        await axios.delete<ColorInterface>(`${API_BACK}/colors/${id}`, getAuthHeaders())
        setColors(colors.filter(color => color.id !== id));
    }

    const value = {
        colors,
        loading,
        error,
        createColor,
        deleteColor,
        getColorById
    }

    return (
        <ColorsContext.Provider value={value}>
            {children}
        </ColorsContext.Provider>
    )
}

export const useColors = (): ColorContextType => {
    const context = useContext(ColorsContext)
    if (!context) throw new Error("useColors must be used within a ColorsProvider");
    return context;
}
