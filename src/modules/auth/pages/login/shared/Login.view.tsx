"use client"

import { useAuth } from "@/modules/auth/shared/context/Auth.context";
import { Routes } from "../../../shared/enums/Routes";
import { useForm } from "../../../shared/hooks/useForm.hook";
import { LoginInterface } from "../../../shared/interfaces/Login.interface";
import LoginForm from "./LoginForm.component";
import { formInitial, requiredFields } from "./Login.config";
import validateLogin from "./Login.validate";

export default function LoginView() {  
    const { login } = useAuth()

    const { formErrors, form, handlerChange, handlerSubmit, isLoading } = useForm<LoginInterface>({
        formInitial,
        requiredFields,
        messageSuccess: "Login success",
        authAction: login,
        validateForm: validateLogin,
        redirectSuccessRoute: Routes.HOME
    })

    return (
        <LoginForm 
            form={form}
            formErrors={formErrors}
            isLoading={isLoading}
            handlerChange={handlerChange}
            handlerSubmit={handlerSubmit}
        />
    );
}