import axios from "axios";
import { IProduct } from "../interfaces/Cart.interface";
import { API_BACK } from "@/shared/config/api/getEnv";


export const confirmOrderService = async (userBuyer: string, confirmedCart: IProduct[], token: string | null) => {
    try {
        const body = {
            userId: userBuyer,
            products: confirmedCart.map(({ id, units }) => ({
                id,
                quantity: units
            }))
        };
        const { data } = await axios.post(`${API_BACK}/orders`, body, 
            { 
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                }
            }
        );
        return data;
    } catch (error) {
        console.error("Error confirming order:", error);
        throw error;
    }
};

export const paymentCreate = async (orderId: string, currency: string, confirmedCart: { id: string; name: string; price: number }[], token: string) => {
    try {
        const body = {
            orderId,
            currency,
            products: confirmedCart.map(({ id, name, price }) => ({
                id,
                name,
                price
            }))
        };

        console.log("Enviando pago:", JSON.stringify(body, null, 2));
        console.log("Llamando a:", `${API_BACK}/payments`);

        const { data } = await axios.post(
            `${API_BACK}/payments`, 
            body,
            { 
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return data;
    } catch (error: any) {
        console.error("Error creando el pago:", error.response?.data || error);
        throw error;
    }
};