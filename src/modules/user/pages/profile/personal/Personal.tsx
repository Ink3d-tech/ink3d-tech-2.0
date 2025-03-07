"use client"

import BackButton from '@/shared/components/buttons/BackButton.component'
import { BadgeCheck } from 'lucide-react'
import PersonalCard from '../components/ProfilCard.component'
import ProtectedRoute from '@/shared/helpers/ProtectedRoute'
import { useAuth } from '@/modules/auth/shared/context/Auth.context'

export default function Personal() {
    const { user } = useAuth()

    return (
        <ProtectedRoute title='Debes iniciar sesion o registrarte para ver tu perfil personal'>
            <div className="flex flex-col min-h-screen">
                <BackButton tab='Informacion personal' />
                <div className='flex flex-col bg-white m-4 p-5 rounded gap-4 shadow-shadow-gray shadow-lg'>
                    <div className='flex items-center gap-2'>
                        <BadgeCheck color='white' className='fill-green-500'/>
                        <h2 className='text-sm text-green-500'>Identidad validada</h2>
                    </div>
                    <div className=''>
                        <p>Nombre y apellido</p>
                        <p className='text-[#D9D9D9] text-sm'>{user?.name ?? "Sin asignar"}</p>
                    </div>
                    <div className=''>
                        <p>DNI</p>
                        <p className='text-[#D9D9D9] text-sm'>{"Sin asignar"}</p>
                    </div>
            
                    <hr/>
                </div>

                <PersonalCard field='Nombre elegido' value={user?.name ?? "Sin asignar"} validated='Validado' />
            </div>
        </ProtectedRoute>

            
        
    )
}
