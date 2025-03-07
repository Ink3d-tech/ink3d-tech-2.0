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
      <div className="mb-6">
        {/* <BackButton tab="Inicio"/> */}
      </div>
      <Carousel />
      <ButtonsMini />
      <ProductList categoryId="58389c92-d338-48cd-88bd-fdbc6ef76c84" title="Buzos" />
      <StaticCarousel imageIds={[4, 5, 6]} />
      <ProductList categoryId="01f33ef6-54e1-4928-94ac-c4f44bb46598" title="Pantalones" />
      <StaticCarousel imageIds={[7, 8, 9]} />
      <ProductList categoryId="272bc824-73a4-45df-b177-a7355b83ad77" title="bug" />
      <ScrollToTop />
    </div>
  );
}
