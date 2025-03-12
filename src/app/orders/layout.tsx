import ProtectedRoute from "@/shared/helpers/ProtectedRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Mis compras'
}

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <ProtectedRoute>

            {children}

        </ProtectedRoute>
    );
}