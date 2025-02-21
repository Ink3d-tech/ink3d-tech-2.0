"use client"

import { ChevronRight, IdCard, User2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ProfileButtons() {
    return (
        <div className='bg-white flex-1 w-full'>
            <Link href={"/profile/personal"} className='flex gap-2 p-4 items-center border-b border-[#D9D9D9]'>
                <IdCard color='blue' size={40} className='rounded-full border border-[#D9D9D9] p-1'/> 
                <div>
                    <h2 className=''>Informacion personal</h2>
                    <h3 className='text-[#B0B0B0] text-xs font-light'>Información de tu documento de identidad y tu actividad fiscal</h3>
                </div>
                <div className='flex grow justify-end'>
                    <ChevronRight />
                </div>
            </Link>
            <Link href={"/profile/details"} className='flex gap-2 p-4 items-center border-b border-[#D9D9D9]'>
                <User2 color='blue' size={40} className='rounded-full border border-[#D9D9D9] p-1'/> 
                <div>
                    <h2 className=''>Datos de tu cuenta</h2>
                    <h3 className='text-[#B0B0B0] text-xs font-light'>Datos asociados a tu cuenta en ink3d</h3>
                </div>
                <div className='flex grow justify-end'> 
                    <ChevronRight />
                </div>
            </Link>
        </div>
    )
}
