import { ErrorsInterface } from "../../../shared/interfaces/Error.interface"
import { LoginInterface } from "../../../shared/interfaces/Login.interface"

export const validateLogin = (form: LoginInterface, requiredFields: string[]): ErrorsInterface => {
    const currentErrors: ErrorsInterface = {}

    requiredFields.forEach((field) => {
        switch (field) {
            case "email":
                if(!form.email) currentErrors.email = "Email es requerido"   
                else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) currentErrors.email = "Invalid email format" 
                else break;
            
            case "password":
                if(!form.password) currentErrors.password = "Password  es requerido"
                else if(form.password.length < 6) currentErrors.password = "Contraseña inválida"
                else break
        }
    })
    return currentErrors
}

export default validateLogin