import { Dispatch, SetStateAction } from "react";

export interface IProduct {
    id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    stock: number;
    units: number;
    talle: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    size: string;
    stock: number;
    description: string;
    units: number;
    category: {
      id: string;
      name: string;
    };
    image: string;
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