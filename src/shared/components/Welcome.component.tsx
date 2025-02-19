"use client"

import React, { useState } from 'react'
import logoEx from "../../../public/png-clipart-round-multicolored-logo-vanamo-logo-icons-logos-emojis-tech-companies-thumbnail.png"
import Link from 'next/link';

interface WelcomeProps {
    handleToggle: () => void;
}

export default function Welcome({ handleToggle }: WelcomeProps) {

    const [logged, setLogged] = useState(true);
    console.log(logged);

    return (
        <div className='flex flex-col  bg-black px-5'>
                <div className='flex flex-row my-3 gap-4 items-center'>
                    <img src={logoEx.src} className='h-14 rounded-full' alt='inkedlogo'/>
                    
                    {logged ? <div>
                        <p className='text-white'>David Alejandro</p>
                        <p className='text-gray-500 text-sm'>Mi perfil</p>
                    </div> : <div>
                        <p className='text-white'>Bienvenido</p>
                        <p className='text-gray-500 text-sm'>Ingresa a tu cuenta para ver tus compras,
                        favoritos, magazine, etc</p>
                    </div>}
                </div>
                <div className='mb-2 grid grid-cols-2 gap-2 w-full'>
                <Link href={"/login"} onClick={handleToggle} type="button" className="w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800
                    font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Iniciar Sesión</Link>
                <Link href={"/signup"} onClick={handleToggle} type="button" className="w-full flex justify-center text-blue-700 bg-white
                    hover:bg-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 ">
                    Crear Cuenta</Link>
                </div>
        </div>
    )
}
