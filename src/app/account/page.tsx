import BackButton from '@/shared/components/BackButton.component'
import React from 'react'
import Shopping from './components/Shopping.component'
import NavBar from '@/shared/components/NavBar.component'
import Configuration from './components/Configuration.component'

export default function Account() {
    return (
        <div className='flex flex-col h-screen'>
            <NavBar />
            <div className='bg-black h-12 flex items-center px-3'>
                <BackButton />
                <h1 className='text-some-gray ml-2 text-base'>Mi cuenta</h1>
            </div>

            <h2 className='flex justify-center bg-red-500'>FUNCIONALIDAD ACA, LUEGO SEARCHBAR</h2>

            <div className='flex flex-col flex-1 overflow-y-auto bg-white'>
                <Shopping />
                <Configuration />
            </div>
        </div>
    )
}
