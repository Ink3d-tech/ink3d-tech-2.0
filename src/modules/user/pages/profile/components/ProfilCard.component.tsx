import { BadgeCheck } from 'lucide-react'
import React from 'react'

interface PersonalCardProps {
    field: string;
    value: string;
    change?: boolean;
    validated?: string;
}

export default function PersonalCard({ field, value, change, validated}: PersonalCardProps) {
    return (
        <div className='flex flex-col bg-white mx-4 mb-4 p-5 rounded gap-4 shadow-shadow-gray shadow-md'>
                {validated && 
                <div className='flex items-center gap-2'>
                    <BadgeCheck color='white' className='fill-green-500'/> 
                    <h2 className='text-sm text-green-500'>{validated}</h2>
                </div>}
            <div>
                <p>{field}</p>
                <p className='text-[#D9D9D9] text-sm'>{value}</p>
            </div>
            <div className='border-b border-gray-200'></div>
            {change && (
                <button className='max-w-fit bg-[#E4EEFD] text-[#0865F0] rounded-sm px-3 py-1 font-medium'>
                    Modificar
                </button>
            )}
        </div>
    )
}
