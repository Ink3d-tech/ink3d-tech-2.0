import { BtnVariant, ButtonBase } from "@/app/(auth)/shared/components/button/Button.component";
import { FormComponent } from "../shared/components/Form.component";
import { LoginInterface } from "../shared/interfaces/Login.interface";
import { Question, VariantQuestion } from "../shared/components/Question.component";
import { formFields } from "./Login.config";
import { Divider } from "../shared/components/Divider.component";
import { Spacer } from "../shared/components/Spacer";
import { Routes } from "../shared/enums/Routes";

enum LoginFields {
    ENTER = "Entrar",
    GOOGLE = "Inciar sesión con Google",
    PASSWORD = "¿Olvidaste tu contraseña?",
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
    isLoading,
}) => {
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

            <ButtonBase name={LoginFields.GOOGLE} isLoading={isLoading} variant={BtnVariant.GOOGLE}/>

            <Spacer value={34}/>
            
            <div className="flex mx-auto">
                <Question question={LoginFields.NEWACCOUNT} href={Routes.SIGNUP} variant={VariantQuestion.SECONDARY}/>
                <Question question={LoginFields.REGISTER} href={Routes.SIGNUP} variant={VariantQuestion.PRIMARY}/>
            </div>
            
        </form>
    )
}

export default LoginForm