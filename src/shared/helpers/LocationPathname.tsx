"use client";

import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

interface PrivateRouteProps {
  redirectRoutes: string[];
  children: React.ReactNode;
}

export default function LocationPathname({
  redirectRoutes,
  children,
}: PrivateRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const handleAuthenticatedUser = useCallback(() => {
    const lastPath = localStorage.getItem("lastPath") || "/home";
    if (redirectRoutes.includes(pathname)) {
      if (lastPath !== pathname) {
        router.replace(lastPath); // Redirigir al último path guardado
      }
    } else {
      localStorage.setItem("lastPath", pathname); // Guardar el último path visitado
    }
  }, [pathname, redirectRoutes, router]);

  const handleUnauthenticatedUser = useCallback(() => {
    if (!redirectRoutes.includes(pathname)) {
      localStorage.setItem("lastPath", pathname); // Guardar dónde estaba antes de pedir login
    }
  }, [pathname, redirectRoutes]);

  useEffect(() => {
    if (!isAuthenticated) {
      handleUnauthenticatedUser();
    } else {
      handleAuthenticatedUser();
    }
  }, [isAuthenticated, handleAuthenticatedUser, handleUnauthenticatedUser]);

  return children;
}
