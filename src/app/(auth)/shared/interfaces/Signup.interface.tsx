export interface SignupInterface {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface UserInterface extends SignupInterface {}


