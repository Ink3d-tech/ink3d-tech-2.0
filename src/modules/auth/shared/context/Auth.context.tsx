"use client"

import React, { useState, useContext, createContext, useEffect } from "react";
import { LoginInterface } from "../interfaces/Login.interface";
import Loading from "@/app/loading";
import { SignupInterface, UserInterface } from "../interfaces/Signup.interface";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface AuthContextInterface {
    login: (loginForm: LoginInterface) => void
    signup: (signForm: SignupInterface) => void
    logout: () => void
    isAuthenticated: boolean
    token: string | null
    isLoading: boolean
}

const AuthContext = createContext<AuthContextInterface>({
    login: () => {},
    logout: () => {},
    signup: () => {},
    isAuthenticated: false,
    isLoading: true,
    token: null,
})

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true);
   

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            setToken(token)
            setIsAuthenticated(true)
        } else {
            setToken(null)
            setIsAuthenticated(false)
        }

        setIsLoading(false);
    }, [])

    if(isLoading) return <Loading/>

    

    interface ResponseInterface {
        token: string
        message: string
    }

    interface TokenInterface {
        email: string
        exp: number
        iat: number
        role: string
        userId: string
    }

    const login = async (loginForm: LoginInterface) => {  
        const { data } = await axios.post<ResponseInterface>(`${API_BACK}/auth/signin`, loginForm)

        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem("token", data.token) 
    }
    

    const signup = async(signupForm: SignupInterface) => {
        await axios.post(`${API_BACK}/auth/signup`, signupForm)
    }

    const logout = async () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setToken(null)
    }

    const value = {
        login,
        signup,
        logout,
        isAuthenticated,
        isLoading,
        token
    }

   return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
   )
        
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    // chequeo si puedo usar el useContext en esa parte de la aplicacion
    if(!context) throw new Error("useAuth must be used  within an AuthProvider")
    return context
}





