import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface Product {
  id?: string
  name: string
  description: string
  price: number | ""
  stock: number | ""
  image: string[]
  size: string
  color: string
  discount?: number | ""
  category: string
  isActive?: boolean
  style: string
}

interface ProductCardProps {
  product: Product;
}

const SearchProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/productDetail/${product.id}`} passHref>
      <div className="flex flex-col items-center bg-white overflow-hidden border rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105">
        <div className="w-full overflow-hidden h-64 bg-gray-100 flex items-center justify-center">
          {product.image ? (
            <Image
              src={product.image[0]}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-auto object-cover"
            />
          ) : (
            <span className="text-gray-500">Imagen no disponible</span>
          )}
        </div>

        <div className="p-3 text-center w-full">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-lg font-bold mt-1 text-green-700">${product.price}</p>

          {product.stock === 0 ? (
            <p className="text-red-500 font-semibold">Sin stock</p>
          ) : (
            <div className="flex justify-center items-center text-blue-500 text-sm mt-1">
              <span className="font-semibold">5.0</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="none" />
              ))}
              <span className="text-gray-400 text-xs">(404)</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchProductCard;
