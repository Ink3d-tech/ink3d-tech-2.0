"use client"

import { ButtonBase } from "./ButtonBase.component"
import { Fire, getAlert } from "./FireAlert.component"
import { useCart } from "../context/Cart.context"
import { confirmOrderService, paymentCreateService } from "../services/cart.services"
import { useAuth } from "@/modules/auth/shared/context/Auth.context"
import { ICartProduct } from "../interfaces/cartService.interface"



export default function CartSummary() {
    const handlerEmptyCart = () => {
        getAlert("Clear cart", () => {
            emptyCart()
            Fire("Deleted!")

        })
    }

    const { products, emptyCart, countProducts } = useCart();
    const { getIdUser, token } = useAuth();

    const totalPrice = products.reduce((total, product) => total + (Number(product.price) * product.units), 0)

    const handleConfirmPurchase = async () => {
        try {
            const userBuyer = getIdUser(localStorage.getItem("token") || "");
            const confirmedCart: ICartProduct[] = JSON.parse(localStorage.getItem(`cart_${userBuyer}`) || "[]");
            const { orderId, currency, products } = await confirmOrderService(userBuyer, confirmedCart, token);
            // Ahora puedes usar los datos de orderId, currency, y products directamente
            console.log("Orden confirmada:", orderId, currency, confirmedCart);
     
            console.log(products);
        
            const response = await paymentCreateService(orderId, "ARS", confirmedCart, token)
        
            const link = Object.values(response)[0]

            window.location.href = link

        } catch (error) {
            console.error("Error al confirmar la compra en cart.tsx:", error);
        }
    }

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
                <ButtonBase name="Vaciar" onClick={handlerEmptyCart} />
                <ButtonBase name="Continuar" onClick={() => {
                    handleConfirmPurchase()
                }} />
            </div>
        </div>
    )
}