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
    console.log(token);
    

    if (token) {
      localStorage.setItem("token", token);
    }
  },[]);

  return (
    <div className="flex flex-col bg-gray-300">
      <div className="flex flex-col bg-black">
      <div className="mb-6">
      </div>
      <Carousel />
      <ButtonsMini />
      </div>
      <ProductList categoryName="Ropa" title="Ropa" />
      <StaticCarousel category="MUNDO ASIAN" />
      <ProductList categoryName="Calzado" title="Calzado" />
      <StaticCarousel category="STREETWEAR" />
      <ProductList categoryName="Accesorios" title="Accesorios" />
      <ScrollToTop />
    </div>
  );
}
