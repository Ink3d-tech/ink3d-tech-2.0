"use client"

import { ButtonBase } from "./ButtonBase.component"
import { Fire, getAlert } from "./FireAlert.component"
import { useCart } from "../context/Cart.context"
import { confirmOrderService, paymentCreateService, validateDiscount } from "../services/cart.services"
import { useAuth } from "@/modules/auth/shared/context/Auth.context"
import { ICartProduct, IDiscountReponse } from "../interfaces/cartService.interface"
// import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2";

export default function CartSummary() {
    const { products, emptyCart, countProducts } = useCart();
    const { getIdUser, token } = useAuth();
    // const router = useRouter();
    
    const [showDiscountInput, setShowDiscountInput] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [validDiscount, setValidDiscount] = useState("");
    
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
            const response = await paymentCreateService(orderId, "ARS", confirmedCart, token);
            const link = Object.values(response)[0];
            window.location.href = link;
        } catch (error) {
            console.error("Error al confirmar la compra en cart.tsx:", error);
        }
    };

    const handleAcceptDiscount = async () => {

        const fetchDiscount = await validateDiscount(discountCode, token);
        
        if(fetchDiscount?.status) {
            Swal.fire({
                title: "Código ingresado!",
                text: `Código aplicado: ${discountCode}`,
                icon: "success",
                confirmButtonText: "OK"
            })

            const discountAmount = fetchDiscount.amount;
            setValidDiscount(discountCode)
            setDiscountPrice(totalPrice - totalPrice * discountAmount/100)
            setShowDiscountInput(!showDiscountInput);
            
        } else {
            Swal.fire({
                title: "Código invalido",
                text: `Revisa que esté bien escrito`,
                icon: "error",
                confirmButtonText: "OK"
            })
            setValidDiscount("")
        } 
        console.log(`Descuento ingresado ${discountCode}`);       
        console.log(`Descuento validado ${validDiscount}`);
        console.log(`descuento descuento ${fetchDiscount.amount}`);
        
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
