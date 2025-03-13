'use client';

import React, { useState, useContext, createContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LoginInterface } from "../interfaces/Login.interface";
import { SignupInterface } from "../interfaces/Signup.interface";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { UpdateDataProfileInterface, UpdateDataUserShipmentInterface, UserInterface } from "../interfaces/User.interface";
import { getAuthHeaders } from '@/modules/user/pages/manager/context/getAuthHeaders';
import Loading from '@/app/loading';




interface ResponseInterface {
    token: string;
    message: string;
}

export interface ErrorResponse {
    message: string;
    statusCode?: number;  
    error?: string; 
}

const defaultUser: UserInterface = {
    id: '',
    name: '',
    email: '',
    role: '',
    image: '',
    phone: '',
    address: '',
    city: '',
    bio: '',
    country: '',
    orders: [],
    isActive: false,
    favorites: [],
    createdAt: '',
    updatedAt: ''
};


interface AuthContextInterface {
    user: UserInterface;
    login: (loginForm: LoginInterface) => void;
    signup: (signForm: SignupInterface) => void;
    logout: () => void;
    isAuthenticated: boolean;
    token: string;
    isLoading: boolean;
    getIdUser: (token: string) => string;
    getIsAdmin: (token: string) => boolean;
    updateDataUserShipment: (updateDataUserShipment: UpdateDataUserShipmentInterface) => Promise<void>
    updateDataUser: (updateDataUser: UpdateDataProfileInterface) => Promise<void>
    sendEmailResetPassword: (email: string) => Promise<void>
}
const AuthContext = createContext<AuthContextInterface>({
    user: defaultUser,
    login: () => { },
    logout: () => { },
    signup: () => { },
    isAuthenticated: false,
    isLoading: true,
    token: "",
    getIdUser: () => "",
    getIsAdmin: () => false,
    updateDataUserShipment: async () => { },
    updateDataUser: async() => { },
    sendEmailResetPassword: async() => {}
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<UserInterface>(defaultUser);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const checkTokenValidity = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return new Date(payload.exp * 1000) > new Date();
        } catch {
            return false;
        }
    };
    const getIdUser = (token: string): string => {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId;
    };
    const fetchUser = useCallback(async (token: string) => {
        setIsLoading(true)
        try {
            const res = await axios.get<UserInterface>(`${API_BACK}/users/${getIdUser(token)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (error) { 
            console.error("Error fetching user:", error);
            setUser(defaultUser);
            setIsAuthenticated(false);
            router.push('/');
        } finally {
            setIsLoading(false)
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
                setUser(defaultUser);
                setToken("");
                setIsAuthenticated(false);
                router.push('/');
            }
        }
        
    }, [fetchUser, router]);

    
    if(isLoading) return <Loading/>

    const getIsAdmin = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.role === "admin";
        } catch (error) {
            console.error("Error decoding token:", error);
            return false;
        }
    };

    const updateDataUser = async(updateDataUser: UpdateDataProfileInterface) => {
        const updatedFields: Partial<UpdateDataProfileInterface> = {};
    
        if (updateDataUser.name !== user?.name) updatedFields.name = updateDataUser.name;
        if (updateDataUser.email !== user?.email) updatedFields.email = updateDataUser.email;
        if (updateDataUser.phone !== user?.phone) updatedFields.phone = updateDataUser.phone;
        if (updateDataUser.address !== user?.address) updatedFields.address = updateDataUser.address;
        if (updateDataUser.country !== user?.country) updatedFields.country = updateDataUser.country;
        if (updateDataUser.image !== user?.image) updatedFields.image = updateDataUser.image;
    

        if (Object.keys(updatedFields).length > 0) {
            await axios.patch(`${API_BACK}/users/${getIdUser(token)}`, updatedFields, getAuthHeaders());
        }
    }

    const updateDataUserShipment = async (updateDataUserShipment: UpdateDataUserShipmentInterface) => {
        const updatedFields: Partial<UpdateDataUserShipmentInterface> = {};

        if (updateDataUserShipment.phone !== user?.phone) updatedFields.phone = updateDataUserShipment.phone;
        if (updateDataUserShipment.address !== user?.address) updatedFields.address = updateDataUserShipment.address;
        if (updateDataUserShipment.city !== user?.city) updatedFields.city = updateDataUserShipment.city;
        if (updateDataUserShipment.country !== user?.country) updatedFields.country = updateDataUserShipment.country;
    

        if (Object.keys(updatedFields).length > 0) {
            await axios.patch(`${API_BACK}/users/${getIdUser(token)}`, updatedFields, getAuthHeaders());
        }
    }

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
            setIsAuthenticated(false);
            throw new Error(error instanceof Error ? error.message : "Error interno del servidor");
        } finally {
            setIsLoading(false)
        }
    };
    const signup = async (signupForm: SignupInterface) => {
        try {
            await axios.post(`${API_BACK}/auth/signup`, signupForm);
        } catch (error) {
            console.error("Error al registrarse", error)
        } finally {
            setIsLoading(false)
        }
        
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(defaultUser);
        setToken("");

        router.push('/home');
    };

    const sendEmailResetPassword = async (email: string) => {
        await axios.post(`${API_BACK}/auth/request-password-reset`, email)
    } 

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
        updateDataUserShipment,
        updateDataUser,
        sendEmailResetPassword
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