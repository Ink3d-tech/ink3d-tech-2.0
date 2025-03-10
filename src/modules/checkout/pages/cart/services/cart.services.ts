import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { ICartProduct, IDiscountReponse, IOrder, IPaymentResponse } from "../interfaces/cartService.interface"; 
import { CustomError } from "@/modules/auth/shared/helpers/customError";

// Servicio para confirmar la orden
export const confirmOrderService = async (
    userBuyer: string,
    confirmedCart: ICartProduct[],
    token: string | null,
    discountCode: string | null
): Promise<{ orderId: string, currency: string, products: { id: string, price: number, quantity: number }[] }> => {
    try {

        console.log(`id del USER ${userBuyer}`);        

        const body = {
            userId: userBuyer,
            discountCode,
            products: confirmedCart.map(({ id, units }) => ({
                id,
                quantity: units,
            })),
        };

        // console.log("Body de la request order:", JSON.stringify(body, null, 2));
        // console.log(`token del order ${token}`);
        

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
    token: string | null,
    discountAmount: number
): Promise<IPaymentResponse> => {
    
    if (!orderId || !currency) throw new Error("Faltan datos obligatorios para procesar el pago.");
    if (!confirmedCart.length) throw new Error("El carrito está vacío.");
    if (!token) throw new Error("Token de autenticación no proporcionado.");


    try {
        const body = {
            orderId,
            currency,
            products: confirmedCart.map(({ id, name, price, units }) => ({
                id,
                title: name,
                price: Math.trunc(price - (price * discountAmount) / 100) * units,
                quantity: units,
            })),
        };


        console.log("Body de la request MP:", JSON.stringify(body, null, 2));
        // console.log(`token ${token}`);

        const { data } = await axios.post<IPaymentResponse>(
            `${API_BACK}/payment-methods/create`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    } catch (error) {
        const errorMessage = error instanceof CustomError ? error.message : "Error interno del servidor" 
        console.error("Error creando el pago MP:", errorMessage);
        throw error;
    }
};

export const validateDiscount = async (discountCode: string, token: string) => {
    try {
        const { data } = await axios.get<IDiscountReponse>(`${API_BACK}/discounts/${discountCode}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    } catch (error) {
        console.error("Error validando el descuento:", error);

        // En lugar de lanzar el error, devolvemos un objeto con status "invalid"
        return { status: "invalid", amount: 0 };
    }
};
