"use client";


import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { AuthRequiredComponent } from "./AuthRequiredComponent";

const ProtectedRouteAdmin = ({ children }: { children: React.ReactNode }) => {
    const { getIsAdmin, token } = useAuth();
    return !getIsAdmin(token) ? <AuthRequiredComponent/> : children
};

export default ProtectedRouteAdmin;