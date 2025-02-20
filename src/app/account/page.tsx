import BackButton from '@/shared/components/BackButton.component'
import React from 'react'
import Shopping from './components/Shopping.component'
import NavBar from '@/shared/components/NavBar.component'
import Configuration from './components/Configuration.component'
import Logout from './components/Logout.component'

export default function Account() {
    return (
        <div className='flex flex-col h-screen'>
            <NavBar />
            <BackButton tab='Cuenta'/>

            <div className='flex flex-col flex-1 overflow-y-auto bg-white'>
                <Shopping />
                <Configuration />
                <Logout />
            </div>
        </div>
    )
}
