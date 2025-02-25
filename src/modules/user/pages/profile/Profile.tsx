import React from 'react'
import ProfileBanner from './components/ProfileBanner.component'
import ProfileButtons from './components/ProfileButtons.components'
import BackButton from '@/shared/components/buttons/BackButton.component'

export default function Profile() {
    return ( 
        <div className="flex flex-col h-screen">
            <BackButton tab='Mi perfil'/>
            <div className='flex flex-col items-center gap-2 flex-1 overflow-y-auto'>
                <ProfileBanner />
                <ProfileButtons />
            </div>
        </div>
    )
}
