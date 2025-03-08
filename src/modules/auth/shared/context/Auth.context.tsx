'use client';

import React, { useState, useContext, createContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation'; 
import { LoginInterface } from "../interfaces/Login.interface";
import Loading from "@/app/loading";
import { SignupInterface } from "../interfaces/Signup.interface";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { UserInterface } from "../interfaces/User.interface";
interface ResponseInterface {
    token: string;
    message: string;
}
interface AuthContextInterface {
    user: UserInterface | null;
    login: (loginForm: LoginInterface) => void;
    signup: (signForm: SignupInterface) => void;
    logout: () => void;
    isAuthenticated: boolean;
    token: string;
    isLoading: boolean;
    getIdUser: (token: string) => string;
    getIsAdmin: (token: string) => boolean;
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
    getIsAdmin: () => false,
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const checkTokenValidity = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expirationDate = new Date(payload.exp * 1000);
            return expirationDate > new Date();  
        } catch {
            return false;
        }
    };
    const getIdUser = (token: string): string => {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId;
    };
    const fetchUser = useCallback(async (token: string) => {
        try {
            const res = await axios.get<UserInterface>(`${API_BACK}/users/${getIdUser(token)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
            setIsAuthenticated(false);  
            router.push('/'); 
        }
    }, [router]);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");
        if (tokenFromUrl && checkTokenValidity(tokenFromUrl)) {
            localStorage.setItem("token", tokenFromUrl);
            setToken(tokenFromUrl);
            fetchUser(tokenFromUrl);
            setIsAuthenticated(true);
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            const storedToken = localStorage.getItem("token");

            if (storedToken && checkTokenValidity(storedToken)) {
                setToken(storedToken);
                setIsAuthenticated(true);
                fetchUser(storedToken);
            } else {
                setUser(null);
                setToken("");
                setIsAuthenticated(false);
                router.push('/'); 
            }
        }
        setIsLoading(false);
    }, [fetchUser, router]);
    if (isLoading) return <Loading />;
    const getIsAdmin = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.role === "admin";
        } catch (error) {
            console.error("Error decoding token:", error);
            return false;
        }
    };
    const login = async (loginForm: LoginInterface) => {
        try {
            const { data } = await axios.post<ResponseInterface>(`${API_BACK}/auth/signin`, loginForm);
            const token = data.token;
            setToken(token);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
            localStorage.setItem("user", getIdUser(token));

            fetchUser(token);
            getIsAdmin(token);
        } catch (error) {
            console.error("Error logging in:", error);
            setIsAuthenticated(false);
        }
    };
    const signup = async (signupForm: SignupInterface) => {
        try {
            await axios.post(`${API_BACK}/auth/signup`, signupForm);
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        setToken("");

        router.push('/'); 
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
        getIsAdmin,
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
