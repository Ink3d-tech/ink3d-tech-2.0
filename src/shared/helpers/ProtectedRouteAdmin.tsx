"use client";

import { useAuth } from "@/app/(auth)/shared/context/Auth.context";
import { AuthRequiredComponent } from "./AuthRequiredComponent";

const ProtectedRouteAdmin = ({ children, title }: { children: React.ReactNode; title?: string }) => {
    const { isAdmin } = useAuth();
    return !isAdmin ? <AuthRequiredComponent title={title || "Solo personal autorizado"} /> : children
};

export default ProtectedRouteAdmin;