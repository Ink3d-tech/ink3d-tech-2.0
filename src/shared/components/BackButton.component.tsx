"use client"

// Boton para implementar en cada ruta, regresa a la ruta anterior

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function BackButton() {

    const router = useRouter();

    const handleReturn = () => {
    router.back(); 
    };

    return (
        <div>
            <ArrowLeft onClick={handleReturn} color='gray' size={22}/>
        </div>
    )
}
