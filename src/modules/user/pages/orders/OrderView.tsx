"use client"

import { useEffect, useState } from "react";
import OrderCard from "./components/CardOrder.component";
import axios from "axios";
import OrderDetailsModal from "./components/CardOrderModal.component";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { IOrder } from "@/modules/checkout/pages/cart/interfaces/cartService.interface";
import { API_BACK } from "@/shared/config/api/getEnv";
import { ShoppingBasket, ArrowRight } from "lucide-react";


const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingBasket className="w-12 h-12 text-gray-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">No hay pedidos todavía</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Parece que aún no has realizado ninguna compra. Echa un vistazo a nuestros últimos lanzamientos y comienza a crear tu colección.
      </p>
      <button 
        onClick={() => window.location.href = '/products'}
        className="bg-black text-white px-8 py-3 rounded-xl font-semibold 
          hover:bg-gray-800 transform hover:scale-[1.02] transition-all duration-200
          flex items-center gap-2 shadow-lg hover:shadow-xl"
      >
        Explorar tienda
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};


export default function OrdersView() {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const externalReference = urlParams.get('external_reference');
    const paymentId = urlParams.get('payment_id');
    
    if (externalReference) {
      const fetchPaymentStatus = async () => {
        try {
          await axios.post(`${API_BACK}/payment-methods/webhook`, { paymentId });
        } catch (error) {
          console.error("Error al obtener el estado del pago", error);
        } 
      };
      fetchPaymentStatus();
    }
  }, [user?.orders]);

  if (!user?.orders) return null;

  const allOrders = user.orders || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Mis compras</h1>
          <p className="text-gray-600 mt-2">Seguimiento de tus compras de ropa urbana</p>
        </div>

        {allOrders.length === 0 ? (
          <EmptyState />
        ) :  (
          <div className="space-y-6">
            {allOrders.reverse().map(order => (
              <OrderCard key={order.id} order={order} onViewDetails={setSelectedOrder}/>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
}