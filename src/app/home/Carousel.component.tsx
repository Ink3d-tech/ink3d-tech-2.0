"use client";

import "./Swiper.styles.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";


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
  imageIds: number[];
}

const Carousel = ({ imageIds }: CarouselProps) => {
  // Filtrar imágenes según los IDs proporcionados
  const filteredImages = images.filter((img) => imageIds.includes(img.id));

  return (
    <Swiper
      className="overflow-hidden relative w-full mx-auto"
      loop={true}
      autoplay={{ delay: 4000 }}
      speed={400}
      pagination={{ clickable: true }}
      navigation={false}
      slidesPerView={1}
      freeMode={true}
      keyboard={{ enabled: true }}
      modules={[Pagination, Navigation, Autoplay]}
    >
      {filteredImages.map((image) => (
        <SwiperSlide key={image.id} className="relative flex items-center justify-center ">
          <div className="overlay"></div>
          <figure className="flex justify-center">
            <Image
              className="object-cover"
              src={image.name}
              alt="imagen"
              width={1920}
              height={500}
              style={{
                width: "75%",
                maxHeight: "400px",
              }}
            />
          </figure>

        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
