
import ProtectedRoute from '@/shared/helpers/ProtectedRoute'
import { ProfileView } from './Profile.view'


export default function Profile() {

    return ( 
        <ProtectedRoute>
            <ProfileView/>
        </ProtectedRoute>
    )
}
