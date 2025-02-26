"use client"

import Link from "next/link"

const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-blue-500 w-6 h-6 border-4 border-gray-100 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export enum BtnVariant {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    GOOGLE = "google",
}

interface ButtonBaseProps {
    name: string
    variant: BtnVariant
    href?: string 
    isLoading?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: string
}


export const ButtonBase = ({
    name,
    variant,
    href,
    isLoading,
    onClick
}: ButtonBaseProps) => {

    const loading = isLoading ? "opacity-50 cursor-not-allowed" : ""
    
    const btnDefault = "py-2 rounded-md font-medium text-[14px]"

    const btnVariants = {
        primary: "bg-blue-500 hover:bg-blue-600 border border-blue-700 text-white",
        secondary: "bg-blue-50 hover:bg-blue-100 border border-blue-700 text-[#3483fa]",
        google: "bg-gray-100 hover:bg-gray-300 border-[#DFE0E4] text-[#464A4C]"
    }

    const Action = href ? <Link href={href}>{name}</Link> : name

    return (
        <button 
            onClick={onClick}
            disabled={isLoading}
            className={`${btnDefault} ${loading} ${btnVariants[variant]}`}
        >
            {isLoading ?  <Spinner/> : Action}
        </button>
    )
}
