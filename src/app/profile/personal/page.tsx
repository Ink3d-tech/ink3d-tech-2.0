import BackButton from '@/shared/components/BackButton.component'
import NavBar from '@/shared/components/NavBar.component'
import { BadgeCheck } from 'lucide-react'
import React from 'react'
import PersonalCard from './components/PersonalCard.component'

export default function Personal() {



    return (
        
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <BackButton tab='Informacion personal' />
                <div className='flex flex-col bg-white m-4 p-5 rounded gap-4 shadow-shadow-gray shadow-lg'>
                    <div className='flex items-center gap-2'>
                        <BadgeCheck color='white' className='fill-green-500'/>
                        <h2 className='text-sm text-green-500'>Identidad validada</h2>
                    </div>
                    <div className=''>
                        <p>Nombre y apellido</p>
                        <p className='text-[#D9D9D9] text-sm'>Ignacio Alonso</p>
                    </div>
                    <div className=''>
                        <p>DNI</p>
                        <p className='text-[#D9D9D9] text-sm'>123456789</p>
                    </div>
                    
                    <div className='border-b border-gray-200'></div>
                </div>

                <PersonalCard field='Nombre elegido' value='Ignacio Alonso' validated='Validado'/>
                <PersonalCard field='Email' value='nachoAlo123@gmail.com' validated='Validado'/>
                <PersonalCard field='Teléfono' value='+54 9 314 7132' validated='Validado'/>
                <PersonalCard field='Nombre de usuario' value='nachoAlo123' validated='Validado'/>
            </div>

            
        
    )
}
