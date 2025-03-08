"use client";

import Link from "next/link";
import { useAuth } from "../../../auth/shared/context/Auth.context";
import OrderCard from "./components/CardOrder.component";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";

export default function OrdersView() {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const [updatedOrders, setUpdatedOrders] = useState<IOrder[]>(user?.orders || []);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const externalReference = urlParams.get('external_reference');
    if (externalReference) {
      console.log('==================/ PASAMOS EL CONDICIONAL /==================');
      console.log("ENTRAMOS A USE EFFECT DE externalReference");
      console.log('====================================');
      const fetchPaymentStatus = async () => {
        setLoading(true);
        try {
          console.log('====================================');
          console.log("ENTRAMOS POR EL TRY con externalReference", externalReference);
          console.log('====================================');

          const response = await axios.get<{ status: string }>(`${API_BACK}/payment-methods/status/${externalReference}`);
          const status = response.data.status;

          console.log('================/ STATUS /====================');
          console.log('STATUS con payment: ', status);
          console.log('====================================');

          if (status === "approved") {
            const updatedOrders = user?.orders.map(order =>
              order.status === externalReference ? { ...order, status: "complete" } : order
            );
            setUpdatedOrders(updatedOrders || []);
          } else {
            console.log("El pago no fue aprobado");
          }

        } catch (error) {
          console.error("Error al obtener el estado del pago", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPaymentStatus();
    }
  }, [user]);

  const pendingOrders = updatedOrders.filter(order => order.status === "pending") || [];
  const completedOrders = updatedOrders.filter(order => order.status === "complete") || [];
  const cancelledOrders = updatedOrders.filter(order => order.status === "cancelled") || [];
  return (
    <div className="bg-[#ECE7E7] mx-auto p-4 h-[100%] text-gray-900">
      <div className="mx-auto w-full md:w-4/5 lg:w-3/5">
        <div className="bg-gray-100 p-4 shadow rounded-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Mis compras</h2>

          {!updatedOrders.length ? (
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
          </div>
        </div>
  );
}
