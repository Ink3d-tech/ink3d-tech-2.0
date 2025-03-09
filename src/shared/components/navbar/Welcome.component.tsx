"use client"

import Link from 'next/link';
import { useAuth } from '@/modules/auth/shared/context/Auth.context';
import Image from 'next/image';

interface WelcomeProps {
    handleToggle: () => void;
}

export default function Welcome({ handleToggle }: WelcomeProps) {

    const logoEx = "/png-clipart-round-multicolored-logo-vanamo-logo-icons-logos-emojis-tech-companies-thumbnail.png"

    const { isAuthenticated, user } = useAuth()


    return (
        <div className='flex mb-4 flex-col bg-black px-5'>
                <div className='flex flex-row my-3 gap-4 items-center'>
                    <Image src={logoEx} className='h-14 rounded-full' alt='inkedlogo' width={56} height={56}/>
                    
                    {isAuthenticated ? <div>
                        <p className='text-white capitalize'>{user?.name}</p>
                        <Link href={"/profile"} onClick={handleToggle} className='text-gray-500 text-sm'>Mi perfil</Link>
                    </div> : <div>
                        <p className='text-white'>Bienvenido</p>
                        <p className='text-gray-500 text-sm'>Ingresa a tu cuenta para ver tus compras,
                        favoritos, magazine, etc</p>
                    </div>}
                </div>
                {!isAuthenticated ?  <div className='mb-2 grid grid-cols-2 gap-2 w-full'>
                <Link href={"/login"} onClick={handleToggle} type="button" className="w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800
                    font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Iniciar Sesión</Link>
                <Link href={"/signup"} onClick={handleToggle} type="button" className="w-full flex justify-center text-blue-700 bg-white
                    hover:bg-gray-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 ">
                    Crear Cuenta</Link>
                </div> : null}
        </div>
    )
}
