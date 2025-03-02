// "use client"

// import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
// import { useAuth } from "@/modules/auth/shared/context/Auth.context";
// import React, { createContext, useContext, useEffect, useState } from "react"


// export interface Product {
//     id: string;
//     name: string;
//     price: number;
//     size: string;
//     stock: number;
//     description: string;
//     category: {
//       id: string;
//       name: string;
//     };
//     image: string;
//   }

// interface CartContextType {
//     products: Product[]
//     addProductToCart: (product: Product) => void
//     removeProductFromCart: (id: number) => void
//     emptyCart: () => void
//     countProducts: (id: number) => number
//     productInTheCart: (product: Product) => boolean
//     handleAddToCart: (product: Product) => void
// }

// const CartContext = createContext<CartContextType>({
//     products: [],
//     addProductToCart: () => {},
//     removeProductFromCart: () => {},
//     emptyCart: () => {},
//     countProducts: () => 0,
//     productInTheCart: () => false,
//     handleAddToCart: () => {}
// })

// export const CartProvider = ({children}: {children: React.ReactNode}) => {
//     const [products, setProducts] = useState<Product[]>([])
//     const { isAuthenticated, getIdUser, token } = useAuth()

//     useEffect(() => { 
//         if(isAuthenticated && token) {
//             const userCart = localStorage.getItem(`cart_${getIdUser(token)}`)
//             setProducts(userCart ? JSON.parse(userCart) : [])
//         }
//     }, [isAuthenticated, token, getIdUser])


//     useEffect(() => {
//         const syncCartAcrossTabs = (event: StorageEvent) => {
//             if (!token) return; 
//             if (event.key === `cart_${getIdUser(token)}` && event.newValue) {
//             setProducts(JSON.parse(event.newValue));
//             }
//         };
    
//         window.addEventListener("storage", syncCartAcrossTabs);
    
//         return () => {
//             window.removeEventListener("storage", syncCartAcrossTabs);
//         };
//     }, [token, getIdUser]);


//     const handleAddToCart = (product: Product) => {
//         if (!isAuthenticated) {
//           Mixin.fire("Debes iniciar sesión para agregar productos al carrito", "", "warning");
//           return;
//       } 
//         if (productInTheCart(product)) {
//           Mixin.fire("El producto ya está en el carrito", "", "error");  
//           return;
//         }
//         addProductToCart(product)
//         Mixin.fire("Producto agregado con éxito", "", "success")
    
//       };

//     const saveCart = (updatedProducts: Product[]) => {
//         if (isAuthenticated) {
//             localStorage.setItem(`cart_${getIdUser(token)}`, JSON.stringify(updatedProducts));
//         }
//     }

//     const clearCart = () => {
//         if (isAuthenticated) {
//             localStorage.removeItem(`cart_${getIdUser(token)}`);
//         }
//     }

//     const productInTheCart = (product: Product) => {
//         const cart: Product[] = JSON.parse(localStorage.getItem(`cart_${getIdUser(token)}`) || "[]");
//         return cart?.some((item) => item.id === product.id);
//       }
    
//     const addProductToCart = (product: Product) => {
//         if (!isAuthenticated) {
//             alert("Debes iniciar sesion para agregar productos al carrito.");
//             return;
//         }
//         const updatedProducts = [...products, product]
//         setProducts(updatedProducts)
//         saveCart(updatedProducts)
//     }

//     const removeProductFromCart = (id: number) => {
//         const filteredProduct = products.filter((product) => Number(product.id) !== id)
//         setProducts(filteredProduct)
//         saveCart(filteredProduct)
//     } 

//     const emptyCart = () => {
//         setProducts([])
//         clearCart()
//     }

//     const countProducts = (id: number) => {
//         return products.filter(product => Number(product.id) === id).length
//     }



//     const value = {
//         products,
//         addProductToCart,
//         removeProductFromCart,
//         emptyCart,
//         countProducts,
//         productInTheCart,
//         handleAddToCart,
//     }

//     return (
//         <CartContext.Provider value={value}>
//             {children}
//         </CartContext.Provider>
//     )
// }


// export const useCart = () => {
//     const context = useContext(CartContext)
//     // chequeo si puedo usar el useContext en esa parte de la aplicacion
//     if(!context) throw new Error("useCart must be used  within an CartProvider")
//     return context
// }



"use client";

import { Mixin } from "@/modules/auth/shared/components/MixinAlert";
import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import React, { createContext, useContext, useEffect, useState } from "react"

export interface Product {
    id: string;
    name: string;
    price: number;
    size: string;
    stock: number;
    description: string;
    category: {
      id: string;
      name: string;
    };
    image: string;
}

interface CartContextType {
    products: Product[]
    addProductToCart: (product: Product) => void
    removeProductFromCart: (id: number) => void
    emptyCart: () => void
    countProducts: (id: number) => number
    productInTheCart: (product: Product) => boolean
    handleAddToCart: (product: Product) => void
}

const CartContext = createContext<CartContextType>({
    products: [],
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    emptyCart: () => {},
    countProducts: () => 0,
    productInTheCart: () => false,
    handleAddToCart: () => {}
})

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [products, setProducts] = useState<Product[]>([])
    const { isAuthenticated, getIdUser, token } = useAuth()

    useEffect(() => { 
        if (isAuthenticated && token) {
            const userId = getIdUser(token);
            if (userId) {
                const userCart = localStorage.getItem(`cart_${userId}`)
                setProducts(userCart ? JSON.parse(userCart) : [])
            }
        }
    }, [isAuthenticated, token, getIdUser])


    useEffect(() => {
        const syncCartAcrossTabs = (event: StorageEvent) => {
            if (!token) return; 
            const userId = getIdUser(token);
            if (userId && event.key === `cart_${userId}` && event.newValue) {
                setProducts(JSON.parse(event.newValue));
            }
        };
    
        window.addEventListener("storage", syncCartAcrossTabs);
    
        return () => {
            window.removeEventListener("storage", syncCartAcrossTabs);
        };
    }, [token, getIdUser]);


    const handleAddToCart = (product: Product) => {
        if (!isAuthenticated) {
          Mixin.fire("Debes iniciar sesión para agregar productos al carrito", "", "warning");
          return;
      } 
        if (productInTheCart(product)) {
          Mixin.fire("El producto ya está en el carrito", "", "error");  
          return;
        }
        addProductToCart(product)
        Mixin.fire("Producto agregado con éxito", "", "success")
    
      };

    const saveCart = (updatedProducts: Product[]) => {
        if (isAuthenticated && token) {
            const userId = getIdUser(token);
            if (userId) {
                localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedProducts));
            }
        }
    }

    const clearCart = () => {
        if (isAuthenticated && token) {
            const userId = getIdUser(token);
            if (userId) {
                localStorage.removeItem(`cart_${userId}`);
            }
        }
    }

    const productInTheCart = (product: Product) => {
        if (!token) return false;
        const userId = getIdUser(token);
        if (userId) {
            const cart: Product[] = JSON.parse(localStorage.getItem(`cart_${userId}`) || "[]");
            return cart?.some((item) => item.id === product.id);
        }
        return false;
    }
    
    const addProductToCart = (product: Product) => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesion para agregar productos al carrito.");
            return;
        }
        const updatedProducts = [...products, product]
        setProducts(updatedProducts)
        saveCart(updatedProducts)
    }

    const removeProductFromCart = (id: number) => {
        const filteredProduct = products.filter((product) => Number(product.id) !== id)
        setProducts(filteredProduct)
        saveCart(filteredProduct)
    } 

    const emptyCart = () => {
        setProducts([])
        clearCart()
    }

    const countProducts = (id: number) => {
        return products.filter(product => Number(product.id) === id).length
    }

    const value = {
        products,
        addProductToCart,
        removeProductFromCart,
        emptyCart,
        countProducts,
        productInTheCart,
        handleAddToCart,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used within a CartProvider")
    return context
}
