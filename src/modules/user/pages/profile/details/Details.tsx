import BackButton from "@/shared/components/buttons/BackButton.component";
import PersonalCard from "../components/ProfilCard.component";

export default function Details() {
    return (
        <div className="flex flex-col min-h-screen">
            <BackButton tab='Datos de la cuenta' />
            <div className="mt-4">
                <PersonalCard field='Email' value='nachoAlo123@gmail.com' validated='Validado'/>
                <PersonalCard field='Teléfono' value='+54 9 314 7132' validated='Validado' change={true}/>
                <PersonalCard field='Nombre de usuario' value='nachoAlo123' validated='Validado' change={true}/>
            </div>
        </div>
    )
}