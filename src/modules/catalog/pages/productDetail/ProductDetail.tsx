"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/shared/components/buttons/BackButton.component";
// import { Heart } from "lucide-react";
import {
  Product,
  useCart,
} from "@/modules/checkout/pages/cart/context/Cart.context";
import { API_BACK } from "@/shared/config/api/getEnv";
import ProductsComponent from "@/modules/checkout/pages/cart/components/Products.component";
import SkeletonProductDetail from "./SkeletonProductDetail";
import SkeletonProducts from "@/modules/checkout/pages/cart/components/SkeletonProducts";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [isFavorited, setIsFavorited] = useState(false);
  // const [showNotification, setShowNotification] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [availableSizes, setAvailableSizes] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const getStyleClasses = (style: string | undefined) => {
    if (!style) return "bg-blue-500 text-white"; // Azul por defecto

    const normalizedStyle = style.trim().toLowerCase();

    const styleColors: Record<string, string> = {
      motorsport: "bg-red-500 text-white", // Rojo con letras blancas
      asian: "text-green-700 bg-green-200", // Verde claro con verde oscuro
      streetwear: "bg-black text-white", // Negro con letras blancas
    };

    return styleColors[normalizedStyle] || "bg-blue-500 text-white"; // Azul por defecto si no coincide
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

        const allSizesOutOfStock = sameNameProducts.every(
          (item) => item.stock === 0
        );
        if (allSizesOutOfStock) {
          setSelectedSize(null);
        } else {
          setSelectedSize(data.size || null);
        }

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
    setSelectedImage(imageUrl || "/placeholder-image.png");
  };

  // const handleFavoriteClick = () => {
  //   setIsFavorited(!isFavorited);
  //   setShowNotification(true);

  //   setTimeout(() => {
  //     setShowNotification(false);
  //   }, 2000);
  // };

  if (loading) return (
    <>
      <SkeletonProductDetail/>
      <SkeletonProducts/>
    </>
  )
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!product)
    return (
      <p className="text-gray-500 text-center mt-10">Producto no encontrado</p>
    );

  return (
    <div>
      <BackButton tab="Producto" />
      <div className="relative py-14">
      {/* 🎨 Fondo con desenfoque (ahora correctamente detrás) */}
      <div
    className="absolute inset-0 bg-repeat blur-xl "
    style={{
      backgroundImage: "url('/images/textures/8.jpg')",
      backgroundSize: "1000px", // Ajusta el tamaño del mosaico a tu gusto
      backgroundPosition: "center",
      backgroundRepeat: "repeat", // Hace que la imagen se repita en mosaico
      filter: "blur(10px)", // Aplica el desenfoque
    }}
  />
      <div className="absolute inset-0 bg-white/30"></div>
      <div className="flex items-center justify-center py-10 pb-2">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-6xl w-full flex flex-col md:flex-row gap-10 relative">
          
          {product.stock === 0 && (
            <div className="absolute top-3 left-0 bg-gray-800 text-white text-xs font-semibold uppercase px-4 py-1 rounded-br-lg rounded-tr-lg shadow-md">
              Sin Stock
            </div>
          )}
          {/* <button
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
            </div> */}
          {/* )} */}

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
                    className={`rounded-md border-2 ${selectedImage === img ? "border-black" : "border-gray-300"
                      } transition-all`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between flex-grow gap-2 w-full md:w-2/5 ">
            <h2 className="text-4xl font-bold">{product.name}</h2>
            <div className="flex gap-2">


              <span className={`text-xs font-bold px-2 py-1 uppercase mt-2 inline-block rounded-md ${getStyleClasses(product.style)}`} >
                {product.style || "Sin estilo"}
              </span>


            </div>
            <p className="text-gray-500 text-lg whitespace-pre-line line-clamp-6">
              {product.description}
            </p>
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
                  const isAvailable = productWithSize && productWithSize.stock > 0;

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition ${selectedSize === size
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
              className={`px-6 py-3 rounded-lg transition mt-4 
                ${
                  product.stock > 0
                    ? "bg-black text-white hover:bg-gray-700"
                    : "bg-black text-white cursor-not-allowed opacity-90"
                }`}
              onClick={() => handleAddToCart(product)}
              disabled={product.stock === 0 || !selectedSize}
            >
              {product.stock > 0 ? "Agregar al carrito 🛒" : "Sin stock"}
            </button>
          </div>
        </div>
      </div>
      </div>
      <div className="relative index-10">
        <ProductsComponent />
      </div>
    </div>
    
  );
}
