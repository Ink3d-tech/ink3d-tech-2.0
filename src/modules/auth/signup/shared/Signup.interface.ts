export interface SignupInterface {
    id: string; 
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    [key: string]: string;
}
