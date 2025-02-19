export interface SignupInterface {
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    phone: number,
    address: string,
    city: string,
    country: string,
    bio: string
}

export interface UserInterface extends SignupInterface {}

const user: SignupInterface = {
    email: "david@gmail.com",
    password: "david123",
    confirmPassword: "david123",
    name: "david",
    phone: 1234,
    address: "calle falsa 123",
    city: "falsa",
    country: "falsa",
    bio: "biografica"
}
