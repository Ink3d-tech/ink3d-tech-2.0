import { ProductInterface } from "../../../context/Products.context";



export const PlusOption = ({
    setFormProduct, formProduct
}: {
    setFormProduct: React.Dispatch<React.SetStateAction<ProductInterface>>, 
    formProduct: ProductInterface
}) => {
    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormProduct({
            ...formProduct,
            [name]: type === "checkbox" ? checked : value
        });
    };
    

    return (
        <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Más opciones</h1>
            <div className="flex gap-1">
                <input name="isActive" checked={formProduct.isActive} onChange={handleChangeCheckbox} id="isVisible" type="checkbox" className="p-2 border" />
                <label htmlFor="isVisible">Mostrar en la tienda</label>
            </div>
        </div>
    )
}