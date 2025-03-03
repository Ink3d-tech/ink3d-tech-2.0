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
      localStorage.setItem("token", token); // Guarda el token en localStorage
    }
  },[]);

  return (
    <div className="flex flex-col bg-gray-300">
      <div className="mb-6">
        {/* <BackButton tab="Inicio"/> */}
      </div>
      <Carousel imageIds={[1, 2, 3]} />
      <ButtonsMini />
      <ProductList category="remeras" />
      <StaticCarousel imageIds={[4, 5, 6]} />
      <ProductList category="buzos"/>
      <StaticCarousel imageIds={[7, 8, 9]} />
      <ProductList category="pantalones"/>
      <ScrollToTop />
    </div>
  );
}
