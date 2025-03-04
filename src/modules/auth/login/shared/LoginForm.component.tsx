"use client";

import { useEffect, useState } from "react";  // Importamos useEffect y useState
import { BtnVariant, ButtonBase } from "@/modules/auth/shared/components/buttons/Button.component";
import { FormComponent } from "@/modules/auth/shared/components/Form.component";
import { LoginInterface } from "@/modules/auth/shared/interfaces/Login.interface";
import { Question, VariantQuestion } from "@/modules/auth/shared/components/Question.component";
import { formFields } from "@/modules/auth/login/shared/Login.config";
import { Divider } from "@/modules/auth/shared/components/Divider.component";
import { Spacer } from "@/modules/auth/shared/components/Spacer";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { API_BACK } from "@/shared/config/api/getEnv";

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
    handlerSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isLoading: boolean;
}

export const LoginForm: React.FC<LoginProps> = ({
    form,
    handlerChange,
    formErrors,
    handlerSubmit,
    isLoading
}) => {
    // Estado para verificar si estamos en el cliente
    const [isClient, setIsClient] = useState(false);

    // useEffect para actualizar el estado cuando el componente se monte
    useEffect(() => {
        setIsClient(true);  // Cambiamos a true una vez que el componente se haya montado en el cliente
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handlerSubmit(e);
            await Swal.fire({
                title: "Inicio de sesión exitoso",
                text: "Bienvenido de nuevo",
                icon: "success",
                confirmButtonText: "Aceptar"
            });
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            await Swal.fire({
                title: "Error",
                text: "No se pudo iniciar sesión. Revisa tus datos",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    };

    const handleGoogleAuth = () => {
        if (isClient) {  // Solo ejecutamos si estamos en el cliente
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
        <form onSubmit={handleSubmit} className="flex flex-col px-4 mx-auto max-w-[400px]">
            <FormComponent 
                form={form}
                handlerChange={handlerChange}
                inputs={formFields}
                formErrors={formErrors}
            />
            
            <Question question={LoginFields.PASSWORD} href={"#"} variant={VariantQuestion.PRIMARY} />

            <ButtonBase name={LoginFields.ENTER} isLoading={isLoading} variant={BtnVariant.PRIMARY} />

            <Divider letter={LoginFields.OR} />

            <button
                type="button"
                className="flex items-center justify-center py-2 rounded-md font-medium text-[14px] bg-white text-black border-gray-400"
                onClick={handleGoogleAuth}
            >
                <FcGoogle size={20} className="mr-2" /> 
                <span>{LoginFields.GOOGLE}</span>
            </button>

            <Spacer value={34} />
            
            <div className="flex mx-auto">
                <Question question={LoginFields.NEWACCOUNT} href="/auth/signup" variant={VariantQuestion.SECONDARY} />
                <Question question={LoginFields.REGISTER} href="/auth/signup" variant={VariantQuestion.PRIMARY} />
            </div>
        </form>
    );
};
