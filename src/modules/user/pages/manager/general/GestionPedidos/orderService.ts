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
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}


export interface OrderResponse {
  id: string;
  status: string;
  totalPrice: string;   
  currency: string;
  createdAt: string;
  updatedAt: string;
  orderDetails: OrderDetail[];
  discountCode: string | null;
  externalReference: string;
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
