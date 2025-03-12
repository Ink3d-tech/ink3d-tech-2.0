
import ProtectedRoute from '@/shared/helpers/ProtectedRoute'
import { ProfileView } from './Profile.view'


export default function Profile() {

    return ( 
        <ProtectedRoute title='Debes iniciar sesion o registrarte para ver tu perfil'>
            <ProfileView/>
        </ProtectedRoute>
    )
}
