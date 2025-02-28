export interface SignupInterface {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserInterface {
    id: string;
    name?: string;  
    email: string;
    role?: string;  
}
