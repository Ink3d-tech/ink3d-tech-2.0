export interface InputProps {
    id: number
    type: string
    name: string
    placeholder?: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error: string
}

export default function Input ({
    id,
    type,
    name,
    placeholder ="",
    value="",
    onChange,
    error
}: InputProps) {
    return (
        <div className="relative mt-4">
            <label htmlFor={String(id)} className={` bg-transparent capitalize ml-1 absolute left-2 top-3 text-inputSecondary transition-all duration-300
            ${(value.length > 0) ? 'text-xs text-left -top-0 left-2 bg-inputPrimary' : 'text-base top-3'}`}>{name}</label>
            <input 
                id={String(id)} 
                className="w-full px-3 py-3 border border-inputSecondary rounded-md text-inputSecondary
                bg-inputPrimary shadow-md"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
            />
            {/* {error && <p className="absolute text-red-600 text-sm font-semibold tracking-tight ml-1">{error}</p>} */}
        </div>
    )
}
