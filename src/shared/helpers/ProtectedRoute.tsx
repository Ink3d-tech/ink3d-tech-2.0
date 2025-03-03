"use client";

import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { AuthRequiredComponent } from "./AuthRequiredComponent";

const ProtectedRoute = ({ children, title }: { children: React.ReactNode; title?: string }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <AuthRequiredComponent title={title || "Por favor, inicie sesión para acceder a esta página"} /> : children
};

export default ProtectedRoute;