// "use client";

// import React, { useState, useContext, createContext, useEffect } from "react";
// import { LoginInterface } from "../interfaces/Login.interface";
// import Loading from "@/app/loading";
// import { SignupInterface } from "../interfaces/Signup.interface";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface AuthContextInterface {
//     user: string | null
//     login: (loginForm: LoginInterface) => void
//     signup: (signForm: SignupInterface) => void
//     logout: () => void
//     isAuthenticated: boolean
//     // isAdmin: boolean
//     token: string
//     isLoading: boolean
//     getIdUser: (token: string) => string
// }

// const AuthContext = createContext<AuthContextInterface>({
//     login: () => {},
//     logout: () => {},
//     signup: () => {},
//     isAuthenticated: false,
//     // isAdmin: false,
//     isLoading: true,
//     token: "",
//     getIdUser: () => ""
// })

// export const AuthProvider = ({children}: {children: React.ReactNode}) => {
//     const [token, setToken] = useState<string>("")
//     const [user, setUser] = useState<string | null>("")
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     // const [isAdmin, setIsAdmin] = useState<boolean>(false)

//     useEffect(() => {
//         const user = localStorage.getItem("user")
//         const token = localStorage.getItem("token")

//         if(user && token) {
//             setUser(JSON.parse(user))
//             setToken(token)
//             setIsAuthenticated(true)
//         } else {
//             setUser(null)
//             setToken("")
//             setIsAuthenticated(false)
//         }

//         setIsLoading(false);
//     }, []);

//     const decodeToken = (token: string) => {
//         try {
//             const payload = JSON.parse(atob(token.split(".")[1]));
//             return payload as UserInterface;
//         } catch (error) {
//             console.error("Error al decodificar el token:", error);
//             return null;
//         }
//     };

//     interface ResponseInterface {
//         token: string
//         message: string
//     }

//     // interface TokenInterface {
//     //     email: string
//     //     exp: number
//     //     iat: number
//     //     role: string
//     //     userId: string
//     // }

//     const login = async (loginForm: LoginInterface) => {  
//         const { data } = await axios.post<ResponseInterface>(`${API_BACK}/auth/signin`, loginForm)

//         setUser(getIdUser(data.token))
//         setToken(data.token)
//         setIsAuthenticated(true)
//         localStorage.setItem("token", data.token) 
//     }
    

//     const signup = async(signupForm: SignupInterface) => {
//         await axios.post(`${API_BACK}/auth/signup`, signupForm)
//     }

//     const logout = async () => {
//         localStorage.removeItem("token");
//         // nacho --Agrego para que se elimine el carrito
//         localStorage.removeItem("cart")
//         setIsAuthenticated(false)
//         setToken("")
//     }

//     const value = {
//         login,
//         signup,
//         logout,
//         isAuthenticated,
//         // isAdmin,
//         isLoading,
//         token,
//         getIdUser
//     }

//     return (
//         <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isAdmin, isLoading, token }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) throw new Error("useAuth must be used within an AuthProvider");
//     return context;
// };


"use client";

import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
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
    token: string ;
    isLoading: boolean;
    getIdUser: (token: string) => string | null; 
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const resetAuthState = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    }, []);

    const decodeToken = (token: string): UserInterface | null => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload as UserInterface;
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return null;
        }
    };

    const handleAuthentication = useCallback((token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);

        const userData = decodeToken(token);
        if (userData) {
            setUser(userData);
            setIsAdmin(userData.role === "admin");
        } else {
            resetAuthState();
        }
    }, [resetAuthState]);

    useEffect(() => {
        const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (storedToken) {
            handleAuthentication(storedToken);
        } else {
            resetAuthState();
        }

        setIsLoading(false);
    }, [handleAuthentication, resetAuthState]);

    const login = async (loginForm: LoginInterface) => {
        try {
            const { data } = await axios.post<{ token: string }>(`${API_BACK}/auth/signin`, loginForm);
            handleAuthentication(data.token);
        } catch (error) {
            console.error("Error en login:", error);
            resetAuthState();
        }
    };

    const signup = async (signupForm: SignupInterface) => {
        try {
            await axios.post(`${API_BACK}/auth/signup`, signupForm);
        } catch (error) {
            console.error("Error en signup:", error);
        }
    };

    const logout = () => {
        resetAuthState();
    };

    // Agregar la función getIdUser
    const getIdUser = (token: string): string | null => {
        const userData = decodeToken(token);
        return userData ? userData.id : null;  
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isAdmin, isLoading, token, getIdUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};



// "use client";

// import React, { useState, useContext, createContext, useEffect, useCallback } from "react";
// import { LoginInterface } from "../interfaces/Login.interface";
// import { SignupInterface, UserInterface } from "../interfaces/Signup.interface";
// import axios from "axios";
// import { API_BACK } from "@/shared/config/api/getEnv";

// interface AuthContextInterface {
//     user: UserInterface | null;
//     login: (loginForm: LoginInterface) => Promise<void>;
//     signup: (signForm: SignupInterface) => Promise<void>;
//     logout: () => void;
//     isAuthenticated: boolean;
//     isAdmin: boolean;
//     token: string; // Cambiado de string | null a string
//     isLoading: boolean;
//     getIdUser: (token: string) => string | null; // Función para obtener el ID del usuario
// }

// const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     // Cambié el estado de token a string en lugar de string | null
//     const [token, setToken] = useState<string>(""); // Iniciar con una cadena vacía
//     const [user, setUser] = useState<UserInterface | null>(null);
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//     const [isAdmin, setIsAdmin] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     const resetAuthState = useCallback(() => {
//         localStorage.removeItem("token");
//         setToken(""); // Limpiar el token con una cadena vacía
//         setUser(null);
//         setIsAuthenticated(false);
//         setIsAdmin(false);
//     }, []);

//     const decodeToken = (token: string): UserInterface | null => {
//         try {
//             const payload = JSON.parse(atob(token.split(".")[1]));
//             return payload as UserInterface;
//         } catch (error) {
//             console.error("Error al decodificar el token:", error);
//             return null;
//         }
//     };

//     const handleAuthentication = useCallback((token: string) => {
//         localStorage.setItem("token", token);
//         setToken(token);
//         setIsAuthenticated(true);

//         const userData = decodeToken(token);
//         if (userData) {
//             setUser(userData);
//             setIsAdmin(userData.role === "admin");
//         } else {
//             resetAuthState();
//         }
//     }, [resetAuthState]);

//     useEffect(() => {
//         const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : "";

//         if (storedToken) {
//             handleAuthentication(storedToken);
//         } else {
//             resetAuthState();
//         }

//         setIsLoading(false);
//     }, [handleAuthentication, resetAuthState]);

//     const login = async (loginForm: LoginInterface) => {
//         try {
//             const { data } = await axios.post<{ token: string }>(`${API_BACK}/auth/signin`, loginForm);
//             handleAuthentication(data.token);
//         } catch (error) {
//             console.error("Error en login:", error);
//             resetAuthState();
//         }
//     };

//     const signup = async (signupForm: SignupInterface) => {
//         try {
//             await axios.post(`${API_BACK}/auth/signup`, signupForm);
//         } catch (error) {
//             console.error("Error en signup:", error);
//         }
//     };

//     const logout = () => {
//         resetAuthState();
//     };

//     // La función getIdUser ahora espera un token no nulo
//     const getIdUser = (token: string): string | null => {
//         const userData = decodeToken(token);
//         return userData ? userData.id : null;  // Retorna el ID del usuario
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isAdmin, isLoading, token, getIdUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) throw new Error("useAuth must be used within an AuthProvider");
//     return context;
// };
