import Buttons from "@/app/home/Buttons.component";
import Carousel from "@/app/home/Carousel.component";
import ProductList from "@/app/home/ProductList.component";
import BackButton from "@/shared/components/BackButton.component";
import NavBar from "@/shared/components/NavBar.component";

export default function Home() {
  return (
    
    <div className="flex flex-col  bg-gray-300">
      <NavBar />
      <BackButton tab="Inicio" />
      <Carousel imageIds={[1, 2, 3]} />
      <Buttons />
      <ProductList category="buzos"/>

      <Carousel imageIds={[4, 5, 6]} />
      <ProductList category="remeras" />

      <Carousel imageIds={[7, 8, 9]} />
      <ProductList category="pantalones"/>
    </div>
  );
}
