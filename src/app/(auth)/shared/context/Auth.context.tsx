"use client"

import React, { useState, useContext, createContext, useEffect } from "react";
import { LoginInterface } from "../interfaces/Login.interface";
import Loading from "@/app/loading";
import { SignupInterface, UserInterface } from "../interfaces/User.interface";
import axios from "axios";

interface AuthContextInterface {
    user: UserInterface | null
    login: (loginForm: LoginInterface) => void
    logout: () => void
    isAuthenticated: boolean
    token: string | null
    isLoading: boolean
}

const AuthContext = createContext<AuthContextInterface>({
    user: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
    isLoading: true,
    token: null,
})

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserInterface | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const backendURL = process.env.NEXT_PUBLIC_BACKEND;

    if (!backendURL) {
        throw new Error("La URL del backend no está definida");
    }

    useEffect(() => {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if(user && token) {
            setUser(JSON.parse(user))
            setToken(token)
            setIsAuthenticated(true)
        } else {
            setUser(null)
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

    const login = async (loginForm: LoginInterface) => {
        try {
            const { data } = await axios.post(`${backendURL}/signin`, loginForm);
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setIsAuthenticated(true);
      
            const userId = getIdUser(data.token);
            if (!userId) throw new Error("Error al obtener el ID del usuario");
      
            const userResponse = await axios.get(`${backendURL}/users/${userId}`, {
              headers: { Authorization: `${data.token}` },
            });
      
            setUser(userResponse.data.user);
            localStorage.setItem("user", JSON.stringify(userResponse.data.user));
        } catch (error) {
            console.error("Error en el proceso de login:", error);
        }
    }
    

    const signup = async(signupForm: SignupInterface) => {
        await axios.post(`${backendURL}/signup`, signupForm)
    }

    const logout = async () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setIsAuthenticated(false)
        setToken(null)
    }

    const value = {
        user,
        login,
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





