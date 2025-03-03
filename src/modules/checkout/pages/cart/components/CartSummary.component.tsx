// "use client"

// import { ButtonBase } from "./ButtonBase.component"
// import { Fire, getAlert } from "./FireAlert.component"
// import { useCart } from "../context/Cart.context"
// import { confirmOrderService, paymentCreateService } from "../services/cart.services"
// import { useAuth } from "@/modules/auth/shared/context/Auth.context"
// import { Product } from "../context/Cart.context"
// import { ICartProduct } from "../interfaces/cartService.interface"

// export default function CartSummary() {
//     const handlerEmptyCart = () => {
//         getAlert("Clear cart", () => {
//             emptyCart()
//             Fire("Deleted!")

//         })
//     }

//     const { products, emptyCart, countProducts } = useCart();
//     const { getIdUser, token } = useAuth();

//     const totalPrice = products.reduce((total, product) => total + (Number(product.price) * product.units), 0)

//     const handleConfirmPurchase = async () => {
//         try {
//             const tokenValue = localStorage.getItem("token") ?? ""; 
//             const userBuyer = getIdUser(tokenValue);
//             const confirmedCart: ICartProduct[] = JSON.parse(localStorage.getItem(`cart_${userBuyer}`) || "[]");
//             const { orderId, currency, products } = await confirmOrderService(userBuyer, confirmedCart, token);
//             // Ahora puedes usar los datos de orderId, currency, y products directamente
//             console.log("Orden confirmada:", orderId, currency, confirmedCart);

//             const paymentResponse = await paymentCreateService(orderId, "ARS", confirmedCart, token)

//             console.log("Respuesta del pago:", paymentResponse);


//         } catch (error) {
//             console.error("Error al confirmar la compra en cart.tsx:", error);
//         }
//     }

//     return (
//         <div className="bg-white rounded-lg shadow-gray-300 shadow-md h-auto sticky top-8 right-0 p-4">
//             <h2 className="text-lg font-semibold">Resumen de compras</h2>
//             <hr className="my-2" />
//             <div className="flex justify-between mb-2">
//                 <span className="font-medium">Productos:</span>
//                 <span>{countProducts()}</span>
//             </div>
//             <div className="flex justify-between">
//                 <span className="font-medium">Total:</span>
//                 <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-end gap-4 mt-4">
//                 <ButtonBase name="Vaciar carrito" onClick={handlerEmptyCart} />
//                 <ButtonBase name="Continuar compra" onClick={handleConfirmPurchase} />
//             </div>
//         </div>
//     )
// }



"use client";

import { ButtonBase } from "./ButtonBase.component";
import { Fire, getAlert } from "./FireAlert.component";
import { useCart } from "../context/Cart.context";
import { confirmOrderService, paymentCreateService } from "../services/cart.services";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { ICartProduct } from "../interfaces/cartService.interface";

export default function CartSummary() {
    const { products, emptyCart, countProducts } = useCart();
    const { getIdUser} = useAuth();

    // Función para vaciar el carrito con alertas seguras
    const handlerEmptyCart = () => {
        getAlert("Clear cart", () => {
            emptyCart();
            Fire("Deleted!");
        });
    };

    // Calcula el precio total del carrito
    const totalPrice = products.reduce((total, product) => total + (Number(product.price) * product.units), 0);

    // Manejo seguro de la confirmación de compra
    const handleConfirmPurchase = async () => {
        try {
            const tokenValue: string | null = localStorage.getItem("token");
            if (!tokenValue) {
                throw new Error("Token no encontrado en localStorage.");
            }
    
            const userBuyer: string | null = getIdUser(tokenValue);
            if (!userBuyer) {
                throw new Error("Error al obtener el ID del usuario.");
            }
    
            // Convertimos los productos al formato ICartProduct[]
            const confirmedCart: ICartProduct[] = products.map(({ id, name, price, units }) => ({
                id,
                name, // Opcional
                price,
                units,
            }));
    
            if (confirmedCart.length === 0) {
                throw new Error("El carrito está vacío.");
            }
    
            // Confirmar orden con el servicio
            const { orderId, currency } = await confirmOrderService(userBuyer, confirmedCart, tokenValue);
            console.log("Orden confirmada:", orderId, currency, confirmedCart);
    
            // Procesar el pago
            const paymentResponse = await paymentCreateService(orderId, "ARS", confirmedCart, tokenValue);
            console.log("Respuesta del pago:", paymentResponse);
        } catch (error) {
            console.error("Error al confirmar la compra:", error);
        }
    };
    

    return (
        <div className="bg-white rounded-lg shadow-gray-300 shadow-md h-auto sticky top-8 right-0 p-4">
            <h2 className="text-lg font-semibold">Resumen de compras</h2>
            <hr className="my-2" />
            <div className="flex justify-between mb-2">
                <span className="font-medium">Productos:</span>
                <span>{countProducts()}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <ButtonBase name="Vaciar carrito" onClick={handlerEmptyCart} />
                <ButtonBase name="Continuar compra" onClick={handleConfirmPurchase} />
            </div>
        </div>
    );
}
