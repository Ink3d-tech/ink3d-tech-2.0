"use client";

import BackButton from '@/shared/components/buttons/BackButton.component';
import React, { useEffect, useState } from 'react';
import { tempCartProducts } from './helpers/TempCartProducts';
import CartProduct from './components/CartProduct';
import { ICartProduct } from './interfaces/Cart.interface';

export default function Cart() {
    const [productsOnCart, setProductsOnCart] = useState<ICartProduct[]>(tempCartProducts);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    
    // Obtención del carrito acá. Llamada al back o al localStorage
    
    useEffect(() => {
        if (productsOnCart) {
            let calcTotal = 0;
            productsOnCart?.map((product) => {
                calcTotal = calcTotal + product.price;
            })
            setProductsOnCart(productsOnCart);
            setTotalPrice(calcTotal);
        }
    }, []);

    return (
        <div className='flex flex-col min-h-screen bg-[#D9D9D9]'>
            <BackButton tab='Carrito' />
            <div className='flex md:mt-8 mt-4 md:mx-32 mx-8 gap-8'>
                <div className='flex flex-col grow gap-4 mr-8'>
                    {productsOnCart.map((product) => (
                        <CartProduct 
                            ProductProps={product} 
                            setTotalPrice={setTotalPrice} 
                            totalPrice={totalPrice} 
                            productsOnCart={productsOnCart}
                            setProductsOnCart={setProductsOnCart}
                            key={product.id} 
                        />
                    ))}
                </div>

                <div className='w-1/5 h-fit bg-white rounded'>
                    <h2 className='p-4'>Resumen de la compra</h2>
                    <div className='border-b-2 border-gray-200'/>
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
                        <button className='bg-blue-500 text-white py-2 rounded hover:bg-blue-700 duration-200'>Confirmar Compra</button>
                    </div>
                </div>
            </div>
        </div>
    );
}