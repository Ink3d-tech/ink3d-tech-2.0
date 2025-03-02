// import axios from "axios";
// import { ICartProduct, IOrder, IPaymentResponse } from "../interfaces/cartService.interface"; 
// import { API_BACK } from "@/shared/config/api/getEnv";

// // Servicio para confirmar la orden
// export const confirmOrderService = async (
//     userBuyer: string,
//     confirmedCart: ICartProduct[],
//     token: string | null
// ): Promise<{ orderId: string, currency: string, products: { id: string, price: number, quantity: number }[] }> => {
//     try {

//         console.log(`id del USER ${userBuyer}`);
        

//         const body = {
//             userId: userBuyer,
//             products: confirmedCart.map(({ id, units }) => ({
//                 id,
//                 quantity: units,
//             })),
//         };

//         // console.log("Body de la request order:", JSON.stringify(body, null, 2));
        

//         const { data } = await axios.post<IOrder>(`${API_BACK}/orders`, body, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         const orderDetails = data.orderDetails.map((product) => ({
//             id: product.productId,
//             price: product.priceAtPurchase,
//             quantity: product.quantity,
//         }));

//         return {
//             orderId: data.id,
//             currency: data.currency,
//             products: orderDetails,
//         };
//     } catch (error) {
//         console.error("Error confirming order:", error);
//         throw error;
//     }
// };

// // Servicio para crear el pago
// export const paymentCreateService = async (
//     orderId: string,
//     currency: string,
//     confirmedCart: ICartProduct[],
//     token: string | null
// ): Promise<IPaymentResponse> => {
//     try {
//         const body = {
//             orderId,
//             currency,
//             products: confirmedCart.map(({ id, name, price, units }) => ({
//                 id,
//                 title: name,
//                 price,
//                 quantity: units,
//             })),
//         };


//         console.log("Body de la request MP:", JSON.stringify(body, null, 2));
//         console.log(`token ${token}`);
        

//         const { data } = await axios.post<IPaymentResponse>(
//             `${API_BACK}/payment-methods/create`,
//             body,
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             }
//         );

//         return data;
//     } catch (error: any) {
//         console.error("Error creando el pago MP:", error.response?.data || error);
//         throw error;
//     }
// };




import axios from "axios"; 
import { ICartProduct, IOrder, IPaymentResponse } from "../interfaces/cartService.interface";
import { API_BACK } from "@/shared/config/api/getEnv";

// Servicio para confirmar la orden
export const confirmOrderService = async (
    userBuyer: string,
    confirmedCart: ICartProduct[],
    token: string | null
): Promise<{ orderId: string, currency: string, products: { id: string, price: number, quantity: number }[] }> => {
    if (!token) {
        throw new Error("Token is required to confirm the order.");
    }

    try {
        const body = {
            userId: userBuyer,
            products: confirmedCart.map(({ id, units }) => ({
                id,
                quantity: units,
            })),
        };

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
    } catch {
        console.error("Error confirming order");
        throw new Error("An error occurred while confirming the order");
    }
};

// Servicio para crear el pago
export const paymentCreateService = async (
    orderId: string,
    currency: string,
    confirmedCart: ICartProduct[],
    token: string | null
): Promise<IPaymentResponse> => {
    if (!token) {
        throw new Error("Token is required to create the payment.");
    }

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
    } catch {
        console.error("Error creating payment MP");
        throw new Error("An error occurred while creating the payment");
    }
};
