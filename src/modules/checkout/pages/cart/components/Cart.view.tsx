"use client"

import { useCart } from "../context/Cart.context"
import CartWithItems from "./CartWithItems.component"
import EmptyCart from "./EmptyCart.component"
import CartSkeleton from "./SkeletonCart"

export default function CartView() {
    const { products, loading } = useCart()
    if(loading) return <CartSkeleton/>
    return  products.length > 0 ? <CartWithItems/> : <EmptyCart/>
}