"use client";

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
  { id: 1, name: "/images/carrousel1.png" },
  { id: 2, name: "/images/carrousel1.png" },
  { id: 3, name: "/images/carrousel1.png" },
  { id: 4, name: "/images/carrousel1.png" },
  { id: 5, name: "/images/carrousel1.png" },
  { id: 6, name: "/images/carrousel1.png" },
  { id: 7, name: "/images/carrousel1.png" },
  { id: 8, name: "/images/carrousel1.png" },
  { id: 9, name: "/images/carrousel1.png" },
];

interface CarouselProps {
  imageIds: number[];
}

const Carousel = ({ imageIds }: CarouselProps) => {
  const filteredImages = images.filter((img) => imageIds.includes(img.id));

  return (
    <Swiper
      className="relative w-full mx-auto"
      loop={true}
      autoplay={{ delay: 4000}}
      pagination={{ clickable: true }}
      navigation={true}
      slidesPerView={1}
      spaceBetween={20}
      keyboard={{ enabled: true }}
      modules={[Pagination, Navigation, Autoplay]}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {filteredImages.map((image, index) => (
        <SwiperSlide key={`${image.id}-${index}`} className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
          <figure className="flex justify-center">
            <Image
              className="object-contain rounded-lg shadow-lg"
              src={image.name}
              alt={`imagen-${image.id}-${index}`}
              width={1920}
              height={500}
              style={{
                width: "100%",
                maxHeight: "500px",
                minWidth: "300px",
              }}
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
