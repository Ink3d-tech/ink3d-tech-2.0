"use client"

import { usePathname } from "next/navigation"

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
    placeholder = "",
    value = "",
    onChange,
    error
}: InputProps) {
    const pathname = usePathname()
    return (
        <div className="relative mt-6">
            <label htmlFor={String(id)} className={`bg-transparent capitalize ml-1 absolute left-2 top-3 text-inputSecondary transition-all duration-300
            ${(value.length > 0) ? 'absolute text-xs text-left -top-0.5 left-2 bg-inputPrimary' : 'text-base top-3'}`}>{name}</label>
            <input 
                id={String(id)} 
                className="w-full px-3 py-3 border border-inputSecondary rounded-md text-inputSecondary
    bg-inputPrimary shadow-md"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

        {error && pathname === "/auth/signup" && <p className="absolute text-red-600 text-sm font-semibold tracking-tight ml-1">{error}</p>}
        </div>
    )
}
