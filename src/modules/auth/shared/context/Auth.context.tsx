"use client"

import React, { useState, useContext, createContext, useEffect } from "react";
import { LoginInterface } from "../interfaces/Login.interface";
import Loading from "@/app/loading";
import { SignupInterface, UserInterface } from "../interfaces/Signup.interface";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface AuthContextInterface {
    user: UserInterface | null
    login: (loginForm: LoginInterface) => void
    signup: (signForm: SignupInterface) => void
    logout: () => void
    isAuthenticated: boolean
    isAdmin: boolean
    token: string | null
    isLoading: boolean
    getIdUser: (token: string) => string
}

const AuthContext = createContext<AuthContextInterface>({
    user: null,
    login: () => {},
    logout: () => {},
    signup: () => {},
    isAuthenticated: false,
    isAdmin: false,
    isLoading: true,
    token: null,
    getIdUser: () => ""
})

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserInterface | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

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

    const getIdUser = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.userId;
        } catch (error) {
            console.error("Error al obtener el userId desde el token:", error);
            return null;
        }
    };

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
        user,
        login,
        signup,
        logout,
        isAuthenticated,
        isAdmin,
        isLoading,
        token,
        getIdUser
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





