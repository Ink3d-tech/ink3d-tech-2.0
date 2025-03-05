import { OrderProvider } from "@/modules/orders/Orders.context";
import ProtectedRoute from "@/shared/helpers/ProtectedRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Mis compras'
}

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <ProtectedRoute title={"Hello! To view your dashboard, please log in to your account"}>
            <OrderProvider>  
                {children}
            </OrderProvider>
        </ProtectedRoute>
    );
}