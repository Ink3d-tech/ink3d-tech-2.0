"use client";


import { isValidJwt, useAuth } from "@/modules/auth/shared/context/Auth.context";
import { AuthRequiredComponent } from "./AuthRequiredComponent";

const ProtectedRouteAdmin = ({ children }: { children: React.ReactNode }) => {
    const { getIsAdmin, token } = useAuth();

    if (!token || !isValidJwt(token)) {
        // No token válido → muestra pantalla de acceso denegado o login
        return <AuthRequiredComponent />;
    }

    if(!getIsAdmin(token)) {
        return  <AuthRequiredComponent/>
    } else {
        return <>{children}</>
    }
};

export default ProtectedRouteAdmin;