
import VerMas from "@/shared/components/buttons/VerMas.component";
import ProductCard from "./ProductCard.component";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

const allProducts: Record<string, Product[]> = {
  remeras: [
    { id: 1, name: "Oversize JDM MAZDA RX7", price: "$39.900", description: "JDM lovers", category: "MOTORSPORT", image: "/images/remera1.png" },
    { id: 2, name: "JDM Nissan Skyline GTR", price: "$42.500", description: "Exclusive design", category: "MOTORSPORT", image: "/images/remera1.png" },
    { id: 3, name: "Oversize JDM MAZDA RX7", price: "$39.900", description: "JDM lovers", category: "MOTORSPORT", image: "/images/remera1.png" },
    { id: 4, name: "JDM Nissan Skyline GTR", price: "$42.500", description: "Exclusive design", category: "MOTORSPORT", image: "/images/remera1.png" },
    { id: 5, name: "JDM Classic Edition", price: "$45.000", description: "Limited edition", category: "MOTORSPORT", image: "/images/remera1.png" },
    { id: 6, name: "Honda Civic Type R Shirt", price: "$38.900", description: "For Honda fans", category: "MOTORSPORT", image: "/images/remera1.png" },
    { id: 7, name: "Toyota Supra Turbo", price: "$44.000", description: "JDM culture", category: "MOTORSPORT", image: "/images/remera1.png" },
    { id: 8, name: "Subaru WRX STI Edition", price: "$41.500", description: "Premium quality", category: "MOTORSPORT", image: "/images/remera1.png" },
  ],
  buzos: [
    { id: 1, name: "Oversize JDM MAZDA RX7", price: "$39.900", description: "JDM lovers", category: "MOTORSPORT", image: "/images/buzo1.png" },
    { id: 2, name: "JDM Nissan Skyline GTR", price: "$42.500", description: "Exclusive design", category: "MOTORSPORT", image: "/images/buzo1.png" },
    { id: 3, name: "Oversize JDM MAZDA RX7", price: "$39.900", description: "JDM lovers", category: "MOTORSPORT", image: "/images/buzo1.png" },
    { id: 4, name: "JDM Nissan Skyline GTR", price: "$42.500", description: "Exclusive design", category: "MOTORSPORT", image: "/images/buzo1.png" },
    { id: 5, name: "JDM Classic Edition", price: "$45.000", description: "Limited edition", category: "MOTORSPORT", image: "/images/buzo1.png" },
    { id: 6, name: "Honda Civic Type R Shirt", price: "$38.900", description: "For Honda fans", category: "MOTORSPORT", image: "/images/buzo1.png" },
    { id: 7, name: "Toyota Supra Turbo", price: "$44.000", description: "JDM culture", category: "MOTORSPORT", image: "/images/buzo1.png" },
    { id: 8, name: "Subaru WRX STI Edition", price: "$41.500", description: "Premium quality", category: "MOTORSPORT", image: "/images/buzo1.png" },
  ],
  pantalones: [
    { id: 1, name: "Oversize JDM MAZDA RX7", price: "$39.900", description: "JDM lovers", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
    { id: 2, name: "JDM Nissan Skyline GTR", price: "$42.500", description: "Exclusive design", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
    { id: 3, name: "Oversize JDM MAZDA RX7", price: "$39.900", description: "JDM lovers", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
    { id: 4, name: "JDM Nissan Skyline GTR", price: "$42.500", description: "Exclusive design", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
    { id: 5, name: "JDM Classic Edition", price: "$45.000", description: "Limited edition", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
    { id: 6, name: "Honda Civic Type R Shirt", price: "$38.900", description: "For Honda fans", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
    { id: 7, name: "Toyota Supra Turbo", price: "$44.000", description: "JDM culture", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
    { id: 8, name: "Subaru WRX STI Edition", price: "$41.500", description: "Premium quality", category: "MOTORSPORT", image: "/images/pantalon1.jpg" },
  ],
};

interface ProductListProps {
  category: keyof typeof allProducts; 
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const products = allProducts[category] || [];

  return (
    <div className="max-w-8xl my-6 mx-6 bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 text-left m-3">Novedades</h2>
      <div className="w-full h-px bg-gray-300 my-4"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <VerMas href={`/products/${category}`} />
    </div>
  );
};

export default ProductList;