import { HelpCircle, User } from 'lucide-react'
import Link from 'next/link'

export default function Configuration() {
    return (
        <div className='flex flex-col gap-4 border-b p-5'>
            <h2 className='text-[#B0B0B0] text-sm'>Configuración</h2>
            <Link href={"/profile"} className='flex gap-4 items-center mr-auto'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <User  color='white'/> 
                </div>
                    <p className='font-light'>Mi perfil</p>              
            </Link>
            {/* <Link href={"/settings"} className='flex gap-4 items-center mr-auto'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <Settings  color='white'/> 
                </div>
                <p className='font-light'>Ajustes</p>
            </Link> */}
            <Link href={"help"} className='flex gap-4 items-center mr-auto'>
                <div className='rounded-full bg-gray-500 p-2'>
                    <HelpCircle  color='white'/> 
                </div>
                <p className='font-light'>Ayuda</p>
            </Link>
                
        </div>
    )
}
