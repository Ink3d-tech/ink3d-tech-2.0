import { BtnVariant, ButtonBase } from "@/modules/auth/shared/components/buttons/Button.component";
import { FormComponent } from "@/modules/auth/shared/components/Form.component";
import { LoginInterface } from "../../../shared/interfaces/Login.interface";
import { Question, VariantQuestion } from "@/modules/auth/shared/components/Question.component"
import { formFields } from "./Login.config";
import { Divider } from "../../../shared/components/Divider.component";
import { Spacer } from "@/modules/auth/shared/components/Spacer"
import { Routes } from "../../../shared/enums/Routes";
import { FcGoogle } from "react-icons/fc";
import { API_BACK } from "@/shared/config/api/getEnv";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


export enum LoginFields {
    ENTER = "Entrar",
    GOOGLE = "Inciar sesión con Google",
    PASSWORD = "¿Olvidaste tu contraseña?",
    ACCOUNT = "¿Ya tienes una cuenta?",
    NEWACCOUNT = "¿No tienes una cuenta?",
    REGISTER = "Registrarte",
    OR = "o"
}

interface LoginProps {
    form: LoginInterface
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    formErrors: Record<string, string>
    handlerSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
}

export const LoginForm: React.FC<LoginProps> = ({
    form,
    handlerChange,
    formErrors,
    handlerSubmit,
    isLoading
}) => {

    const [isClient, setIsClient] = useState(false);
    // const [isOpen, setIsOpen] = useState(false)
    
    // useEffect para actualizar el estado cuando el componente se monte
    useEffect(() => {
        setIsClient(true);  // Cambiamos a true una vez que el componente se haya montado en el cliente
    }, []);

    const handleGoogleAuth = () => {
        if (isClient) {  
            Swal.fire({
                title: "Redirigiendo...",
                text: "Te estamos redirigiendo a Google para iniciar sesión",
                icon: "info",
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = `${API_BACK}/auth/google/login`;
            });
        }
    };

    return (
        <form onSubmit={handlerSubmit} className="flex flex-col px-4 m-auto max-w-[402px]">
            <FormComponent 
                form={form}
                handlerChange={handlerChange}
                inputs={formFields}
                formErrors={formErrors}
            />
            {/* <Question question={LoginFields.PASSWORD} variant={VariantQuestion.SECONDARY} />
            {
                isOpen ? <ModalResetPassword setIsOpen={setIsOpen}/> : null

            } */}
            <div className="mb-6"></div>

            <ButtonBase name={LoginFields.ENTER} isLoading={isLoading} variant={BtnVariant.PRIMARY}/>
            <Divider letter={LoginFields.OR}/>
            <button
                type="button"
                className="flex items-center justify-center py-2 rounded-md font-medium text-[14px] bg-white text-black border-gray-400"
                onClick={handleGoogleAuth}
                >
                <FcGoogle size={20} /> 
                <span>Registrarse con Google</span>
            </button>

            <Spacer value={34}/>
            
            <div className="flex gap-2 mx-auto">
                <Question question={LoginFields.NEWACCOUNT} href={Routes.SIGNUP} variant={VariantQuestion.SECONDARY}/>
                <Question question={LoginFields.REGISTER} href={Routes.SIGNUP} variant={VariantQuestion.PRIMARY}/>
            </div>
            
        </form>
    )
}

export default LoginForm
