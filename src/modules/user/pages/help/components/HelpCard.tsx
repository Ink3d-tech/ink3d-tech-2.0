"use client"

import { ChevronRight } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

interface PersonalCardProps {
    field: string;
    value?: string;
    link: string;
}

export default function HelpCard({ field, value, link}: PersonalCardProps) {
    return (
        <Link href={link} className=' bg-red flex gap-2 px-4 py-2 items-center border-b border-[#D9D9D9]'>
            <div>
                <h2 className=''>{field}</h2>
                {value && <h3 className='text-[#B0B0B0] text-xs font-light'>{value}</h3>}
            </div>
            <div className='flex grow justify-end'>
                <ChevronRight />
            </div>
        </Link>
    )
}
