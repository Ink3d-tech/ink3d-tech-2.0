"use client";

import Image from "next/image";
import { IOrder } from "@/modules/checkout/pages/cart/interfaces/cartService.interface";
import { ProductInterface, useProducts } from "../../manager/context/Products.context";
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Package, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BACK } from "@/shared/config/api/getEnv";
import { getAuthHeaders } from "../../manager/context/getAuthHeaders";

export const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const CardProduct = ({product}: {product: ProductInterface | undefined}) => {
  if(!product) return

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-24 h-24 rounded-lg overflow-hidden">
        <Image src={product.image[0]} alt={product.name} width={60} height={60} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
      </div>
    </div>
  )
}

const OrderCard = ({ order,  onViewDetails }: { order: IOrder,  onViewDetails: React.Dispatch<React.SetStateAction<IOrder | null>>}) => {
  const { getProductById } = useProducts();
  const [orderPref, setOrderPref] = useState<string | undefined>(undefined);
  const { createdAt, status, orderDetails, id } = order;
  
  useEffect(() => {
    const fetchOrderId = async() => {
      try {
        const res = await axios.get<IOrder>(`${API_BACK}/orders/${order.id}`, getAuthHeaders());
        setOrderPref(res.data.externalReference);
        return
      } catch (error) {
        console.error("Saliendo por el catch a la hora de retomar la compra", error)
      }
    }
    fetchOrderId()
  }, [order.id])

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 mb-6">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">
              Order #{id.slice(0,10)} • {formatDate(createdAt)}
            </span>
          </div>
          <StatusBadge status={status} />
        </div>
        
        {orderDetails.map((detail) => (
            <CardProduct key={detail.productId} product={getProductById(detail.productId)} />
        ))}
        
        <div className="mt-6 flex justify-end">
          <button  onClick={() => onViewDetails(order)} className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            View Details
          </button>
        </div>

        {order.status !== "completed" && (
          <div className="mt-4 border-t pt-4">
            <button 
              onClick={() => {
                const redirect = `https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=${orderPref}`
                window.location.href = redirect
              }}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-6 rounded-xl 
                hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-[1.02] transition-all duration-200
                flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Reanudar compra
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              Complete su pedido para asegurar sus artículos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard
