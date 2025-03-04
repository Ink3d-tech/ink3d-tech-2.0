// import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function EmptyCart() {
//     return (
//         <div className='bg-gray-50 rounded-md px-6 py-2 flex items-center grow'>
//             <div className='flex flex-row grow gap-2'>
                
//                     <ShoppingCart size={80}/>
//                 <div className='flex flex-col justify-center min-w-72'>
//                     <h2 className='font-semibold text-xl'>Agregá productos a tu carrito</h2>
//                     <p className='text-sm'>Descubrí lo último de nuestro catálogo</p>
                    
//                 </div>

                    
//             </div>
//             <div className='text-blue-500 font-semibold'>
//                 <Link href={"/home"}>Descubrir Productos</Link>
//             </div>
//         </div>
//     )
return (
    <>
        <div className="lg:w-[70%] min-h-[100px] w-full">
            <div className="flex justify-between items-center rounded-lg bg-white h-full px-4 shadow-gray-300 shadow-md">
                <Image src="/images/logo-cart.png" alt="logo-cart" width={80} height={80}/>
                <span className="text-gray-900 font-semibold">Here you will see your products</span>
                <Link href={"/products"} className="text-blue-500">Descubrir productos</Link>
            </div>
        </div>

        <div className="lg:w-[30%] relative w-full">
            <div className="bg-gray-100 rounded-lg shadow-gray-300 shadow-md h-auto sticky top-8 right-0 p-4">
                <h2 className="text-lg font-semibold text-gray-600">Resumen de la compra</h2>
                <hr className="my-2 border-gray-300" />
                <div className="p-2">
                    <span className="font-medium text-sm text-gray-400">
                        Aquí podrás ver los importes de tu compra una vez que añadas productos.
                    </span>
                </div>
            </div>
        </div> 
    </>
)
}


