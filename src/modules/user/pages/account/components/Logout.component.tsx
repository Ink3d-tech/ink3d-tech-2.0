"use client"

import { useAuth } from '@/modules/auth/shared/context/Auth.context'
import { Power, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Logout() {
    const { logout, user } = useAuth()

    const handleLogout = () => {
        logout();
    };
    
    return (
        <div className='flex flex-col gap-4 border-b py-3 px-5'>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <Settings color='white'/> 
                </div>
                <p className='font-light'>{user?.id}</p>
                <Link href={"/login"} className='flex ml-auto' onClick={handleLogout}> 
                    <Power color='black' onClick={handleLogout}/>
                </Link>
            </div>
        </div>
    )
}
