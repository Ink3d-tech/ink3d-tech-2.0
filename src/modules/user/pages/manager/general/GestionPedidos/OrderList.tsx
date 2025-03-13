// import React, { useState, useEffect } from 'react';
// import { fetchOrders, OrderResponse } from './orderService';
// import OrderItem from './OrderItem';
// import SkeletonOrdersList from './OrderSkeleton';

// export default function OrderList() {
//   const [orders, setOrders] = useState<OrderResponse[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('No se ha encontrado el token de autenticación.');
//       setLoading(false);
//       return;
//     }

//     const getOrders = async () => {
//       try {
//         const data = await fetchOrders(token);
//         setOrders(data);
//         setLoading(false);
//       } catch {
//         setError("Hubo un error al obtener las órdenes.");
//         setLoading(false);
//       }
//     };

//     getOrders();
//   }, []);

//   if (loading) return <SkeletonOrdersList/>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Lista de Órdenes</h1>
//       <ul className="space-y-4">
//         {orders.map((order) => (
//           <OrderItem key={order.id} order={order} />
//         ))}
//       </ul>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { fetchOrders, OrderResponse } from './orderService';
import OrderItem from './OrderItem';
import SkeletonOrdersList from './OrderSkeleton';



export default function OrderList() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No se ha encontrado el token de autenticación.');
      setLoading(false);
      return;
    }

    const getOrders = async () => {
      try {
        const data = await fetchOrders(token);
        // Filtra las órdenes que no están eliminadas
        const filteredOrders = data.filter(order => order.status !== 'deleted');
        setOrders(filteredOrders);
        setLoading(false);
      } catch {
        setError("Hubo un error al obtener las órdenes.");
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  if (loading) return <SkeletonOrdersList />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Órdenes</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}
