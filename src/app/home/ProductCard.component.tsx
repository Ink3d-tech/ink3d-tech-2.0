import Image from "next/image";
import { Star } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: string;
  image?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  installments?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  category = "MOTORSPORT",
  rating = 5.0,
  reviews = 404,
  installments = "6 installments of $6,650",
}) => {
  return (
    <div className="flex flex-col lg:flex-row bg-white overflow-hidden max-w-full lg:max-w-6xl border-">
      {/* Imagen del producto */}
      <div className="flex items-center justify-center overflow-hidden w-full lg:w-1/2">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            className="w-full h-auto max-h-96 object-contain"
          />
        ) : (
          <span className="text-gray-500">Placeholder</span>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-2 flex flex-col justify-between w-full lg:w-1/2 space-y-4">
        {/* Categoría */}
        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 uppercase self-start">
          {category}
        </span>

        {/* Nombre del producto */}
        <h3 className="text-lg font-semibold">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-blue-500 text-sm">
          <span className="font-semibold">{rating}</span>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" stroke="none" />
          ))}
          <span className="text-gray-400 text-xs">({reviews})</span>
        </div>

        {/* Precio */}
        <p className="text-2xl font-bold">{price}</p>

        {/* Cuotas */}
        <p className="text-gray-500 text-sm">
          en <span className="font-semibold">{installments}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
