import Image from "next/image";
import { IOrder } from "@/modules/checkout/pages/cart/interfaces/cartService.interface";
import { ProductInterface, useProducts } from "../../manager/context/Products.context";
import Link from "next/link";


const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const CardProduct = ({product, status}: {product: ProductInterface | undefined, status: string}) => {
  if(!product) return

  return (
    <div className="flex gap-4 items-center">
      <Image src={product.image[0]} alt={product.name} width={60} height={60} className="rounded-md" />
      <div className="flex flex-col w-48">
        <div className="flex justify-end w-full">
          <p className="w-20 text-green-600 font-semibold capitalize bg-green-100 rounded-full text-center">{status}</p>

        </div>
        {/* <p className="font-semibold">Llegó el {arrivalDate}</p>
        <p className="text-gray-600 text-sm">Podés devolverlo hasta el {returnDate}</p> */}
        <p className="text-gray-800 font-medium truncate">{product.name}</p>
        <p className="text-gray-400 text-sm cursor-pointer line-clamp-2">{product.description}</p>
      </div>
      <div className="flex justify-end w-full">
        <div className="flex flex-col gap-2 border">
          <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded text-sm" disabled>
              <Link href={`/productDetail/${product.id}`}>
                Volver a comprar
              </Link>
          </button>

          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
            Ver compra
          </button>
        </div>
      </div>
    </div>
  )
}



const OrderCard = ({ order }: { order: IOrder }) => {
  const { getProductById } = useProducts();
  const { createdAt, status, orderDetails, id } = order;

  return (
    <div className="p-4 w-full max-w-lg border rounded-lg shadow-md">
      <p className="text-gray-900 text-md font-semibold ">{formatDate(createdAt)}</p>
      <hr className="my-2"/>
      <div className="flex flex-col gap-10">
        {order.orderDetails.map((detail) => <CardProduct key={detail.productId} product={getProductById(detail.productId)} status={status}/>)}
      </div>
    </div>
  );
};

export default OrderCard;