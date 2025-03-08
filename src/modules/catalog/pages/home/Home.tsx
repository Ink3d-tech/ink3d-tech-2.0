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
      <ProductList categoryId="cfc2655e-84d7-4cfa-8f57-167ddcd5d946" title="Buzos" />
      <StaticCarousel imageIds={[4, 5, 6]} />
      <ProductList categoryId="bb95170a-a9c9-43b6-80d5-919ca41ed0b6" title="Pantalones" />
      <StaticCarousel imageIds={[7, 8, 9]} />
      <ProductList categoryId="0551c71d-8261-49d9-9bb2-dd0c1e8c72cd" title="Remeras" />
      <ScrollToTop />
    </div>
  );
}
