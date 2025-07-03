"use client";

import { isValidJwt, useAuth } from "@/modules/auth/shared/context/Auth.context";
import { AuthRequiredComponent } from "./AuthRequiredComponent";
import Loading from "@/app/loading";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading, token } = useAuth();
    if(isLoading) return <Loading/>
    
    if(!isAuthenticated || !isValidJwt(token)) {
        return <AuthRequiredComponent/>
    } else {
        return <>{children}</>
    }
};

export default ProtectedRoute;