import { Dispatch, SetStateAction } from "react";

export interface IProduct {
    id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    stock: number;
    units: number
    talle: string
}

export interface IProductMP {
    id: string;
    name: string;
    price: number;
    units: number
}

export interface ICartProductProps {
    ProductProps: IProduct;
    totalPrice: number;
    setTotalPrice: Dispatch<SetStateAction<number>>
    productsOnCart: IProduct[]
    setProductsOnCart: Dispatch<SetStateAction<IProduct[]>>
}

export interface IFilteredCart {
    id: string,
    units: number
}