"use client"
// import { API_BACK } from "@/shared/config/api/getEnv"
// import { useAuth } from "@/modules/auth/shared/context/Auth.context"
import { ButtonBase } from "./ButtonBase.component"
import { Fire, getAlert } from "./FireAlert.component"
import { useCart } from "../context/Cart.context"
import { confirmOrderService } from "../services/cart.services"
import { useEffect, useState } from "react"
import { useAuth } from "@/modules/auth/shared/context/Auth.context"
import { Product } from "../interfaces/Cart.interface"

export default function CartSummary () {
    // const { token, user } = useAuth()
    // const router = useRouter()

    // const totalPrice = products.reduce((total, product) => total + product.price, 0)


    const handlerEmptyCart = () => {
        getAlert("Clear cart", () => {
            emptyCart()
            Fire("Deleted!")
            
        })
    }

        const { products, emptyCart } = useCart();
        const [productsOnCart, setProductsOnCart] = useState<Product[]>([]);
        const [totalPrice, setTotalPrice] = useState<number>(0);
        const { getIdUser, token } = useAuth();
        
        useEffect(() => {
            const localCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]")
            if (localCart) {
                let calcTotal = 0;
                localCart?.map((product) => {
                    calcTotal = calcTotal + product.price*product.units;
                })
                setProductsOnCart(localCart);
                setTotalPrice(calcTotal);
            }
        }, []);
    
    
        const handleConfirmPurchase = async () => {
            try {
                const tokenStorage = localStorage.getItem("token") || "";
                const userBuyer = getIdUser(tokenStorage) || "";
                const confirmedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");   
        
                await confirmOrderService(userBuyer, confirmedCart, token);
                console.log("Compra confirmada");
            } catch (error) {
                console.error("Error al confirmar la compra:", error);
            }
        };

    
    return (
        <div className="bg-white rounded-lg shadow-gray-300 shadow-md h-auto sticky top-8 right-0 p-4">
            <h2 className="text-lg font-semibold">Resumen de compras</h2>
            <hr className="my-2"/>
            <div className="flex justify-between mb-2">
                <span className="font-medium">Productos:</span>
                <span>{products.length}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-xl">${totalPrice}</span>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <ButtonBase name="Clear cart" onClick={handlerEmptyCart} />
                <ButtonBase name="Checkout" onClick={handleConfirmPurchase} />
            </div>
        </div>
    )
}