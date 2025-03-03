import { Product, useCart } from "../context/Cart.context";
import { Fire, getAlert } from "./FireAlert.component";

export interface ICartItemProps {
  className?: string;
  product: Product;
}

// const {id, name, image, category, price, stock, talle, units} = ProductProps;

// const [productNumber, setProductNumber] = useState<number>(units);

// const handleProductIncrease = () => {
//     setProductNumber(productNumber+1);
//     const newCart: IProduct[] = JSON.parse(localStorage.getItem(`cart_${getIdUser(token)}`) || "[]");
//     newCart.map((product) => {
//         if(product.id === id) {
//             product.units++;
//         }
//     localStorage.setItem(`cart_${getIdUser(token)}`, JSON.stringify(newCart));
//     })
//     setTotalPrice(totalPrice + price)
// }

// const handleProductDecrease = () => {
//     setProductNumber(productNumber-1);
//     const newCart: IProduct[] = JSON.parse(localStorage.getItem(`cart_${getIdUser(token)}`) || "[]");
//     newCart.map((product) => {
//         if(product.id === id) {
//             product.units--;
//         }
//     localStorage.setItem(`cart_${getIdUser(token)}`, JSON.stringify(newCart));
//     })
//     setTotalPrice(totalPrice + price)
//     setTotalPrice(totalPrice - price)
// }

// const handleProductDelete = () => {
//     const newCart = productsOnCart.filter(product => product.id !== id);
//     setProductsOnCart(newCart)
//     localStorage.setItem(`cart_${getIdUser(token)}`, JSON.stringify(newCart));
//     const calcTotal = totalPrice - productNumber*price
//     setTotalPrice(calcTotal);
// }

export default function CartItem({
  product,
  className = "p-4 bg-white rounded-lg shadow-md",
}: ICartItemProps) {
  const {
    removeProductFromCart,
    handleProductDecrease,
    handleProductIncrease,
  } = useCart();
  const { image, name, price, units, id, stock } = product;
  return (
    <div className={className}>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div
          className="col-span-2 w-24 h-24 bg-contain bg-no-repeat bg-center rounded-lg"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="col-span-5">
          <h2 className="text-lg font-semibold truncate max-w-[250px]">
            {name}
          </h2>
        </div>
        <div className="col-span-3">
          <span className="text-gray-500 text-center flex sm:flex-row">
            <button
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 transition"
              onClick={(event) => {
                event.preventDefault();
                handleProductDecrease(id);
              }}
            >
              -
            </button>
            <span className="bg-white text-gray-900 px-4 py-1 border border-gray-300">
              {units}
            </span>
            <button
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 transition"
              onClick={(event) => {
                event.preventDefault();
                handleProductIncrease(id, stock);
              }}
            >
              +
            </button>
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-xl font-bold">${(price * units).toFixed(2)}</span>
        </div>
        <div className="col-span-12 text-right">
          <button
            onClick={() => {
              getAlert("Delete", () => {
                Fire("Deleted!");
                removeProductFromCart(product.id);
              });
            }}
            className="text-red-600 hover:text-red-800 bg-none px-4 py-2 hover:bg-red-100 my-2 rounded-md"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
