"use client"

import { ButtonBase } from "./ButtonBase.component"
import { Fire, getAlert } from "./FireAlert.component"
import { useCart } from "../context/Cart.context"
import { confirmOrderService, paymentCreateService, validateDiscount } from "../services/cart.services"
import { useAuth } from "@/modules/auth/shared/context/Auth.context"
import { ICartProduct } from "../interfaces/cartService.interface"

import { useState } from "react"
import Swal from "sweetalert2";




export default function CartSummary() {
    const { products, emptyCart, countProducts } = useCart();
    const { getIdUser, token } = useAuth();
    
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [validDiscount, setValidDiscount] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    
    const totalPrice = products.reduce((total, product) => total + (Number(product.price) * product.units), 0);

    const [discountPrice, setDiscountPrice] = useState(totalPrice);

    const handlerEmptyCart = () => {
        getAlert("Clear cart", () => {
            emptyCart();
            Fire("Deleted!");
        });
    };

    const handleConfirmPurchase = async () => {
        try {
            const userBuyer = getIdUser(localStorage.getItem("token") || "");
            const confirmedCart: ICartProduct[] = JSON.parse(localStorage.getItem(`cart_${userBuyer}`) || "[]");
            const { orderId } = await confirmOrderService(userBuyer, confirmedCart, token, validDiscount);
            const response = await paymentCreateService(orderId, "ARS", confirmedCart, token, discountAmount);
            const link = Object.values(response)[0];
            window.location.href = link;

            emptyCart();
        } catch (error) {
            console.error("Error al confirmar la compra en cart.tsx:", error);
        }
    };

    const handleAcceptDiscount = async () => {
        try {
            const fetchDiscount = await validateDiscount(discountCode, token);
    
            if (fetchDiscount?.status === "active") {
                const discountAmount = fetchDiscount.amount;
                Swal.fire({
                    title: "Código ingresado!",
                    text: `Descuento aplicado: ${discountAmount}%`,
                    icon: "success",
                    confirmButtonText: "OK",
                });
    
                
                setValidDiscount(discountCode);
                setDiscountPrice(totalPrice - (totalPrice * discountAmount) / 100);
                setShowDiscountInput(!showDiscountInput);
                setDiscountAmount(discountAmount);
                
            } else if (fetchDiscount?.status === "used") {
                Swal.fire({
                    title: "Código usado",
                    text: "Los códigos de descuento son de uso único",
                    icon: "error",
                    confirmButtonText: "OK",
                });

                setValidDiscount("");

            } else if (fetchDiscount?.status === "expired") {
                Swal.fire({
                    title: "Código expirado",
                    text: "Este código ha expirado",
                    icon: "error",
                    confirmButtonText: "OK",
                });

                setValidDiscount("");
                
            } else if (fetchDiscount?.status === "invalid") {
                Swal.fire({
                    title: "Código inválido",
                    text: "Revisa que esté bien escrito",
                    icon: "error",
                    confirmButtonText: "OK",
                });
    
                setValidDiscount("");
            }
        } catch (error) {
            console.error("Error inesperado:", error);
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
            <div className="mb-2">
                <span 
                    className="font-medium text-sm text-blue-400 cursor-pointer" 
                    onClick={() => setShowDiscountInput(!showDiscountInput)}
                >
                    Ingresar un código de descuento
                </span>
                {showDiscountInput && (
                    <div className="mt-2 flex gap-2">
                        <input 
                            type="text" 
                            className="border p-1 rounded w-full" 
                            placeholder="Código de descuento"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button 
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={handleAcceptDiscount}
                        >
                            Aceptar
                        </button>
                    </div>
                )}
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
            { validDiscount ?
                <div className="flex justify-between">
                <span className="font-medium">Total con descuento:</span>
                <span className="font-bold text-xl">${discountPrice.toFixed(2)}</span>
            </div>: null}
            <div className="flex justify-end gap-4 mt-4">
                <ButtonBase name="Vaciar" onClick={handlerEmptyCart} />
                <ButtonBase name="Continuar" onClick={handleConfirmPurchase} />
            </div>
        </div>
    );
}
