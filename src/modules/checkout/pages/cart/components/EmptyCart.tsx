import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function () {
    return (
        <div className='bg-gray-50 rounded-md px-6 py-2 flex items-center grow'>
            <div className='flex flex-row grow gap-2'>
                
                    <ShoppingCart size={80}/>
                <div className='flex flex-col justify-center min-w-72'>
                    <h2 className='font-semibold text-xl'>Agregá productos a tu carrito</h2>
                    <p className='text-sm'>Descubrí lo último de nuestro catálogo</p>
                    
                </div>

                    
            </div>
            <div className='text-blue-500 font-semibold'>
                <Link href={"/home"}>Descubrir Productos</Link>
            </div>
        </div>
    )
}
