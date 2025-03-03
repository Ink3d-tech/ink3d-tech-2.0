
import { ErrorsInterface } from "../../../shared/interfaces/Error.interface"
import { SignupInterface } from "./Signup.interface"

export const validateFormSignup = (form: SignupInterface, requiredFields: string[]): ErrorsInterface => {
    const currentErrors: ErrorsInterface = {}

    requiredFields.forEach((field) => {
        switch (field) {
            case "email":
                if (!form.email) currentErrors.email = "El email es obligatorio";   
                else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) 
                    currentErrors.email = "Formato de email inválido";
                break;
        
            case "password":
                if (!form.password) currentErrors.password = "La contraseña es obligatoria";
                else if (form.password.length < 8) currentErrors.password = "Debe tener al menos 8 caracteres";
                else if (!/[A-Z]/.test(form.password)) currentErrors.password = "Debe contener al menos una letra mayúscula";
                else if (!/\d/.test(form.password)) currentErrors.password = "Debe contener al menos un número";
                else if (!/[\W_]/.test(form.password)) currentErrors.password = "Debe contener al menos un carácter especial";
                
                break;
        
            case "confirmPassword":
                if (!form.confirmPassword) currentErrors.confirmPassword = "Debes confirmar tu contraseña";
                else if (form.password !== form.confirmPassword) 
                    currentErrors.confirmPassword = "Las contraseñas no coinciden";
                
                break;
        
            case "name":
                if (!form.name) currentErrors.name = "El nombre es obligatorio";
                else if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.name)) 
                    currentErrors.name = "El nombre solo puede contener letras y espacios";
                
                break;
        
            default:
                break; 
        }   
    })
    return currentErrors 
} 