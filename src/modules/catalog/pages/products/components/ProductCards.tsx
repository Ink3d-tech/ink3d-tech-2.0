import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: {
    id: string;
    name: string;
  };
  image: string[];
  stock: number;
  style: string;
}

interface ProductCardProps {
  product: Product;
  getStyleClasses: (style: string | undefined) => string;
}

export default function ProductCards({ product, getStyleClasses }: ProductCardProps) {
  return (
    <Link key={product.id} href={`/productDetail/${product.id}`} passHref>
      <div className="relative flex flex-col bg-white overflow-hidden rounded-lg cursor-pointer transition-transform group shadow-md">
        
        {product.stock === 0 && (
          <div className="absolute top-3 left-0 bg-gray-800 text-white text-xs font-semibold uppercase px-4 py-1 rounded-br-lg rounded-tr-lg shadow-md">
            Sin Stock
          </div>
        )}

        <span
          className={`absolute top-3 right-0 text-xs font-semibold uppercase px-4 py-1 
            rounded-bl-lg rounded-tl-lg shadow-md opacity-0 
            group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-[100] 
            ${getStyleClasses(product.style)}`}
        >
          {product.style || "Sin estilo"}
        </span>

        <div className="relative w-full h-[440px] aspect-[4/5] overflow-hidden">
          <Image
            src={product.image[0]}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-full object-cover rounded transition duration-300 transform group-hover:opacity-0"
          />

          <Image
            src={product.image[1] ? product.image[1] : product.image[0]}
            alt={product.name}
            width={800}
            height={800}
            className="absolute top-0 left-0 w-full h-full object-cover rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        <div className="p-3 text-center">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 text-sm truncate">{product.description}</p>
          <p className="text-lg font-bold mt-1 text-green-700">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
