import { InputInterface } from "../../../shared/interfaces/Input.interface";
import { LoginInterface } from "../../../shared/interfaces/Login.interface";


export const formFields: InputInterface[] = [
    { id: 1, name: "email", type: "text", value:"email", placeholder: "Email"},
    { id: 2, name: "password", type: "password", value:"password", placeholder: "Password" }
]

export const formInitial: LoginInterface = {
    email: "", 
    password: "", 
}

export const requiredFields: string[] = ["email", "password"]