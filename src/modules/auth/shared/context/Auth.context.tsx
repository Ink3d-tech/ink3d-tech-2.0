// "use client"

// import React, { useState, useContext, createContext, useEffect } from "react";
// import { LoginInterface } from "../interfaces/Login.interface";
// import Loading from "@/app/loading";
// import { SignupInterface, UserInterface } from "../interfaces/Signup.interface";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface AuthContextInterface {
//     user: UserInterface | null
//     login: (loginForm: LoginInterface) => void
//     signup: (signForm: SignupInterface) => void
//     logout: () => void
//     isAuthenticated: boolean
//     isAdmin: boolean
//     token: string | null
//     isLoading: boolean
//     getIdUser: (token: string) => string
// }

// const AuthContext = createContext<AuthContextInterface>({
//     user: null,
//     login: () => {},
//     logout: () => {},
//     signup: () => {},
//     isAuthenticated: false,
//     isAdmin: false,
//     isLoading: true,
//     token: null,
//     getIdUser: () => ""
// })

// export const AuthProvider = ({children}: {children: React.ReactNode}) => {
//     const [token, setToken] = useState<string | null>(null)
//     const [user, setUser] = useState<UserInterface | null>(null)
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [isAdmin, setIsAdmin] = useState<boolean>(false)

//     useEffect(() => {
//         const token = localStorage.getItem("token")

//         if(token) {
//             setToken(token)
//             setIsAuthenticated(true)
//         } else {
//             setToken(null)
//             setIsAuthenticated(false)
//         }

//         setIsLoading(false);
//     }, [])

//     if(isLoading) return <Loading/>

//     const getIdUser = (token: string) => {
//         try {
//             const payload = JSON.parse(atob(token.split(".")[1]));
//             return payload.userId;
//         } catch (error) {
//             console.error("Error al obtener el userId desde el token:", error);
//             return null;
//         }
//     };

//     interface ResponseInterface {
//         token: string
//         message: string
//     }

//     interface TokenInterface {
//         email: string
//         exp: number
//         iat: number
//         role: string
//         userId: string
//     }

//     const login = async (loginForm: LoginInterface) => {  
//         const { data } = await axios.post<ResponseInterface>(`${API_BACK}/auth/signin`, loginForm)

//         setToken(data.token)
//         setIsAuthenticated(true)
//         localStorage.setItem("token", data.token) 
//     }
    

//     const signup = async(signupForm: SignupInterface) => {
//         await axios.post(`${API_BACK}/auth/signup`, signupForm)
//     }

//     const logout = async () => {
//         localStorage.removeItem("token")
//         setIsAuthenticated(false)
//         setToken(null)
//     }

//     const value = {
//         user,
//         login,
//         signup,
//         logout,
//         isAuthenticated,
//         isAdmin,
//         isLoading,
//         token,
//         getIdUser
//     }

//    return (
//     <AuthContext.Provider value={value}>
//         {children}
//     </AuthContext.Provider>
//    )
        
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     // chequeo si puedo usar el useContext en esa parte de la aplicacion
//     if(!context) throw new Error("useAuth must be used  within an AuthProvider")
//     return context
// }

// "use client";

// import React, { useState, useContext, createContext, useEffect } from "react";
// import { LoginInterface } from "../interfaces/Login.interface";
// import Loading from "@/app/loading";
// import { SignupInterface, UserInterface } from "../interfaces/Signup.interface";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface AuthContextInterface {
//     user: UserInterface | null;
//     login: (loginForm: LoginInterface) => Promise<void>;
//     signup: (signupForm: SignupInterface) => Promise<void>;
//     logout: () => void;
//     isAuthenticated: boolean;
//     isAdmin: boolean;
//     token: string | null;
//     isLoading: boolean;
//     getIdUser: (token: string) => string | null;
// }

// const AuthContext = createContext<AuthContextInterface | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [token, setToken] = useState<string | null>(null);
//     const [user, setUser] = useState<UserInterface | null>(null);
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [isAdmin, setIsAdmin] = useState<boolean>(false);

//     // Obtener el userId del token
//     const getIdUser = (token: string): string | null => {
//         try {
//             const payload = JSON.parse(atob(token.split(".")[1]));
//             return payload?.userId || null;
//         } catch (error) {
//             console.error("Error al obtener el userId desde el token:", error);
//             return null;
//         }
//     };

//     // Efecto para verificar si hay un token guardado
//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");

//         if (storedToken) {
//             try {
//                 const payload = JSON.parse(atob(storedToken.split(".")[1]));
//                 const isExpired = payload.exp * 1000 < Date.now();

//                 if (isExpired) {
//                     logout();
//                 } else {
//                     setToken(storedToken);
//                     setIsAuthenticated(true);
//                     setUser({ id: payload.userId, email: payload.email });
//                     setIsAdmin(payload.role === "admin");
//                 }
//             } catch (error) {
//                 console.error("Error al decodificar el token:", error);
//                 logout();
//             }
//         } else {
//             setIsAuthenticated(false);
//             setToken(null);
//             setUser(null);
//         }

//         setIsLoading(false);
//     }, []);

//     // Actualiza la navbar cuando el usuario cambia
//     useEffect(() => {
//         // Aquí podrías agregar un estado global o evento para notificar a la Navbar
//     }, [isAuthenticated]);

//     if (isLoading) return <Loading />;

//     // Interfaces de respuesta del backend
//     interface ResponseInterface {
//         token: string;
//         message: string;
//     }

//     interface TokenInterface {
//         email: string;
//         exp: number;
//         iat: number;
//         role: string;
//         userId: string;
//     }

//     // Función para iniciar sesión
//     const login = async (loginForm: LoginInterface): Promise<void> => {
//         try {
//             const { data } = await axios.post<ResponseInterface>(`${API_BACK}/auth/signin`, loginForm);

//             localStorage.setItem("token", data.token);
//             setToken(data.token);
//             setIsAuthenticated(true);

//             const payload: TokenInterface = JSON.parse(atob(data.token.split(".")[1]));
//             setUser({ id: payload.userId, email: payload.email });
//             setIsAdmin(payload.role === "admin");
//         } catch (error) {
//             console.error("Error en login:", error);
//             setIsAuthenticated(false);
//             setToken(null);
//             setUser(null);
//         }
//     };

   
    

//     // Función para registrarse
//     const signup = async (signupForm: SignupInterface): Promise<void> => {
//         try {
//             await axios.post(`${API_BACK}/auth/signup`, signupForm);
//         } catch (error) {
//             console.error("Error en signup:", error);
//         }
//     };

//     // Función para cerrar sesión
//     const logout = (): void => {
//         localStorage.removeItem("token");
//         setIsAuthenticated(false);
//         setToken(null);
//         setUser(null);
//         setIsAdmin(false);
//     };

//     const value = {
//         user,
//         login,
//         signup,
//         logout,
//         isAuthenticated,
//         isAdmin,
//         isLoading,
//         token,
//         getIdUser
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Hook personalizado para acceder al contexto
// export const useAuth = (): AuthContextInterface => {
//     const context = useContext(AuthContext);
//     if (!context) throw new Error("useAuth must be used within an AuthProvider");
//     return context;
// };



"use client";

import React, { useState, useContext, createContext, useEffect } from "react";
import { LoginInterface } from "../interfaces/Login.interface";
import { SignupInterface, UserInterface } from "../interfaces/Signup.interface";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface AuthContextInterface {
    user: UserInterface | null;
    login: (loginForm: LoginInterface) => Promise<void>;
    signup: (signForm: SignupInterface) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    token: string | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            const userData = decodeToken(storedToken);
            if (userData) {
                setUser(userData);
                setIsAdmin(userData.role === "admin");
            }
        } else {
            setToken(null);
            setIsAuthenticated(false);
            setUser(null);
        }

        setIsLoading(false);
    }, []);

    const decodeToken = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload as UserInterface;
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };

    const login = async (loginForm: LoginInterface) => {
        try {
            const { data } = await axios.post<{ token: string }>(`${API_BACK}/auth/signin`, loginForm);
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setIsAuthenticated(true);
            const userData = decodeToken(data.token);
            if (userData) {
                setUser(userData);
                setIsAdmin(userData.role === "admin");
            }
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    const signup = async (signupForm: SignupInterface) => {
        await axios.post(`${API_BACK}/auth/signup`, signupForm);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isAdmin, isLoading, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
