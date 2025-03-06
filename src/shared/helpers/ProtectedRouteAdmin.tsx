"use client";


import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { AuthRequiredComponent } from "./AuthRequiredComponent";

const ProtectedRouteAdmin = ({ children, title }: { children: React.ReactNode; title?: string }) => {
    const { isAdmin, getIsAdmin, token } = useAuth();
    return !getIsAdmin(token) ? <AuthRequiredComponent title={title || "Solo personal autorizado"} /> : children
};

export default ProtectedRouteAdmin;