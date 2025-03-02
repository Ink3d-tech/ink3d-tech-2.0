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
  installments = "6 cuotas de $6,650",
}) => {
  return (
    <div className="flex flex-col items-center bg-white overflow-hidden">
      <div className="w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={800} 
            height={800} 
            className="w-full h-auto object-cover"
          />
        ) : (
          <span className="text-gray-500">Imagen no disponible</span>
        )}
      </div>

      <div className="p-2 text-center">
        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 uppercase">
          {category}
        </span>

        <h3 className="text-lg font-semibold mt-2">{name}</h3>

        <div className="flex justify-center items-center text-blue-500 text-sm mt-1">
          <span className="font-semibold">{rating}</span>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" stroke="none" />
          ))}
          <span className="text-gray-400 text-xs">({reviews})</span>
        </div>

        <p className="text-2xl font-bold">{price}</p>

        <p className="text-gray-500 text-sm mt-1">
          en <span className="font-semibold">{installments}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;