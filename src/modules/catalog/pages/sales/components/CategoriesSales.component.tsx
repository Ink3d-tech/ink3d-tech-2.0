// adelantado, ver utilidad 
// corregir colores segun figma (quiza setear colores default en tailwind.config)

import { Shirt, StretchVertical, Tag } from 'lucide-react'
import React from 'react'

export default function CategoriesSales() {
    return (
        <div className='h-44 pt-4  pb-8 pl-4 bg-[#D9D9D9] flex gap-4 overflow-x-auto w-full flex-nowrap '>

            <div className='bg-white h-32 w-24 shrink-0  rounded-md shadow-md shadow-shadow-gray flex flex-col items-center pt-4
                border-b-4 border-blue-500' > {/* card seleccionada */}
                <Tag color='blue' size={28} className='mb-4'/>
                <h2 className='text-center text-sm font-semibold overflow-hidden whitespace-normal'>Todas las ofertas</h2>
            </div>

            <div className='bg-white h-32 w-24 shrink-0  rounded-md shadow-md shadow-shadow-gray flex flex-col items-center pt-4'>
                <Shirt color='blue' size={28} className='mb-4'/>
                <h2 className='text-center text-sm font-semibold'>Remeras</h2>
            </div>

            <div className='bg-white h-32 w-24 shrink-0  rounded-md shadow-md shadow-shadow-gray flex flex-col items-center pt-4'>
                <StretchVertical color='blue' size={28} className='mb-4'/>
                <h2 className='text-center text-sm font-semibold'>Shorts</h2>
            </div>
            
            <div className='bg-white h-32 w-24 shrink-0  rounded-md shadow-md shadow-shadow-gray flex flex-col items-center pt-4'>
                <Shirt color='blue' size={28} className='mb-4'/>
                <h2 className='text-center text-sm font-semibold'>Buzos</h2>
            </div>
            
        </div>
    )
}
