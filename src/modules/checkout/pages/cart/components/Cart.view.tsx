"use client"

import { useCart } from "../context/Cart.context"
import CartWithItems from "./CartWithItems.component"
import EmptyCart from "./EmptyCart.component"

export default function CartView() {
    const { products } = useCart()
    return  products.length > 0 ? <CartWithItems/> : <EmptyCart/>
}