import { ErrorsInterface } from "../interfaces/Error.interface"
import { InputInterface } from "../interfaces/Input.interface"
import Input from "./Input"

interface FormProps {
    form: Record<string, string>
    formErrors: ErrorsInterface
    handlerChange: (event: React.ChangeEvent<HTMLInputElement>) => void , 
    inputs: InputInterface[]
}

export function FormComponent({
    form,
    handlerChange,
    inputs,
    formErrors
}: FormProps) {
    return (
        <>
            {inputs.map(({id, name, type, placeholder}) => (
                <Input 
                    key={id}
                    id={id}
                    onChange={handlerChange}
                    type={type}
                    name={name}
                    value={form[name]}
                    placeholder={placeholder}
                    error={formErrors[name]}
                />
            ))}

        </>
    )
}