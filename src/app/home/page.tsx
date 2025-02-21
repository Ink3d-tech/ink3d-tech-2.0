// import Buttons from "@/app/home/Buttons.component";
import Carousel from "@/app/home/Carousel.component";
import ProductList from "@/app/home/ProductList.component";
import BackButton from "@/shared/components/BackButton.component";
import ScrollToTop from "@/shared/components/UpButton.component";
import ButtonsMini from "./ButtonsMini.component";

export default function Home() {
  return (
    
    <div className="flex flex-col  bg-gray-300">
      <div className="mb-6">
        <BackButton tab="Inicio"/>
      </div>
      <Carousel imageIds={[1, 2, 3]} />
      <ButtonsMini />
      {/* <Buttons /> */}
      <ProductList category="remeras" />

      <Carousel imageIds={[4, 5, 6]} />
      <ProductList category="buzos"/>

      <Carousel imageIds={[7, 8, 9]} />
      <ProductList category="pantalones"/>
      <ScrollToTop />
    </div>
  );
}
