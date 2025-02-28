"use client";

import { BtnVariant, ButtonBase } from "@/modules/auth/shared/components/buttons/Button.component";
import { FormComponent } from "@/modules/auth/shared/components/Form.component";
import { LoginInterface } from "@/modules/auth/shared/interfaces/Login.interface";
import { Question, VariantQuestion } from "@/modules/auth/shared/components/Question.component"
import { formFields } from "@/modules/auth/pages/login/shared/Login.config";
import { Divider } from "@/modules/auth/shared/components/Divider.component";
import { Spacer } from "@/modules/auth/shared/components/Spacer";
import { Routes } from "@/modules/auth/shared/enums/Routes";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export enum LoginFields {
    ENTER = "Entrar",
    GOOGLE = "Iniciar sesión con Google",
    PASSWORD = "¿Olvidaste tu contraseña?",
    NEWACCOUNT = "¿No tienes una cuenta?",
    REGISTER = "Registrarte",
    OR = "o"
}

interface LoginProps {
    form: LoginInterface;
    handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formErrors: Record<string, string>;
    handlerSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

export default function LoginForm({ form, handlerChange, formErrors, handlerSubmit, isLoading }: LoginProps) {
    return (
        <form onSubmit={handlerSubmit} className="flex flex-col px-4 mx-auto max-w-[400px]">
            <FormComponent 
                form={form}
                handlerChange={handlerChange}
                inputs={formFields}
                formErrors={formErrors}
            />
            <Question question={LoginFields.PASSWORD} href={"#"} variant={VariantQuestion.PRIMARY}/>

            <ButtonBase name={LoginFields.ENTER} isLoading={isLoading} variant={BtnVariant.PRIMARY}/>

            <Divider letter={LoginFields.OR}/>

            <button
                type="button"
                className="flex items-center justify-center py-2 rounded-md font-medium text-[14px] bg-white text-black border-gray-400"
                onClick={() => Swal.fire("Función no disponible aún")}
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
    );
}
