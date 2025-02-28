// import { HelpCircle, Settings, User } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'

// export default function Configuration() {
//     return (
//         <div className='flex flex-col gap-4 border-b p-5'>
//             <h2 className='text-[#B0B0B0] text-sm'>Configuración</h2>
//             <div className='flex gap-4 items-center'>
//                 <div className='rounded-full bg-gray-500 p-2'>
//                     <User className='fill-white'/> 
//                 </div>
//                 <Link href={"/profile"}>
//                     <p className='font-light'>Mi perfil</p>
//                 </Link>
                
//             </div>
//             <div className='flex gap-4 items-center'>
//                 <div className='rounded-full bg-gray-500 p-2'>
//                     <Settings className='fill-white'/> 
//                 </div>
//                 <p className='font-light'>Ajustes</p>
//             </div>
//             <div className='flex gap-4 items-center'>
//                 <div className='rounded-full bg-gray-500 p-2'>
//                     <HelpCircle className='fill-white'/> 
//                 </div>
//                 <p className='font-light'>Ayuda</p>
//             </div>
                
//         </div>
//     )
// }


import { HelpCircle, Settings, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Configuration() {
    return (
        <div className='flex flex-col gap-4 border-b p-5'>
            <h2 className='text-[#B0B0B0] text-sm'>Configuración</h2>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <User className='fill-white'/> 
                </div>
                <Link href={"/profile"}>
                    <p className='font-light'>Mi perfil</p>
                </Link>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <Settings className='fill-white'/> 
                </div>
                <p className='font-light'>Ajustes</p>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <HelpCircle className='fill-white'/> 
                </div>
                <p className='font-light'>Ayuda</p>
            </div>
            <h2 className='text-[#B0B0B0] text-sm mt-4'>Mi Panel</h2> {/* Nueva categoría */}
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-gray-500 p-2'>
                    {/* Puedes agregar un icono específico para el panel si lo deseas */}
                </div>
                <Link href={"/manager"}>
                    <p className='font-light'>Manager</p>
                </Link>
            </div>
        </div>
    );
}