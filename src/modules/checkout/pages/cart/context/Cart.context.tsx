"use client"

import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import React, { createContext, useContext, useEffect, useState } from "react"


export interface Product {
    id: string;
    name: string;
    price: number;
    size: string;
    stock: number;
    style: string;
    units: number;
    discount: number;
    isActive?: boolean
    description: string;
    category: {
      id: string;
      name: string;
    };
    image: string[];
}

interface CartContextType {
    products: Product[]
    loading: boolean
    addProductToCart: (product: Product) => void
    removeProductFromCart: (id: string) => void
    emptyCart: () => void
    countProducts: () => number
    productInTheCart: (product: Product) => boolean
    handleAddToCart: (product: Product) => void
    handleProductDecrease: (id: string) => void
    handleProductIncrease: (id: string, stock: number) => void
}

const CartContext = createContext<CartContextType>({
    products: [],
    loading: false,
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    emptyCart: () => {},
    countProducts: () => 0,
    productInTheCart: () => false,
    handleAddToCart: () => {},
    handleProductDecrease: () => {},
    handleProductIncrease: () => {},
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { isAuthenticated, getIdUser, token } = useAuth()

    useEffect(() => { 
        if(isAuthenticated && token) {
            const userCart = localStorage.getItem(`cart_${getIdUser(token)}`)
            setProducts(userCart ? JSON.parse(userCart) : [])
        }
        setLoading(false)
    }, [isAuthenticated, token, getIdUser])


    useEffect(() => {
        const syncCartAcrossTabs = (event: StorageEvent) => {
            if (!token) return; 
            if (event.key === `cart_${getIdUser(token)}` && event.newValue) {
            setProducts(JSON.parse(event.newValue));
            }
        };
    
        window.addEventListener("storage", syncCartAcrossTabs);
    
        return () => {
            window.removeEventListener("storage", syncCartAcrossTabs);
            setLoading(false)
        };
    }, [token, getIdUser]);


    const handleAddToCart = (product: Product) => {
        if (!isAuthenticated) {
          Mixin.fire("Debe estar logueado para agregar productos al carrito", "", "error")
          return;
        }
        addProductToCart(product)
        Mixin.fire("Producto agregado con éxito", "", "success")
    };

    const saveCart = (updatedProducts: Product[]) => {
        if (isAuthenticated) {
            localStorage.setItem(`cart_${getIdUser(token)}`, JSON.stringify(updatedProducts));
        }
    }

    const clearCart = () => {
        if (isAuthenticated) {
            localStorage.removeItem(`cart_${getIdUser(token)}`);
        }
    }

    const productInTheCart = (product: Product) => {
        const cart: Product[] = JSON.parse(localStorage.getItem(`cart_${getIdUser(token)}`) || "[]");
        return cart?.some((item) => item.id === product.id);
      }
    
    const addProductToCart = (product: Product) => {
        if (!isAuthenticated) {
            Mixin.fire("Debes iniciar sesion para agregar productos al carrito.");
            return;
        }
        if(product.stock < product.units) {
            Mixin.fire("Limite de stock.");
            return;
        }
        setProducts((prev) => {
            const updatedCart = prev.some(p => p.id === product.id) 
                ? prev.map(p => p.id === product.id ? { ...p, units: (p.units || 1) + 1 } : p) 
                : [...prev, { ...product, units: 1 }];
            saveCart(updatedCart);
            return updatedCart;
        });
    }    

    const removeProductFromCart = (id: string) => {
        const filteredProduct = products.filter((product) => (product.id) !== id)

        setProducts(filteredProduct)
        saveCart(filteredProduct)
    } 

    const emptyCart = () => {
        setProducts([])
        clearCart()
    }

    const countProducts = () => {
        return products.reduce((sum, product) => sum + product.units, 0);
    }

    const handleProductIncrease = (id: string, stock: number) => {
        const updatedProducts = products.map(product =>
            product.id === id
                ? { 
                    ...product, 
                    units: product.units < stock ? product.units + 1 : product.units // Solo aumenta si no excede el stock
                }
                : product
        );
        setProducts(updatedProducts);
        saveCart(updatedProducts);
    };
    
    const handleProductDecrease = (id: string) => {
        const updatedProducts = products.map(product =>
            product.id === id && product.units > 1
                ? { ...product, units: product.units - 1 }
                : product
        );
    
        const finalProducts = updatedProducts.filter(product => product.units > 0);
    
        setProducts(finalProducts);
        saveCart(finalProducts);
    };

    const value = {
        products,
        loading,
        addProductToCart,
        removeProductFromCart,
        emptyCart,
        countProducts,
        productInTheCart,
        handleAddToCart,
        handleProductIncrease,
        handleProductDecrease,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    const context = useContext(CartContext)
    if(!context) throw new Error("useCart must be used  within an CartProvider")
    return context
}
