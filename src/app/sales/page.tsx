import ProductCardVertical from '@/shared/components/ProductVertical.component'
import CategoriesSales from './components/CategoriesSales.component'
import { ChevronDown } from 'lucide-react'
import React from 'react'
import BackButton from '@/shared/components/BackButton.component'

export default function Sales() {
    
    const image = "/mazdaimg.png"

    return (
        <div>
            <div className='bg-black h-12 flex items-center px-3'>
                <BackButton />
                <h1 className='text-some-gray ml-2 text-base'>Ofertas</h1>
            </div>
            <div className='bg-white h-12 flex justify-between items-center px-3 border-b-2 border-gray-200'>
                <p className='text-some-gray text-xs'>1000 productos</p>
                <div className='flex  items-center'>
                    <p className='text-blue-500'>Filtrar</p>
                    <ChevronDown color='blue' size={16} className='mt-1'/>
                </div>
            </div>
            <div>
                <CategoriesSales />
            </div>
            <div className='grid grid-cols-2'>
            
                        <ProductCardVertical name='exampleName' price='0' image={image}/>
                        <ProductCardVertical name='exampleName' price='0'/>
                        <ProductCardVertical name='exampleName' price='0'/>
                        <ProductCardVertical name='exampleName' price='0'/>
                    </div>
        </div>
    )
}
