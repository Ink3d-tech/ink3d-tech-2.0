import BackButton from '@/shared/components/buttons/BackButton.component'
import React from 'react'
import HelpCard from './components/HelpCard'

export default function Help() {
    return (
        <div className="flex flex-col min-h-screen">
            <BackButton tab='Ayuda'/>

            <div className='m-4'>
                <h2 className='font-medium text-lg leading-normal'>¿Con qué podemos ayudarte?</h2>
                <div className='mt-4'>
                    <h2 className='font-medium mb-3'>Compras</h2>
                    <div className='bg-white rounded flex-1 w-full shadow-shadow-gray shadow-md'>
                        <HelpCard field='Administrar compras' value='Pagar, seguir envíos, modificar, reclamar o cancelar compras.' link='./refund'/>
                        <HelpCard field='Devoluciones y rembolsos' value='Devolver un producto o consultar por reintegros de dinero de una compra' link='./refund'/>
                        <HelpCard field='Preguntas frecuentes' link='./faq-purchase'/>
                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className='font-medium mb-3'>Ayuda sobre tu cuenta</h2>
                    <div className='bg-white rounded flex-1 w-full shadow-shadow-gray shadow-md'>
                        <HelpCard field='Configuracion de mi cuenta' link='./refund'/>
                        <HelpCard field='Seguridad y acceso a la cuenta' link='./refund'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
