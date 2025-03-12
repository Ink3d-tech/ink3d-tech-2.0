"use client"

import ProductsTable from "./components/ProductsTable";
import FormCreateProduct from "./components/FormCreateProduct";
import { useProducts } from "../../context/Products.context";

export const ManagementProductForm = () => {
    const { products } = useProducts()
    return (
        <section>
            <FormCreateProduct />       
            <ProductsTable products={products}/>
        </section>
    )
}