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
      <div className="relative flex flex-col bg-white overflow-hidden rounded-lg cursor-pointer transition-transform group">
        {/* Etiqueta de estilo */}
        <div className="flex gap-2">
          <span
            className={`absolute top-3 right-0 text-xs font-semibold uppercase px-4 py-1 
            rounded-bl-lg rounded-tl-lg opacity-0 shadow-md
            group-hover:opacity-100 
            transition-opacity duration-300 ease-in-out ${getStyleClasses(product.style)}`}
          >
            {product.style || "Sin estilo"}
          </span>
        </div>

        {/* Etiqueta de "Sin Stock" */}
        {product.stock === 0 && (
          <div className="absolute top-3 left-0 bg-gray-800 text-white text-xs font-semibold uppercase px-4 py-1 rounded-br-lg rounded-tr-lg shadow-md opacity-100">
            Sin Stock
          </div>
        )}

        {/* Imagen del producto */}
        <div className="w-full h-96 bg-gray-100">
          <Image
            src={product.image[0] || "/placeholder-image.png"}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="p-3 text-center">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 text-sm truncate">{product.description}</p>
          <p className="text-lg font-bold mt-1 text-green-700">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
