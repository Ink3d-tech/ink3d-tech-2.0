"use client"

import Link from "next/link";
import OrderCard from "./components/CardOrder.component";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";

export default function OrdersView() {
  const { user } = useAuth();

  const pendingOrders = user?.orders?.filter(order => order.status === "pending") || [];
  const completedOrders = user?.orders?.filter(order => order.status === "complete") || [];
  const cancelledOrders = user?.orders?.filter(order => order.status === "cancelled") || [];
  return (
    <div className="bg-[#ECE7E7] mx-auto p-4 h-[100%] text-gray-900">
      <div className="mx-auto w-full md:w-4/5 lg:w-3/5">
        <div className="bg-gray-100 p-4 shadow rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Mis compras</h2>

          {!user?.orders?.length ? (
            <div>
              Aún no tienes ningún pedido.
              <Link href={"/home"} className="text-blue-500 underline"> Haga clic aquí para comprar</Link>.
            </div>
          ) : (
            <div className="transition-opacity duration-500">
              {pendingOrders.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-yellow-600 mt-4">Órdenes Pendientes</h3>
                  {pendingOrders.map(order => <OrderCard key={order.id} order={order} />)}
                </>
              )}

              {completedOrders.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-green-600 mt-4">Órdenes Completadas</h3>
                  {completedOrders.map(order => <OrderCard key={order.id} order={order} />)}
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