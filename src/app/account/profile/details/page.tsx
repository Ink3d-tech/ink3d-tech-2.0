import BackButton from "@/shared/components/BackButton.component";
import PersonalCard from "../personal/components/PersonalCard.component";

export default function details() {
    return (
         <div className="flex flex-col min-h-screen">
            <BackButton tab='Datos de la cuenta' />
            <PersonalCard field='Email' value='nachoAlo123@gmail.com' validated='Validado'/>
            <PersonalCard field='Teléfono' value='+54 9 314 7132' validated='Validado' change={true}/>
            <PersonalCard field='Nombre de usuario' value='nachoAlo123' validated='Validado' change={true}/>
        </div>
    )
}