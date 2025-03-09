"use client"

import BackButton from "@/shared/components/buttons/BackButton.component";
import PersonalCard from "../components/ProfilCard.component";
import ProtectedRoute from "@/shared/helpers/ProtectedRoute";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";

export default function Details() {
    const { user } = useAuth()


    return (
        <ProtectedRoute>
            <div className="flex flex-col min-h-screen">
                <BackButton tab='Datos de la cuenta' />
                <div className="mt-4">
                    <PersonalCard field='Email' value={user?.email ?? "Sin asignar"} validated='Validado'/>
                    <PersonalCard field='Teléfono' value={user?.phone ?? "Sin asignar"} validated='Validado' />
                    <PersonalCard field='Nombre de usuario' value={user?.name.concat(user?.id) ?? "Sin asignar"} validated='Validado'/>
                </div>
            </div>
        </ProtectedRoute>
    )
}