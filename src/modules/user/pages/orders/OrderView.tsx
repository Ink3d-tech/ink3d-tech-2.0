"use client";

import Link from "next/link";
import { useAuth } from "../../../auth/shared/context/Auth.context";
import OrderCard from "./components/CardOrder.component";


export default function Dashboard() {
  const { user } = useAuth()

  return (
        <div className="bg-[#ECE7E7] mx-auto p-4 h-[100%] text-gray-900">
          <div className="mx-auto w-full md:w-4/5 lg:w-3/5">
            <div className="bg-gray-100 p-4 shadow rounded-lg flex flex-col">
              <h2 className="text-xl font-semibold mb-2">Mis compras</h2>
              {user?.orders ? (
                <div className="transition-opacity duration-500">
                  { user?.orders.map(order => (<OrderCard key={order.id} order={order}/> )) }
                </div>
              ) : (
                <div>
                  Aún no tienes ningún pedido.
                  <Link href={"/home"} className="text-blue-500 underline">
                    Haga clic aquí para comprar
                  </Link>
                  .
                </div>
              )}
            </div>
          </div>
        </div>
  );
}