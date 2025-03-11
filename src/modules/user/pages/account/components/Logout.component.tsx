"use client"

import { useAuth } from '@/modules/auth/shared/context/Auth.context'
import { LogOutIcon, Power } from 'lucide-react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { MouseEvent, JSX } from 'react'

export default function Logout(): JSX.Element {
    const { logout } = useAuth()

    const handleLogout = (event: MouseEvent<HTMLAnchorElement>): void => {
        event.preventDefault();
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Tu sesión se cerrará',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };
    
    return (
        <div className='flex flex-col gap-4 border-b py-3 px-5'>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <LogOutIcon color='white'/> 
                </div>
                <p className='font-light'>Cerrar sesión</p>
                <Link href={'/login'} className='flex ml-auto' onClick={handleLogout}> 
                    <Power color='black'/>
                </Link>
            </div>
        </div>
    )
}
