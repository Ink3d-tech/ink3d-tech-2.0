"use client"

import { EyeOffIcon, EyeIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"

export interface InputProps {
    id: number
    type: string
    name: string
    placeholder?: string
    value: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    error: string
}

export default function Input({
    id,
    type,
    name,
    value,
    onChange,
    error
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Estado común para mostrar ambas contraseñas
    const pathname = usePathname()

    const handleShowPasswordToggle = () => {
        setShowPassword(prevState => !prevState); // Alterna el valor de showPassword
    };


    const translations: Record<string, string> = {
        "name": "nombre",
        "email": "correo electrónico",
        "password": "contraseña",
        "confirmPassword": "confirmar contraseña",
      };

    return (
        <div className="relative mt-6">

            <label
                htmlFor={String(id)}
                className={`capitalize absolute left-[8px] transition-all duration-300 text-inputSecondary
                ${isFocused || value?.length > 0 ? `text-xs left-3 top-0 bg-transparent px-1` : `text-base top-3 `}`}>
                {translations[name]}
            </label>

            <input
                id={String(id)}
                className="w-full px-3 py-3 border border-inputSecondary rounded-md text-inputSecondary bg-inputPrimary shadow-md focus:outline-none focus:border-primary"
                type={type === "password" ? (showPassword ? "text" : "password") : type}  // Mostrar o ocultar según el estado
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {/* Mostrar u ocultar contraseña solo para los campos de password y confirmPassword */}
            {(name === "password" || name === "confirmPassword") && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <button 
                    type="button" 
                    onClick={handleShowPasswordToggle} 
                    className="text-gray-500">
                    {showPassword ? (
                        <EyeIcon className="h-5 w-5" />
                    ) : (
                        <EyeOffIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
            )}

            {error && pathname === "/signup" && (
                <p className="absolute text-red-500 space-x-2 text-sm  tracking-tight ml-1">
                    {error}
                </p>
            )}
        </div>
    )
}
