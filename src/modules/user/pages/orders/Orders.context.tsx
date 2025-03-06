"use client"


import { createContext, useContext, useEffect, useState } from "react"

import axios from "axios"
import Swal from "sweetalert2"
import { API_BACK } from "@/shared/config/api/getEnv"
import { IOrder } from "../../../checkout/pages/cart/interfaces/cartService.interface"
import { useAuth } from "../../../auth/shared/context/Auth.context"

interface DashboardContextInterface {
    orders: IOrder[]
    isLoading: boolean
    error: string | undefined
}

const OrderContext = createContext<DashboardContextInterface>({
    orders: [],
    isLoading: true,
    error: undefined,
})

export const OrderProvider = ({children}: {children: React.ReactNode}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | undefined>()
    const [orders, setOrders] = useState<IOrder[]>([])
    const { token } = useAuth()


    useEffect(() => {

        if (token) {
            axios.get<IOrder[]>(`${API_BACK}/orders`, {
                headers: {
                    authorization: token,
                },
            })
            .then((res) => {
                setOrders(res.data.reverse());
            })
            .catch((error) => {
                Swal.fire(
                    "Error al obtener las órdenes del usuario",
                    error.message || "",
                    "error"
                );
                setError(error)
            })
            setIsLoading(false); 
            
        }
    }, [token]);

    // if(isLoading) return <Loading/>

    const value = {
        orders,
        isLoading,
        error
    }

   return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
   )
        
}

export const useOrder = () => {
    const context = useContext(OrderContext)
    if(!context) throw new Error("useOrder must be used  within an AuthProvider")
    return context
}
