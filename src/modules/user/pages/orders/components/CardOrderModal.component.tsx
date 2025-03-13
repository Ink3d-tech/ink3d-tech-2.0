import { IOrder } from "@/modules/checkout/pages/cart/interfaces/cartService.interface";
import { X, Truck, Calendar, CreditCard } from "lucide-react";
import { formatDate, StatusBadge } from "./CardOrder.component";
import { ProductInterface, useProducts } from "../../manager/context/Products.context";
import Image from "next/image";


const CardProductDetail = ({product, quantity}: {product: ProductInterface | undefined, quantity: number}) => {
if(!product) return null;

  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image 
            src={product.image[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
            width={100}
            height={100}
        />
        </div>
        <div className="flex-1">
        <h4 className="font-bold text-lg">{product.name}</h4>
        <p className="text-gray-600">{product.description}</p>
        <div className="mt-2 flex items-center gap-4">
            <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
            Size: {product.size}
            </span>
            <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
            Qty: {quantity}
            </span>
            <span className="font-semibold">${product.price}</span>
        </div>
        </div>
    </div>
  )
}


const OrderDetailsModal = ({ order, onClose }: {order: IOrder, onClose: () => void}) => {
    const { getProductById } = useProducts()
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl flex items-center justify-between">
            <h2 className="text-xl font-bold">Detalle de orden #{order.id.slice(0,10)}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
  
          <div className="p-6 space-y-6">
            {/* Order Status and Date */}
            <div className="flex items-center justify-between">
              <StatusBadge status={order.status} />
              <span className="text-gray-600">
                Pedido el {formatDate(order.createdAt)}
              </span>
            </div>
  
            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Productos</h3>
                {order.orderDetails.map((detail) => (
                    <CardProductDetail key={detail.productId} product={getProductById(detail.productId)} quantity={detail.quantity} />
                ))}
            </div>
  
            {/* Shipping Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Detalles del envío
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-gray-700">{"PROXIMAMENTE Dirección"}</p>
                {/* {order.shippingAddress} */}
                <div className="mt-2 flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Entrega estimada: PROXIMAMENTE tiempo de envio</span>
                  {/* {order.estimatedDelivery} */}
                </div>
              </div>
            </div>
  
            {/* Payment Info */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Detalles de pago
              </h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Método de pago</span>
                  {/* Metodo de pago PROXIMAMENTE */}
                  <span>{order.currency}</span> 
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Importe total</span>
                  <span className="font-bold">${order.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
  
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 rounded-b-2xl">
            <button 
              onClick={onClose}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
};

export default OrderDetailsModal