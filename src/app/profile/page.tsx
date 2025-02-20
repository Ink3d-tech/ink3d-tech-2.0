import React from 'react'
import ProfileBanner from './components/ProfileBanner.component'
import ProfileButtons from './components/ProfileButtons.components'
import BackButton from '@/shared/components/BackButton.component'
import NavBar from '@/shared/components/NavBar.component'

export default function Profile() {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className='bg-black h-12 flex items-center px-3'>
                <BackButton />
                <h1 className='text-some-gray ml-2 text-base'>Mi perfil</h1>
            </div>

            <div className='flex flex-col items-center gap-2 flex-1 overflow-y-auto'>
                <ProfileBanner />
                <ProfileButtons />
            </div>
        </div>
    )
}
