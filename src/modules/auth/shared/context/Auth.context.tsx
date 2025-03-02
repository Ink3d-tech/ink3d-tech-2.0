"use client"

import React, { useState, useContext, createContext, useEffect } from "react";
import { LoginInterface } from "../interfaces/Login.interface";
import Loading from "@/app/loading";
import { SignupInterface } from "../interfaces/Signup.interface";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface AuthContextInterface {
    user: string | null
    login: (loginForm: LoginInterface) => void
    signup: (signForm: SignupInterface) => void
    logout: () => void
    isAuthenticated: boolean
    token: string
    isLoading: boolean
    getIdUser: (token: string) => string | null
}

const AuthContext = createContext<AuthContextInterface>({
    user: null,
    login: () => {},
    logout: () => {},
    signup: () => {},
    isAuthenticated: false,
    isLoading: true,
    token: "",
    getIdUser: () => null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setToken("");
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    }, []);

    if (isLoading) return <Loading />;

    const getIdUser = (token: string): string | null => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.userId;
        } catch (error) {
            console.error("Error al obtener el userId desde el token:", error);
            return null;
        }
    };

    interface ResponseInterface {
        token: string;
        message: string;
    }

    const login = async (loginForm: LoginInterface) => {  
        const { data } = await axios.post<ResponseInterface>(`${API_BACK}/auth/signin`, loginForm);

        const userId = getIdUser(data.token);

        if (userId) {
            setUser(userId);
            localStorage.setItem("user", JSON.stringify(userId));
        }

        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
    };

    const signup = async (signupForm: SignupInterface) => {
        await axios.post(`${API_BACK}/auth/signup`, signupForm);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        setToken("");
    };

    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated,
        isLoading,
        token,
        getIdUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};