"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

import { ErrorsInterface } from "../interfaces/Error.interface"
import { Mixin } from "../components/MixinAlert"



interface AxiosErrorResponse {
    message: string;
    statusCode?: number;
    error?: string;
  }
  
  interface AxiosErrorWithResponse {
    response?: {
      data: AxiosErrorResponse;
      status: number;
      statusText: string;
      headers: Record<string, string>;
    };

  }

/**
 * Interfaz que define las propiedades requeridas para usar el hook "useForm"
 *
 * @param { UseFormProps<T> } props - Propiedades requeridas para configurar el hook.
 * @param { T } props.formInitial - Estado inicial del formulario.
 * @param { string[] } props.requiredFields - Lista de campos requeridos.
 * @param { (form: T) => void } props.authAction - Acción asíncrona al enviar el formulario.
 * @param { (form: T, requiredFields: string[]) => ErrorsInterface } props.validateForm - Función para validar el formulario.
 * @param { string } props.messageSuccess - Mensaje mostrado tras éxito en la acción.
 * @param { string } props.redirectSuccessRoute - Ruta de redirección tras el éxito.
 *
 * @returns {{
 *   isLoading: boolean;
 *   formErrors: ErrorsInterface;
 *   form: T;
 *   handlerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
 *   handlerSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
 * }} Un objeto con estado y funciones para manejar el formulario.
 */

interface UseFormProps<T> {
    formInitial: T
    requiredFields: string[]
    authAction: (form: T) => void
    validateForm: (form: T, requiredFields: string[]) => ErrorsInterface
    messageSuccess: string
    redirectSuccessRoute?: string
}

// interface ErrorInterface {
//     error: { response : { data : { message: string } } }
// }


export function useForm<T>({
    formInitial,
    requiredFields,
    authAction,
    validateForm,
    messageSuccess,
    redirectSuccessRoute
}: UseFormProps<T>) {
    const [form, setForm] = useState<T>(formInitial)
    const [formErrors, setFormErrors] = useState<ErrorsInterface>({})
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    /**
     * Maneja el envío del formulario.
     *
     * Valida los campos, ejecuta la acción de autenticación y gestiona la redirección
     * o muestra mensajes de error según corresponda.
     *
     * @param { React.FormEvent<HTMLFormElement> } event - Evento de envío del formulario.
     */
    
    const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const validationErrors = validateForm(form, requiredFields) 
        const keyErrors = Object.keys(validationErrors)

        if (keyErrors.length > 0) {
            setFormErrors(validationErrors);
            Mixin.fire(`Se requiere: \n${keyErrors.join(`\n`)}`, "", "error")  
            return
        } else {
            try {
                setIsLoading(true)

                await authAction(form)
   
                Mixin.fire(messageSuccess, "", "success")
                router.replace(redirectSuccessRoute ? redirectSuccessRoute : "")
            } catch (error) {
                const axiosError = error as AxiosErrorWithResponse; 
                const errorMessage: string = axiosError.response?.data?.message || "Error interno del servidor"
                const errorMessageSpanish = errorMessage === "Email already in use" ? "Correo electrónico ya en uso" : "Credenciales inválidas"
                Mixin.fire("", errorMessageSpanish, "error")
            } finally {
                setIsLoading(false)
            }
        }
    } 

    

    /**
     * Maneja los cambios en los campos del formulario.
     * 
     * Actualiza el estado del formulario y realiza una validación de los campos actualizados.
     * 
     * @param { React.ChangeEvent<HTMLInputElement> } event - Evento de cambio en un campo de formulario.
     */
    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));

        // Validar solo el campo que está cambiando
        setFormErrors(() => ({
            ...validateForm({ ...form, [name]: value }, [name]) // Solo validamos el campo actual
        }));
    };

    return {
        isLoading,
        formErrors,
        form,
        handlerChange,
        handlerSubmit
    }
}
