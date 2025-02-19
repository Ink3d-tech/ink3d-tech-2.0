"use client";

import "./Swiper.styles.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useEffect } from "react";
import Swiper from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

export const SwiperCard = ({ image }: { image: IImage }) => {
  return (
    <div className="swiper-slide relative h-full flex items-center">
      <Image
        className="object-center rounded-2xl"
        src={image.name}
        alt="imagen"
        width={800}
        height={200}
        objectFit="cover"
      />
    </div>
  );
};

interface IImage {
  id: number;
  name: string;
}

const images: IImage[] = [
  { id: 1, name: "/images/carrousel2.png" },
  { id: 2, name: "/images/carrousel1.png" },
  { id: 3, name: "/images/carrousel2.png" },
  { id: 4, name: "/images/carrousel3.png" },
  { id: 5, name: "/images/carrousel1.png" },
  { id: 6, name: "/images/carrousel3.png" },
  { id: 7, name: "/images/carrousel2.png" },
  { id: 8, name: "/images/carrousel1.png" },
  { id: 9, name: "/images/carrousel2.png" },
];

interface CarouselProps {
  imageIds: number[]; // Nueva prop para seleccionar imágenes
}

const Carousel = ({ imageIds }: CarouselProps) => {
  useEffect(() => {
    const swiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      modules: [Pagination, Navigation, Autoplay],
    });

    return () => swiper.destroy();
  }, []);

  // Filtramos solo las imágenes con los IDs proporcionados
  const filteredImages = images.filter((img) => imageIds.includes(img.id));

  return (
    <div className="swiper-container overflow-hidden relative h-[250px] md:h-[500px] rounded-lg w-full max-w-3xl mx-auto my-2">
      <div className="swiper-wrapper h-full">
        {filteredImages.map((imagen) => (
          <SwiperCard key={imagen.id} image={imagen} />
        ))}
      </div>

      <div className="swiper-button-next w-2 h-2 md:w-10 md:h-8 right-2 md:right-2"></div>
      <div className="swiper-button-prev w-2 h-2 md:w-10 md:h-8 left-2 md:left-2"></div>

      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Carousel;
