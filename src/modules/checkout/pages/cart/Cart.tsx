// "use client";

// import BackButton from '@/shared/components/buttons/BackButton.component';
// import React, { useEffect, useState } from 'react';
// // import { tempCartProducts } from './helpers/TempCartProducts';
// // import CartProduct from './components/CartProduct';
// import { IProduct } from './interfaces/Cart.interface';
// import EmptyCart from './components/EmptyCart';
// import { useAuth } from '@/modules/auth/shared/context/Auth.context';
// import { confirmOrderService } from './services/cart.services';
// import CartList from './CartList';
// import { useCart } from './Cart.context';

// export default function Cart() {
//     const { products } = useCart();
//     const [productsOnCart, setProductsOnCart] = useState<IProduct[]>([]);
//     const [totalPrice, setTotalPrice] = useState<number>(0);
//     const { getIdUser, token } = useAuth();
//     const router = useRouter()
    
    
//     // Obtención del carrito acá. Llamada al back o al localStorage
    
//     useEffect(() => {
//         const localCart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]")
//         if (localCart) {
//             let calcTotal = 0;
//             localCart?.map((product) => {
//                 calcTotal = calcTotal + product.price*product.units;
//             })
//             setProductsOnCart(localCart);
//             setTotalPrice(calcTotal);
//         }
//     }, []);

//     const handleConfirmPurchase = async () => {
//         try {
//             const userBuyer = getIdUser(localStorage.getItem("token") || "");
//             const confirmedCart: ICartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
//             const { orderId, currency, products } = await confirmOrderService(userBuyer, confirmedCart, token);
//             // Ahora puedes usar los datos de orderId, currency, y products directamente
//             console.log("Orden confirmada:", orderId, currency, confirmedCart);
            
//             const paymentResponse = await paymentCreateService(orderId, "ARS", confirmedCart, token)
            
//             console.log("Respuesta del pago:", paymentResponse);
        

//         } catch (error) {
//             console.error("Error al confirmar la compra en cart.tsx:", error);
//         }
        
        
//     };
    
    


//         ////// TEMPORAL
//         // const [tempCont, setTempCont] = useState(0)
        
    
//         // const handleTempCart = () => {
//         //     const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]")
//         //     cart.push(tempCartProducts[tempCont])
//         //     localStorage.setItem("cart", JSON.stringify(cart))
//         //     setTempCont(tempCont+1)
//         // }
//         // ////////////

//     return (
//         <div className='flex flex-col min-h-screen bg-[#D9D9D9]'>
//             <BackButton tab='Carrito' />
//             {/* <div className='flex md:mt-8 mt-4 lg:mx-32 mx-8 gap-8'>
//                 {productsOnCart.length > 0 ? <div className='flex flex-col grow gap-4 mr-8'>
//                     {productsOnCart.map((product) => (
//                         <CartProduct 
//                             ProductProps={product} 
//                             setTotalPrice={setTotalPrice} 
//                             totalPrice={totalPrice} 
//                             productsOnCart={productsOnCart}
//                             setProductsOnCart={setProductsOnCart}
//                             key={product.id} 
//                         />
//                     ))}
//                 </div> */}
//                 {products.length ? <CartList products={products} /> : <EmptyCart />}
                
//                 <div className='w-1/5 h-fit bg-white rounded'>
//                     <h2 className='p-4 font-semibold'>Resumen de la compra</h2>
//                     <div className='border-b-2 border-gray-200'/>
//                     {productsOnCart.length > 0 ? <div className='m-4 flex flex-col gap-4'>
//                         <div className='flex justify-between'>
//                             <p>Productos: ({productsOnCart.length})</p>
//                             <p>$ {totalPrice}</p>
//                         </div>
//                         <p className='text-blue-500'>Ingresar un código de descuento</p>
//                         <div className='flex justify-between'>
//                             <p>Total</p>
//                             <p>$ {totalPrice}</p>
//                         </div>
//                         <button onClick={handleConfirmPurchase} className='bg-blue-500 text-white py-2 rounded hover:bg-blue-700 duration-200'>Confirmar Compra</button>
//                     </div> : <p className='p-4 text-sm text-gray-700'>Aqui veras el total de tu compra una vez que hayas agregado productos</p>}
//                 </div>
//             </div>

//     //         {/* TEMPORAL */}
//     //         <button onClick={handleTempCart}>AGREGADOR TEMPORAL</button>
//     //         {/* /////////// */}
//     //     </div>
//     // );
//     )
// }


"use client";

import BackButton from '@/shared/components/buttons/BackButton.component';
import React, { useEffect, useState } from 'react';
import { IProduct } from './interfaces/Cart.interface';
import EmptyCart from './components/EmptyCart';
import { useAuth } from '@/modules/auth/shared/context/Auth.context';
import { confirmOrderService, paymentCreateService } from './services/cart.services';
import CartList from './CartList';
import { useCart } from './Cart.context';

export default function Cart() {
    const { products } = useCart();
    const [productsOnCart, setProductsOnCart] = useState<IProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { getIdUser, token } = useAuth();

    // Obtención del carrito desde localStorage
    useEffect(() => {
        const localCart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
        if (localCart) {
            let calcTotal = 0;
            localCart.forEach((product) => {
                calcTotal += product.price * product.units;
            });
            setProductsOnCart(localCart);
            setTotalPrice(calcTotal);
        }
    }, []);

    const handleConfirmPurchase = async () => {
        try {
            // Verificar si el token es nulo
            if (!token) {
                throw new Error("Token no disponible");
            }
    
            // Si el token no es null, podemos proceder a usarlo
            const userBuyer = getIdUser(token);  // Aquí 'token' ya es un string válido
            const confirmedCart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");

            // Verificar si el token es nulo o si userBuyer es null
            if (userBuyer && token) {
                const { orderId, currency } = await confirmOrderService(userBuyer, confirmedCart, token);
                console.log("Orden confirmada:", orderId, currency, confirmedCart);
            
                const paymentResponse = await paymentCreateService(orderId, "ARS", confirmedCart, token);
                console.log("Respuesta del pago:", paymentResponse);
            } else {
                console.error("Token o userBuyer son nulos. No se puede confirmar la orden.");
            }

        } catch (error) {
            console.error("Error al confirmar la compra en cart.tsx:", error);
        }
    };

    return (
        <div className='flex flex-col min-h-screen bg-[#D9D9D9]'>
            <BackButton tab='Carrito' />
            {products.length ? <CartList products={products} /> : <EmptyCart />}

            <div className='w-1/5 h-fit bg-white rounded'>
                <h2 className='p-4 font-semibold'>Resumen de la compra</h2>
                <div className='border-b-2 border-gray-200' />
                {productsOnCart.length > 0 ? (
                    <div className='m-4 flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <p>Productos: ({productsOnCart.length})</p>
                            <p>$ {totalPrice}</p>
                        </div>
                        <p className='text-blue-500'>Ingresar un código de descuento</p>
                        <div className='flex justify-between'>
                            <p>Total</p>
                            <p>$ {totalPrice}</p>
                        </div>
                        <button onClick={handleConfirmPurchase} className='bg-blue-500 text-white py-2 rounded hover:bg-blue-700 duration-200'>
                            Confirmar Compra
                        </button>
                    </div>
                ) : (
                    <p className='p-4 text-sm text-gray-700'>Aquí verás el total de tu compra una vez que hayas agregado productos</p>
                )}
            </div>
        </div>
    );
}
