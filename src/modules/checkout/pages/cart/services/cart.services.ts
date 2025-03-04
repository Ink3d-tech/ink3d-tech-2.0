import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { ICartProduct, IOrder, IPaymentResponse } from "../interfaces/cartService.interface"; 

// Servicio para confirmar la orden
export const confirmOrderService = async (
    userBuyer: string,
    confirmedCart: ICartProduct[],
    token: string | null
): Promise<{ orderId: string, currency: string, products: { id: string, price: number, quantity: number }[] }> => {
    try {
        const body = {
            userId: userBuyer,
            products: confirmedCart.map(({ id, units }) => ({
                id,
                quantity: units,
            })),
        };

        // console.log("Body de la request order:", JSON.stringify(body, null, 2));
        

        const { data } = await axios.post<IOrder>(`${API_BACK}/orders`, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const orderDetails = data.orderDetails.map((product) => ({
            id: product.productId,
            price: product.priceAtPurchase,
            quantity: product.quantity,
        }));

        return {
            orderId: data.id,
            currency: data.currency,
            products: orderDetails,
        };
    } catch (error) {
        console.error("Error confirming order:", error);
        throw error;
    }
};

// Servicio para crear el pago
export const paymentCreateService = async (
    orderId: string,
    currency: string,
    confirmedCart: ICartProduct[],
    token: string | null
): Promise<IPaymentResponse> => {
    try {
        const body = {
            orderId,
            currency,
            products: confirmedCart.map(({ id, name, price, units }) => ({
                id,
                title: name,
                price,
                quantity: units,
            })),
        };


        console.log("Body de la request MP:", JSON.stringify(body, null, 2));
        console.log(`token ${token}`);
        

        const { data } = await axios.post<IPaymentResponse>(
            `http://localhost:3000/payment-methods/create`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    } catch (error: any) {
        console.error("Error creando el pago MP:", error.response?.data || error);
        throw error;
    }
};
