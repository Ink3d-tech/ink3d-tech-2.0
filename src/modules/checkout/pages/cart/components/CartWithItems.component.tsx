"use client"

import { useCart } from "../context/Cart.context"
import CartList from "./CartList.component"
import CartSummary from "./CartSummary.component"

export default function CartWithItems() {
    const { products } = useCart()

    return (
        <>
            <div className="w-full lg:w-[70%] min-h-[100px]" >
                <CartList products={products} />
            </div>

            <div className="w-full lg:w-[30%] sticky bottom-0">
                <CartSummary/>
            </div>
        </>
    )
}
