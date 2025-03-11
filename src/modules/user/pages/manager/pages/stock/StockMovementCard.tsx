import Image from "next/image";
import { Package, Layers } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string[];
  size: string;
  style: string;
  discount: number;
  isActive: boolean;
  category: {
    id: string;
    name: string;
  };
}

interface StockMovement {
  id: string;
  quantity: number;
  type: string;
  reason: string;
  createdAt: string;
  product: Product | null;
}

interface StockMovementCardProps {
  movement: StockMovement;
}

export default function StockMovementCard({ movement }: StockMovementCardProps) {
  if (!movement.product) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-80 mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {movement.product.name}
      </h3>

      <div className="relative w-full h-80 rounded-md overflow-hidden my-3">
        {movement.product.image.length > 0 && (
          <Image
            src={movement.product.image[0]}
            alt={movement.product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        )}
      </div>

      <p className="text-gray-500 text-sm text-center">{movement.product.description}</p>
      <p className="text-teal-600 text-lg font-bold text-center mt-1">${movement.product.price}</p>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600 text-sm">
          <Layers className="w-4 h-4 text-teal-500 mr-2" />
          <span>
            Stock Inicial: <strong>{movement.product.stock + movement.quantity}</strong>
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Package className="w-4 h-4 text-blue-500 mr-2" />
          <span>
            Productos Vendidos: <strong>{Math.abs(movement.quantity)}</strong>
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Layers className="w-4 h-4 text-teal-500 mr-2" />
          <span>
            Stock Actual: <strong>{movement.product.stock}</strong>
          </span>
        </div>
      </div>

      <p className="text-gray-500 text-sm text-center">
        🏷️ Categoría: {movement.product.category?.name || "Sin categoría"}
      </p>
      <p className="text-gray-500 text-sm text-center">
        🎨 Estilo: {movement.product.style || "No especificado"}
      </p>

      {movement.product.discount > 0 && (
        <p className="text-red-500 text-sm text-center">
          🔥 Descuento: {movement.product.discount}%
        </p>
      )}
    </div>
  );
}
