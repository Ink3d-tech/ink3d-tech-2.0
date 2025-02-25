import { LucideMessageSquare, ShoppingBag, Star } from 'lucide-react'
import React from 'react'

export default function Shopping() {
    return (
        <div className='flex flex-col gap-4 border-b p-5'>
            <h2 className='text-[#B0B0B0] text-sm'>Compras</h2>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-blue-500 p-2'>
                    <LucideMessageSquare className='fill-white'/> 
                </div>
                <p className='font-light'>Preguntas</p>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-blue-500 p-2'>
                    <ShoppingBag className='fill-white'/> 
                </div>
                <p className='font-light'>Mis compras</p>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-blue-500 p-2'>
                    <Star className='fill-white'/> 
                </div>
                <p className='font-light'>Mis opiniones</p>
            </div>
            
        </div>
    )
}
