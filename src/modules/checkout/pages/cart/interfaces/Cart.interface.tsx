import { Dispatch, SetStateAction } from "react";

export interface ICartProduct {
    id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    stock: number;
}

export interface IProduct {
    id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    stock: number;
}

export interface ICartProductProps {
    ProductProps: IProduct;
    totalPrice: number;
    setTotalPrice: Dispatch<SetStateAction<number>>
    productsOnCart: ICartProduct[]
    setProductsOnCart: Dispatch<SetStateAction<ICartProduct[]>>
}
