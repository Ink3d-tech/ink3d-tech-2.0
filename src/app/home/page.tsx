import Buttons from "@/app/home/Buttons.component";
import Carousel from "@/app/home/Carousel.component";
import ProductList from "@/app/home/ProductList.component";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-300">
      <Carousel imageIds={[1, 2, 3]} />
      <Buttons />
      <ProductList category="remeras" />

      <Carousel imageIds={[4, 5, 6]} />
      <ProductList category="buzos"/>

      <Carousel imageIds={[7, 8, 9]} />
      <ProductList category="pantalones"/>
    </div>
  );
}
