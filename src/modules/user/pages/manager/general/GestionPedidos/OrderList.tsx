import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BACK } from "@/shared/config/api/getEnv";

// Definimos los tipos para las respuestas de la API
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

export default function OrderList() {
  const [orders, setOrders] = useState<OrderResponse[]>([]); // Estado para almacenar las órdenes
  const [loading, setLoading] = useState<boolean>(true); // Estado para cargar datos
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    // Recuperamos el token desde localStorage
    const token = localStorage.getItem('token'); // Asegúrate de que el nombre es correcto

    if (!token) {
      setError('No se ha encontrado el token de autenticación.');
      setLoading(false);
      return;
    }

    // Función para obtener las órdenes
    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderResponse[]>(`${API_BACK}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data); // Guardamos las órdenes en el estado
        setLoading(false); // Dejamos de cargar los datos
      } catch (err) {
        setError("Hubo un error al obtener las órdenes.");
        setLoading(false); // Dejamos de cargar si hubo error
      }
    };

    fetchOrders(); // Llamamos la función para obtener los pedidos
  }, []); // No depende de cambios del token porque ya lo recuperamos una vez

  // Renderizado condicional según el estado de carga o error
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
              <p><strong>Nombre del Usuario:</strong> {order.user.name}</p> {/* Aquí cambiamos el id por name */}

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
