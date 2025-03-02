import { Product, useCart } from "./Cart.context";

export interface ICartItemProps {
    className?: string
    product: Product
}

export default function CartItem({ 
    product,
    className = "p-4 bg-white rounded-lg shadow-md"
}: ICartItemProps) {
    const { countProducts, removeProductFromCart } = useCart()
    const {id, image, name, price} = product
    return (
        <div className={className}>
            <div className="grid grid-cols-12 gap-4 items-center">
                    <div 
                        className="col-span-2 w-24 h-24 bg-contain bg-no-repeat bg-center rounded-lg"
                        style={{ backgroundImage: `url(${image})`}}
                    ></div>
                    <div className="col-span-5">
                        <h2 className="text-lg font-semibold truncate max-w-[250px]">
                            {name}
                        </h2>
                    </div>
                    <div className="col-span-2">
                        <span className="text-gray-500 text-center">
                            {countProducts (Number(id))}
                        </span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-xl font-bold">${price}</span>
                    </div>
                    <div className="col-span-12 text-right">
                        <button
                            onClick={() => {
                                removeProductFromCart(Number(id))
                                alert("Función proxima a eliminar producto")
                            }}
                            className="text-red-600 hover:text-red-800 bg-none px-4 py-2 hover:bg-red-100 my-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>

            </div>
        </div>
    );
}
