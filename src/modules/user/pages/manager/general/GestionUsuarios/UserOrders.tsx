"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";

interface OrderDetail {
  price: string;
  quantity: number;
  productId: string;
}

interface User {
  id: string;
  name: string;
}

interface OrderResponse {
  id: string;
  status: string;
  orderDetails: OrderDetail[];
  user: User;
}

interface UserOrdersProps {
  userId: string;
}

export default function UserOrders({ userId }: UserOrdersProps) {
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

    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderResponse[]>(`${API_BACK}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const userOrders = response.data.filter(order => order.user.id === userId);
        
        setOrders(userOrders); 
        setLoading(false); 
      } catch {
        setError("Hubo un error al obtener las órdenes.");
        setLoading(false); 
      }
    };

    fetchOrders(); 
  }, [userId]); 

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Lista de Órdenes</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {orders.map((order) => (
          <li key={order.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <div>
              <h2 style={{ fontSize: '1.2em', marginBottom: '8px' }}>Orden ID: {order.id}</h2>
              <p><strong>Estado:</strong> {order.status}</p>
              <p><strong>Nombre del Usuario:</strong> {order.user.name}</p>

              <h3>Detalles de los productos:</h3>
              <ul style={{ paddingLeft: '20px' }}>
                {order.orderDetails.map((detail, index) => (
                  <li key={index}>
                    <p><strong>Producto ID:</strong> {detail.productId} - <strong>Cantidad:</strong> {detail.quantity}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
