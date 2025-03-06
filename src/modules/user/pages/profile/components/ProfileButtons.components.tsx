"use client"

import { ChevronRight, IdCard, User2 } from 'lucide-react'
import Link from 'next/link'

interface CardProfileProps {
    href: string
    icon: React.ReactNode
    title: string
    description: string
}

const profileConfig: CardProfileProps[] = [
    {
        href: "/profile/personal",
        icon: <IdCard color='#3483FA' size={40} className='rounded-full border border-[#D9D9D9] p-1'/>,
        title: "Informacion personal",
        description: "Información de tu documento de identidad y tu actividad fiscal"
    },
    {
        href: "/profile/details",
        icon: <User2 color='#3483FA' size={40} className='rounded-full border border-[#D9D9D9] p-1'/>,
        title: "Datos de tu cuenta",
        description: "Datos que representan la cuenta en INK3D"
    },
    
]

const CardProfile = ({data}: {data: CardProfileProps}) => {
    const { href, icon, title, description } = data
    return (
        <Link href={href} className='flex gap-2 p-4 items-center border-b border-[#D9D9D9]'>
            {icon} 
            <div>
                <h2 className=''>{title}</h2>
                <h3 className='text-[#B0B0B0] text-xs font-light'>{description}</h3>
            </div>
            <div className='flex grow justify-end'>
                <ChevronRight />
            </div>
        </Link>
    ) 
}

export default function ProfileButtons() {
    return (
        <div className='bg-white flex-1 w-full'>
            {profileConfig.map((data, index) => <CardProfile key={index} data={data}/>)}
        </div>
    )
}