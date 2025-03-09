"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/shared/components/buttons/BackButton.component";
import { Heart } from "lucide-react";
import {
  Product,
  useCart,
} from "@/modules/checkout/pages/cart/context/Cart.context";
import { API_BACK } from "@/shared/config/api/getEnv";
import ProductsComponent from "@/modules/checkout/pages/cart/components/Products.component";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [availableSizes, setAvailableSizes] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const getStyleClasses = (style: string | undefined) => {
    if (!style) return "bg-blue-500 text-white";
    const normalizedStyle = style.trim().toLowerCase();
    const styleColors: Record<string, string> = {
      motorsport: "bg-red-500 text-white", 
      asian: "text-green-700 bg-green-200", 
      streetwear: "bg-black text-white", 
   };
  
    return styleColors[normalizedStyle] || "bg-blue-500 text-white"; 
  };

  useEffect(() => {
    if (!id) return;
  
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BACK}/products/${id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        
        const data: Product = await response.json();
  
        if (!data || !data.image || !Array.isArray(data.image)) {
          throw new Error("El producto no tiene imágenes disponibles");
        }
  
        setProduct(data);
        setSelectedImage(data.image.length > 0 ? data.image[0] : "/placeholder-image.png");
  
        const responseAllProducts = await fetch(`${API_BACK}/products`);
        if (!responseAllProducts.ok) throw new Error("Error al obtener los productos");
  
        const allProducts: Product[] = await responseAllProducts.json();
        const sameNameProducts = allProducts.filter((item) => item.name === data.name);
  
        setAvailableSizes(sameNameProducts);
        setSelectedSize(data.size || null);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);
  

  const { handleAddToCart } = useCart();

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl || "/placeholder-image.png"); // ✅ Evita src vacío
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  if (loading)
    return (
      <p className="text-gray-500 text-center mt-10">Cargando producto...</p>
    );
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!product)
    return (
      <p className="text-gray-500 text-center mt-10">Producto no encontrado</p>
    );

  return (
    <div>
      <BackButton tab="Producto" />
      <div className="flex items-center justify-center pt-10 pb-2">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-6xl w-full flex flex-col md:flex-row gap-10 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
            onClick={handleFavoriteClick}
          >
            <Heart
              size={24}
              fill={isFavorited ? "black" : "none"}
              stroke="black"
            />
          </button>

          {showNotification && (
            <div className="absolute -top-9 right-0 bg-black text-white text-sm px-3 py-1 rounded-md shadow-lg animate-fade-in">
              {isFavorited
                ? "Se añadió a favoritos!"
                : "Se quitó de favoritos!"}
            </div>
          )}

          <div className="flex flex-col items-center gap-4 w-full md:w-3/5">
            <div className="rounded-lg bg-white flex items-center justify-center w-[500px] h-[500px]">
              <Image
                src={selectedImage || "/placeholder-image.png"}
                alt={product.name}
                width={500}
                height={500}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {product.image?.slice(0, 5).map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(img)}
                  className="focus:outline-none"
                >
                  <Image
                    src={img || "/placeholder-image.png"}
                    alt={`Vista ${index + 1}`}
                    width={90}
                    height={90}
                    className={`rounded-md border-2 ${
                      selectedImage === img ? "border-black" : "border-gray-300"
                    } transition-all`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between flex-grow gap-2 w-full md:w-2/5">
            <h2 className="text-4xl font-bold">{product.name}</h2>
            <div className="flex gap-2">              
             <span className={`text-xs font-bold px-2 py-1 uppercase mt-2 inline-block rounded-md ${getStyleClasses(product.style)}`} >
                {product.style || "Sin estilo"}
              </span>              
            </div>
            <p className="text-gray-500 text-lg whitespace-pre-line">{product.description}</p>
            <p className="text-4xl font-bold text-black mt-2">
              ${product.price}
            </p>

            <div>
              <p className="text-sm font-bold mb-2">Selecciona tu talla:</p>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => {
                  const productWithSize = availableSizes.find(
                    (item) => item.size === size
                  );
                  const isAvailable =
                    productWithSize && productWithSize.stock > 0;

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : isAvailable
                          ? "hover:bg-gray-200"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={!isAvailable}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-3">
              <h3 className="text-lg font-semibold">Cuidado del producto</h3>
              <p className="text-gray-600 text-sm mt-2">
                Para prolongar la vida útil de esta prenda, lavar a mano o en
                ciclo delicado con agua fría. No usar blanqueador ni secadora.
                Planchar a baja temperatura si es necesario.
              </p>
            </div>

            <button
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition mt-4"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito 🛒
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ProductsComponent />
      </div>
    </div>
  );
}
