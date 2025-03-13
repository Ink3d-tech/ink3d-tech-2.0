import { ProductInterface } from "../../../context/Products.context";
import ProductRow from "./ProductRow";

export default function ProductsTable({products}: {products: ProductInterface[]}) {
    return (
        <div className="min-h-screen bg-transparent p-8 mt-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Lista de productos</h1>
                <div className="overflow-x-auto">
                    <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
                        <thead className="bg-gray-700">
                            <tr>
                                {["Imagen", "Nombre", "Precio", "Stock", "Talle", "Categoria", "Estado", "Acción"].map((name, index) =>  <th key={index} className="px-6 py-4 text-left text-sm font-medium text-gray-200">{name}</th>)}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {Array.isArray(products) && products.map((product) => <ProductRow key={product.id} product={product}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
