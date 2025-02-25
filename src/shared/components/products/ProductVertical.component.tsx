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

const ProductCardVertical: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  category = "MOTORSPORT",
  rating = 5.0,
  reviews = 404,
}) => {
  return (
    <div className="flex justify-evenly">
        <div className="flex flex-col overflow-hidden w-48 min-w-fit h-80 min-h-fit border border-gray-200 gap-1 p-2 justify-between">
        {/* Imagen del producto  */}
        <div className="flex items-center justify-center overflow-hidden ">
            {image ? (
            <Image
                src={image}
                alt={name}
                width={176}
                height={208}
                className="object-cover"
            />
            ) : (
            <span className="text-gray-500 ">Placeholder</span>
            )}
        </div>

        {/* Información del producto  */}
        <div className="w-2/3">
            {/* Categoría  */}
            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 uppercase">
            {category}
            </span>

            {/* Nombre del producto  */}
            <h3 className="text-lg font-extralight mt-1">{name}</h3>

            

            {/* Precio  */}
            <p className="text-2xl font-bold mt-2">{price}</p>

            {/* Rating  */}
            <div className="flex items-center gap-1 text-blue-500 text-sm mt-1">
            <span className="font-semibold">{rating}</span>
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="none" />
            ))}
            <span className="text-gray-400 text-xs">({reviews})</span>
            </div>
            {/* Cuotas */}
            {/* <p className="text-gray-500 text-sm">
            en <span className="font-semibold">{installments}</span>
            </p> */}
        </div>
        </div>
    </div>
  );
};

export default ProductCardVertical;
