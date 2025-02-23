"use client"

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Routes } from '../enums/Routes';

export default function HeaderBackBtn({route, name}: {route: Routes, name: string}) {
    const router = useRouter();

    const handleReturn = () => {
        router.replace(route)
    };

    return (
        <div className='bg-black h-12 flex items-center px-3'>
            <ArrowLeft onClick={handleReturn} color='gray' size={22} className='cursor-pointer'/>
            <h1 className='text-some-gray ml-2 text-base'>{name}</h1>
        </div>
    )
}
