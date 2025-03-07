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

export interface OrderResponse {
  id: string;
  status: string;
  orderDetails: OrderDetail[];
  user: User;
}

export const fetchOrders = async (token: string): Promise<OrderResponse[]> => {
  try {
    const response = await axios.get<OrderResponse[]>(`${API_BACK}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch {
    throw new Error("Hubo un error al obtener las órdenes.");
  }
};
