"use client"

import { useAuth } from "../../shared/context/Auth.context"
import { useForm } from "../../shared/hooks/useForm.hook"
import { SignupInterface } from "./shared/Signup.interface"

import SignupForm from "./shared/Signup.component"
import { formInitial, requiredFields } from "./shared/Signup.config"
import { validateFormSignup } from "./shared/Signup.validate"
import Wrapper from "../../shared/components/Wrapper"
import { Routes } from "../../shared/enums/Routes"


export default function Signup() {
    const { signup } = useAuth()
    
    const {formErrors, form, handlerChange, handlerSubmit, isLoading} = useForm<SignupInterface>({
        formInitial,
        requiredFields,
        messageSuccess: "Signup success",
        authAction: signup,
        validateForm: validateFormSignup,
        redirectSuccessRoute: Routes.LOGIN
    })

    return (
        <Wrapper>
            {/* <HeaderBackBtn name={"Registro"} route={Routes.LOGIN}/> */}
            <SignupForm
                form={form}
                formErrors={formErrors}
                handlerChange={handlerChange}
                handlerSubmit={handlerSubmit}
                isLoading={isLoading}
            />
        </Wrapper>
    )  
}

