"use client"

import React, { useState, useContext, createContext, useEffect } from "react";
import { LoginInterface } from "../interfaces/Login.interface";
import Loading from "@/app/loading";
import { SignupInterface } from "../interfaces/Signup.interface";
import axios from "axios";

import { API_BACK } from "@/shared/config/api/getEnv";
import { UserInterface } from "../interfaces/User.interface";
import { getAuthHeaders } from "@/modules/user/pages/manager/context/getAuthHeaders";

interface ResponseInterface {
    token: string;
    message: string;
}

interface AuthContextInterface {
    user: UserInterface | null 
    login: (loginForm: LoginInterface) => void
    signup: (signForm: SignupInterface) => void
    logout: () => void
    isAuthenticated: boolean
    token: string
    isLoading: boolean
    getIdUser: (token: string) => string
    getIsAdmin: (token: string) => boolean
}

const AuthContext = createContext<AuthContextInterface>({
    user: null,
    login: () => {},
    logout: () => {},
    signup: () => {},
    isAuthenticated: false,
    isLoading: true,
    token: "",
    getIdUser: () => "",
    getIsAdmin: () => false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getIdUser = (token: string): string => {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId;
    };

    const fetchUser = async(token: string) => {
        const res = await axios.get<UserInterface>(`${API_BACK}/users/${getIdUser(token)}`, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
        });
        setUser(res.data)
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
    
        if (token) {
            localStorage.setItem("token", token);
            setToken(token); 
            fetchUser(token);
            setIsAuthenticated(true);
            
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            const storedToken = localStorage.getItem("token");
    
            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);
                fetchUser(storedToken); 

            } else {
                setUser(null);
                setToken("");
                setIsAuthenticated(false);
            }
        }
    
        setIsLoading(false);
    }, []);

    if(isLoading) return <Loading/> 
       
    const getIsAdmin = (token: string): boolean => {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.role === "admin"
    };

    const login = async (loginForm: LoginInterface) => {  
        const { data } = await axios.post<ResponseInterface>(`${API_BACK}/auth/signin`, loginForm);
        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", getIdUser(data.token)) 

        fetchUser(data.token)
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

        window.location.reload()
    };


    const value = {
        user,
        login,
        signup,
        logout,
        isAuthenticated,
        isLoading,
        token,
        getIdUser,
        getIsAdmin
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