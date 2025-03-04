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

const API_BACK = process.env.NEXT_PUBLIC_API

export enum LoginFields {
    ENTER = "Entrar",
    GOOGLE = "Inciar sesión con Google",
    PASSWORD = "¿Olvidaste tu contraseña?",
    ACCOUNT = "¿Ya tienes una contraseña?",
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

    const handleGoogleAuth = () => {
        window.location.href = `${API_BACK}/auth/google/login`; 
    }

    return (
        <form onSubmit={handlerSubmit} className="flex flex-col px-4 mx-auto max-w-[402px]">
            <FormComponent 
                form={form}
                handlerChange={handlerChange}
                inputs={formFields}
                formErrors={formErrors}
            />
            <Question question={LoginFields.PASSWORD} href={"#"} variant={VariantQuestion.PRIMARY}/>

            <ButtonBase name={LoginFields.ENTER} isLoading={isLoading} variant={BtnVariant.PRIMARY}/>

            <Divider letter={LoginFields.OR}/>

            {/* <ButtonBase name={LoginFields.GOOGLE} variant={BtnVariant.GOOGLE}/> */}
            <button
                type="button"
                className="flex items-center justify-center py-2 rounded-md font-medium text-[14px] bg-white text-black border-gray-400"
                onClick={handleGoogleAuth}
                >
                <FcGoogle size={20} /> 
                <span>Registrarse con Google</span>
            </button>

            <Spacer value={34}/>
            
            <div className="flex mx-auto">
                <Question question={LoginFields.NEWACCOUNT} href={Routes.SIGNUP} variant={VariantQuestion.SECONDARY}/>
                <Question question={LoginFields.REGISTER} href={Routes.SIGNUP} variant={VariantQuestion.PRIMARY}/>
            </div>
            
        </form>
    )
}

export default LoginForm