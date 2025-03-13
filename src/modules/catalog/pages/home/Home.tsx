"use client"

import Carousel from "@/modules/catalog/pages/home/components/carrousel/Carrousel.component";
import ProductList from "@/modules/catalog/pages/home/components/products/ProductList.component";
import ScrollToTop from "@/shared/components/buttons/UpButton.component";
import ButtonsMini from "./components/buttons/ButtonsMini.component";
import StaticCarousel from "./components/carrousel/StaticCarousel.component";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    

    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  return (
<div className="relative flex flex-col min-h-screen">
  {/* Capa de fondo con imagen en mosaico y blur */}
  <div
    className="absolute inset-0 bg-repeat blur-xl "
    style={{
      backgroundImage: "url('/images/textures/8.jpg')",
      backgroundSize: "1000px",
      backgroundPosition: "center",
      backgroundRepeat: "repeat",
      filter: "blur(10px)",
    }}
  />
<div className="absolute inset-0 bg-white/30"></div>

  {/* Contenido principal */}
  <div className="relative flex flex-col">
    <div className="flex flex-col bg-black">
      <div className="mb-6"></div>
      <Carousel />
      <ButtonsMini />
    </div>
    <div className="relative">
    <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none"></div>
    <ProductList categoryName="Ropa" title="Ropa" />
    <StaticCarousel category="MUNDO ASIAN" />
    <ProductList categoryName="Calzado" title="Calzado" />
    <StaticCarousel category="STREETWEAR" />
    <ProductList categoryName="Accesorios" title="Accesorios" />
    <ScrollToTop />
    
  </div>
  </div>
</div>
);}