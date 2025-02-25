import Image from 'next/image';
import React from 'react'

interface CartProductProps {
    ProductProps: Product;
}

interface Product {
    name: string;
    image: string;
    category: string;
    price: number;
}

export default function CartProduct({ ProductProps }: CartProductProps) {

    const {name, image, category, price} = ProductProps

    return (
        <div className='bg-white rounded-md px-6 py-2'>
            <h2>{name}</h2>
            <Image src={image} alt={`Imagen de ${name}`} width={64} height={64}/>
            <p>{category}</p>
            <p>${price.toFixed(2)}</p>
        </div>
    )
}
