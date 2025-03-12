import { IOrder } from "@/modules/checkout/pages/cart/interfaces/cartService.interface"

export interface UserInterface {
    id: string
    email: string
    name: string
    phone: string
    address: string
    city: string
    country: string
    bio: string
    role: string
    createdAt: string
    updatedAt: string
    isActive: boolean
    image: string
    orders: IOrder[]
    favorites: string[]
}

export interface UpdateDataUserShipmentInterface {
    phone?: string
    address?: string
    city?: string
    country?: string
}

export interface UpdateDataProfileInterface {
    phone: string
    address: string
    city: string
    country: string
    name: string
    image: string
    email: string
}