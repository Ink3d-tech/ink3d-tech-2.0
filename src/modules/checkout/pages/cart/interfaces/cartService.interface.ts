// cart.types.ts

export interface ICartProduct {
    id: string;
    name?: string; // Opcional porque `confirmOrderService` no lo usa
    price: number;
    units: number;
}

// Tipado de la orden devuelta por `confirmOrderService`
export interface IOrder {
    id: string;
    userId: string;
    status: string;
    totalPrice: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
    orderDetails: IOrderDetail[];
    externalReference?: string; // Puede ser `undefined`
}

// Tipado de los detalles de la orden
export interface IOrderDetail {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
}

// Tipado de la respuesta de `paymentCreate`
export interface IPaymentResponse {
    paymentUrl?: string; // URL a la que se redirige para el pago (si aplica)
    status: string;
    message?: string; // Mensaje en caso de error
}

export interface IDiscountReponse {
        id: string;
        amount: number; // Si `amount` debería ser un número, usa `number`
        isUsed: boolean;
        createdAt: string; // Puede convertirse en `Date` si lo parseas
        expiresAt?: string | null; // Puede ser `null`
        status: "active" | "expired" | "used"; // Tipado de posibles valores si son fijos
}