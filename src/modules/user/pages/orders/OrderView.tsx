"use client";

import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { IOrder } from "@/modules/checkout/pages/cart/interfaces/cartService.interface";
import { API_BACK } from "@/shared/config/api/getEnv";
import { useEffect, useState } from "react";
import OrderCard from "./components/CardOrder.component";
import axios from "axios";
import OrderDetailsModal from "./components/CardOrderModal.component";



export default function OrdersView() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const externalReference = urlParams.get('external_reference');
    const statusMp = urlParams.get('status');
    

    if (externalReference) {
      const fetchPaymentStatus = async () => {
       
        try {
          const STATUS_MP = statusMp === "approved" ? "completed" : statusMp === "in_process" ? "pending" : statusMp === "rejected" ? "failed" : "pending";

          await axios.patch(`${API_BACK}/finance/transaction/${externalReference}`, { status: STATUS_MP });
          await axios.patch<IOrder>(`${API_BACK}/orders/${externalReference}/status`, { status: STATUS_MP })

        } catch (error) {
          console.error("Error al obtener el estado del pago", error);
        } 
      };

      fetchPaymentStatus();
    }
  }, [user?.orders]);


  if(user?.orders === undefined) return 

  const allOrders = user.orders || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Mis compras</h1>
          <p className="text-gray-600 mt-2">Seguimiento de tus compras de ropa urbana</p>
        </div>
        
        <div className="space-y-6">
          {allOrders.map(order => (
            <OrderCard key={order.id} order={order}  onViewDetails={setSelectedOrder}/>
          ))}
        </div>
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