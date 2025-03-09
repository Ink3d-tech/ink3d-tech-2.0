"use client"

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

export default function Input ({
    id,
    type,
    name,
    value,
    onChange,
    error
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const pathname = usePathname()
    
    return (
        <div className="relative mt-6">
    
            <label
                htmlFor={String(id)}
                className={`capitalize absolute left-[8px] transition-all duration-300 text-inputSecondary
                ${isFocused || value?.length > 0 ? `text-xs left-3 top-0 bg-transparent px-1` : `text-base top-3 `}`}>
                {name}
            </label>

            <input
                id={String(id)}
                className="w-full px-3 py-3 border border-inputSecondary rounded-md text-inputSecondary bg-inputPrimary shadow-md focus:outline-none focus:border-primary"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {error && pathname === "/signup" && <p className="absolute text-red-600 text-sm font-semibold tracking-tight ml-1">{error}</p>}
        </div>
    )

}