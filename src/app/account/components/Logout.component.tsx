import { LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logout() {
    return (
        <div className='flex flex-col gap-4 border-b py-3 px-5'>
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <Settings className='fill-white'/> 
                </div>
                <p className='font-light'>Id de Usuario Completo</p>
                <Link href={"/login"} className='flex grow justify-end'> 
                    <LogOut />
                </Link>
            </div>
        </div>
    )
}
