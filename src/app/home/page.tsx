import Buttons from "@/app/home/Buttons.component";
import Carousel from "@/app/home/Carousel.component";
import ProductList from "@/app/home/ProductList.component";
import BackButton from "@/shared/components/BackButton.component";

export default function Home() {
  return (
    
    <div className="flex flex-col  bg-gray-300">
      <div className='bg-black h-12 flex items-center px-3'>
        <BackButton />
        <h1 className='text-some-gray ml-2 text-base'>Start</h1>
      </div>
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
