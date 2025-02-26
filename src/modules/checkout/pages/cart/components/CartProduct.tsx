import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React, {useState } from 'react'
import { ICartProductProps, IProduct } from '../interfaces/Cart.interface';



export default function CartProduct({ ProductProps, setTotalPrice, totalPrice, setProductsOnCart, productsOnCart }: ICartProductProps) {

    const {id, name, image, category, price, stock} = ProductProps;

    const [productNumber, setProductNumber] = useState<number>(1);

    const handleProductIncrease = () => {
        setProductNumber(productNumber+1)
        setTotalPrice(totalPrice + price)
    }

    const handleProductDecrease = () => {
        setProductNumber(productNumber-1)
        setTotalPrice(totalPrice - price)
    }

    const handleProductDelete = () => {
        const newCart = productsOnCart.filter(product => product.id !== id);
        setProductsOnCart(newCart)
        let auxCart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
        let calcTotal = totalPrice - productNumber*price
        setTotalPrice(calcTotal);
    }

    

    return (
        <div className='bg-white rounded-md px-6 py-2 flex'>
            <div className='flex flex-row grow gap-2'>
                
                    <Image src={image} alt={`Imagen de ${name}`} width={100} height={64}/>
                <div className='flex flex-col justify-between w-72'>
                    <h2>{name}</h2>
                    <button className='text-xs text-blue-400 font-semibold  px-2 py-1 w-fit'
                    onClick={handleProductDelete}
                    >Eliminar</button>
                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 uppercase w-fit">
                        {category}
                    </span>
                </div>

                    <div className='flex flex-col grow'>
                        <div className='flex justify-between items-center border border-black px-2 w-24 mx-auto'>
                            {productNumber > 1 ? <Minus size={16} color='blue' onClick={handleProductDecrease}/> : <Minus size={16} color='gray'/>}
                            <h2>{productNumber}</h2>
                            {stock > productNumber ? <Plus size={16} color='blue' onClick={handleProductIncrease}/> :<Plus color='gray' size={16}/>}                            
                        </div>
                        {stock <= productNumber ? 
                        <p className='text-red-500 text-sm mx-auto max-w-32 text-center'>No pueden agregarse más unidades </p> 
                        : <p className='text-gray-500 mx-auto'>Stock: {stock}</p>}
                    </div>
            </div>
            <div className='w-10'>
                <p>${price}</p>
            </div>
        </div>
    )
}
