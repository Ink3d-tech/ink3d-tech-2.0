import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard.component";

// Definimos la interfaz para los productos
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

// Definimos los productos por categoría con tipado correcto
const allProducts: Record<string, Product[]> = {
  remeras: [
    {
      id: 1,
      name: "Oversize cut t-shirt JDM MAZDA RX7",
      price: "$39.900",
      description: "Special edition for JDM lovers",
      category: "MOTORSPORT",
      image: "/images/remera1.png",
    },
    {
      id: 2,
      name: "JDM Nissan Skyline GTR T-shirt",
      price: "$42.500",
      description: "Premium t-shirt with exclusive design",
      category: "MOTORSPORT",
      image: "/images/remera1.png",
    },
    {
      id: 3,
      name: "Oversize cut t-shirt JDM MAZDA RX7",
      price: "$39.900",
      description: "Special edition for JDM lovers",
      category: "MOTORSPORT",
      image: "/images/remera1.png",
    },
    {
      id: 4,
      name: "JDM Nissan Skyline GTR T-shirt",
      price: "$42.500",
      description: "Premium t-shirt with exclusive design",
      category: "MOTORSPORT",
      image: "/images/remera1.png",
    },
  ],
  buzos: [
    {
      id: 1,
      name: "Buzo corte Oversize JDM MAZDA RX7",
      price: "$39.900",
      description: "Special edition for JDM lovers",
      category: "MOTORSPORT",
      image: "/images/buzo1.png",
    },
    {
      id: 2,
      name: "Buzo JDM Nissan Skyline GTR",
      price: "$42.500",
      description: "Premium t-shirt with exclusive design",
      category: "MOTORSPORT",
      image: "/images/buzo1.png",
    },
    {
      id: 3,
      name: "Buzo corte Oversize JDM MAZDA RX7",
      price: "$39.900",
      description: "Special edition for JDM lovers",
      category: "MOTORSPORT",
      image: "/images/buzo1.png",
    },
    {
      id: 4,
      name: "Buzo JDM Nissan Skyline GTR",
      price: "$42.500",
      description: "Premium t-shirt with exclusive design",
      category: "MOTORSPORT",
      image: "/images/buzo1.png",
    },
  ],
  pantalones: [
    {
      id: 1,
      name: "Pantalón corte Oversize JDM MAZDA RX7",
      price: "$39.900",
      description: "Special edition for JDM lovers",
      category: "MOTORSPORT",
      image: "/images/pantalon1.jpg",
    },
    {
      id: 2,
      name: "Pantalón JDM Nissan Skyline GTR",
      price: "$42.500",
      description: "Premium t-shirt with exclusive design",
      category: "MOTORSPORT",
      image: "/images/pantalon1.jpg",
    },
    {
      id: 3,
      name: "Pantalón corte Oversize JDM MAZDA RX7",
      price: "$39.900",
      description: "Special edition for JDM lovers",
      category: "MOTORSPORT",
      image: "/images/pantalon1.jpg",
    },
    {
      id: 4,
      name: "Pantalón JDM Nissan Skyline GTR",
      price: "$42.500",
      description: "Premium t-shirt with exclusive design",
      category: "MOTORSPORT",
      image: "/images/pantalon1.jpg",
    },
  ],
};

// Tipamos las props del componente
interface ProductListProps {
  category: keyof typeof allProducts; // Solo permite valores que existen en `allProducts`
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const products = allProducts[category] || [];

  return (
    <div className="max-w-9xl my-6 mx-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-left m-3">Novedades</h2>
      <div className="w-full h-px bg-gray-300 my-4"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div className="w-full h-px bg-gray-300 my-2"></div>

      <div className="flex justify-between items-center m-4 -my-1 mb-2">
        <Link href="/todos-los-productos" className="text-blue-600 font-semibold hover:underline">
          Ver más
        </Link>

        <Link href="/todos-los-productos" className="text-blue-600">
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
