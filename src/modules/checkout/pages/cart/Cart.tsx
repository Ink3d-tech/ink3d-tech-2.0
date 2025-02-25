import BackButton from '@/shared/components/buttons/BackButton.component'
import React from 'react';
import { tempCartProducts } from './helpers/TempCartProducts';
import CartProduct from './components/CartProduct';

export default function Cart() {


    return (
        <div className='flex flex-col min-h-screen bg-[#D9D9D9]'>
            <BackButton tab='Carrito' />
            <div className='flex mt-4 mx-32 gap-8'>
                <div className='flex flex-col grow gap-4 mr-8 '>

                    {tempCartProducts.map((Product) => {
                      return <CartProduct ProductProps={Product} key={Product.id}/>
                    })}
                </div>

                <div className='totalPrice'>
                    <h1>Total card</h1>
                </div>
            </div>
        </div>
    )
}