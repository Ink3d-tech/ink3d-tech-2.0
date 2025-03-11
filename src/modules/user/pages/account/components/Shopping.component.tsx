import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function Shopping() {
    return (
        <div className='flex flex-col gap-4 border-b p-5'>
            <h2 className='text-[#B0B0B0] text-sm'>Compras</h2>
            {/* <Link href={"/preguntas"} className='flex gap-4 items-center mr-auto'>
                <div className='rounded-full bg-blue-500 p-2'>
                    <LucideMessageSquare className='fill-white' color='white'/> 
                </div>
                <p className='font-light'>Preguntas</p>
            </Link> */}
            <Link href={"/orders"} className='flex gap-4 items-center mr-auto'>
                <div className='rounded-full bg-blue-500 p-2'>
                    <ShoppingBag  color='white'/> 
                </div>
                <p className='font-light'>Mis compras</p>
            </Link>
            {/* <Link href={"/reviews"} className='flex gap-4 items-center'>
                <div className='rounded-full bg-blue-500 p-2'>
                    <Star className='fill-white' color='white'/> 
                </div>
                <p className='font-light'>Mis opiniones</p>
            </Link> */}
            
        </div>
    )
}
