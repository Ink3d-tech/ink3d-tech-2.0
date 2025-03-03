// "use client"
// // import { API_BACK } from "@/shared/config/api/getEnv"
// // import { useAuth } from "@/modules/auth/shared/context/Auth.context"
// import { ButtonBase } from "./ButtonBase.component"
// import { Fire, getAlert } from "./FireAlert.component"
// import { useCart } from "../context/Cart.context"
// import { confirmOrderService } from "../services/cart.services"
// import { useAuth } from "@/modules/auth/shared/context/Auth.context"
// import { Product } from "../context/Cart.context"

// export default function CartSummary () {
//     // const { token, user } = useAuth()
//     // const router = useRouter()

//     // const totalPrice = products.reduce((total, product) => total + product.price, 0)


//     const handlerEmptyCart = () => {
//         getAlert("Clear cart", () => {
//             emptyCart()
//             Fire("Deleted!")
            
//         })
//     }

//         const { products, emptyCart, countProducts } = useCart();
//         // const [productsOnCart, setProductsOnCart] = useState<Product[]>([]);
//         // const [totalPrice, setTotalPrice] = useState<number>(0);
//         const { getIdUser, token } = useAuth();
        
//         // useEffect(() => {
//         //     const localCart = JSON.parse(localStorage.getItem(`cart_${getIdUser(token)}`) || "[]")
//         //     console.log(localCart)
//         //     if (localCart) {
//         //         let calcTotal = 0;
//         //         localCart?.map((product: Product) => {
//         //             calcTotal = calcTotal + (Number(product.price))*product.units;
//         //         })
//         //         setProductsOnCart(localCart);
//         //         setTotalPrice(calcTotal);
//         //     }
//         // }, [getIdUser, token]);
    
//         const totalPrice = products.reduce((total, product) => total + (Number(product.price)*product.units), 0)
//         const handleConfirmPurchase = async () => {
//             try {
//                 const tokenStorage = localStorage.getItem("token") || "";
//                 const userBuyer = getIdUser(tokenStorage) || "";
//                 const confirmedCart: Product[] = JSON.parse(localStorage.getItem(`cart_${getIdUser(token)}`) || "[]");   
//                 console.log(confirmedCart)
//                 await confirmOrderService(userBuyer, confirmedCart, token);
//                 console.log("Compra confirmada");
//             } catch (error) {
//                 console.error("Error al confirmar la compra:", error);
//             }
//         };

    
//     return (
//         <div className="bg-white rounded-lg shadow-gray-300 shadow-md h-auto sticky top-8 right-0 p-4">
//             <h2 className="text-lg font-semibold">Resumen de compras</h2>
//             <hr className="my-2"/>
//             <div className="flex justify-between mb-2">
//                 <span className="font-medium">Productos:</span>
//                 <span>{countProducts()}</span>
//             </div>
//             <div className="flex justify-between">
//                 <span className="font-medium">Total:</span>
//                 <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-end gap-4 mt-4">
//                 <ButtonBase name="Clear cart" onClick={handlerEmptyCart} />
//                 <ButtonBase name="Checkout" onClick={handleConfirmPurchase} />
//             </div>
//         </div>
//     )
// }




"use client"
// import { API_BACK } from "@/shared/config/api/getEnv"
// import { useAuth } from "@/modules/auth/shared/context/Auth.context"
import { ButtonBase } from "./ButtonBase.component"
import { Fire, getAlert } from "./FireAlert.component"
import { useCart } from "../context/Cart.context"
import { confirmOrderService } from "../services/cart.services"
import { useAuth } from "@/modules/auth/shared/context/Auth.context"
import { Product } from "../context/Cart.context"

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

        const { products, emptyCart, countProducts } = useCart();
        // const [productsOnCart, setProductsOnCart] = useState<Product[]>([]);
        // const [totalPrice, setTotalPrice] = useState<number>(0);
        const { getIdUser, token } = useAuth();
        
        // useEffect(() => {
        //     const localCart = JSON.parse(localStorage.getItem(`cart_${getIdUser(token)}`) || "[]")
        //     console.log(localCart)
        //     if (localCart) {
        //         let calcTotal = 0;
        //         localCart?.map((product: Product) => {
        //             calcTotal = calcTotal + (Number(product.price))*product.units;
        //         })
        //         setProductsOnCart(localCart);
        //         setTotalPrice(calcTotal);
        //     }
        // }, [getIdUser, token]);
    
        const totalPrice = products.reduce((total, product) => total + (Number(product.price)*product.units), 0)
        const handleConfirmPurchase = async () => {
            try {
                const tokenStorage = localStorage.getItem("token") || "";
                const userBuyer = getIdUser(tokenStorage) || "";
        
                // Verificar que getIdUser no devuelva null antes de usarlo
                const userId = getIdUser(token);
                if (!userId) {
                    throw new Error("Usuario no encontrado");
                }
        
                const cartData = localStorage.getItem(`cart_${userId}`); // Usamos el userId con seguridad
                const confirmedCart: Product[] = cartData ? JSON.parse(cartData) : [];  // Usamos un arreglo vacío si no hay datos en localStorage
                
                console.log(confirmedCart);
                
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
                <span>{countProducts()}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <ButtonBase name="Clear cart" onClick={handlerEmptyCart} />
                <ButtonBase name="Checkout" onClick={handleConfirmPurchase} />
            </div>
        </div>
    )
}