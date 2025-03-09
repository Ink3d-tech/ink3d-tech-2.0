"use client";

import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { IOrder } from "@/modules/checkout/pages/cart/interfaces/cartService.interface";
import { API_BACK } from "@/shared/config/api/getEnv";
import { useEffect } from "react";
import OrderCard from "./components/CardOrder.component";
import Link from "next/link";
import axios from "axios";



export default function OrdersView() {
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

  const pendingOrders = user.orders.filter(order => order.status === "pending") || []
  const completedOrders = user.orders.filter(order => order.status === "completed") || [];
  const cancelledOrders = user.orders.filter(order => order.status === "failed") || [];



  return (
    <div className="bg-[#ECE7E7] mx-auto p-4 h-[100%] text-gray-900">
      <div className="mx-auto w-full md:w-4/5 lg:w-3/5">
        <div className="bg-gray-100 p-4 shadow rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Mis compras</h2>

          {user.orders.length === 0 ? (
            <div>
              Aún no tienes ningún pedido.
              <Link href={"/home"} className="text-blue-500 no-underline"> Haga clic aquí para comprar</Link>.
            </div>
            ) : (
            <div className="transition-opacity duration-500">
              {completedOrders.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-green-600 mt-4">Órdenes Completadas</h3>
                  {completedOrders.map(order => <OrderCard key={order.id} order={order} />)}
                </>
              )}

              {pendingOrders.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-yellow-600 mt-4">Órdenes Pendientes</h3>
                  {pendingOrders.map(order => <OrderCard key={order.id} order={order} />)}
                </>
              )}


              {cancelledOrders.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-red-600 mt-4">Órdenes Canceladas</h3>
                  {cancelledOrders.map(order => <OrderCard key={order.id} order={order} />)}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}