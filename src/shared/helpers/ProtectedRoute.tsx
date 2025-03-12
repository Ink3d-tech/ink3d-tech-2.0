"use client";

import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { AuthRequiredComponent } from "./AuthRequiredComponent";
import Loading from "@/app/loading";

const ProtectedRoute = ({ children, skeleton }: { children: React.ReactNode; title?: string, skeleton?: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if(isLoading) return skeleton ?? <Loading/>

    return !isAuthenticated ? <AuthRequiredComponent/> : children
};

export default ProtectedRoute;