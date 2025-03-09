"use client";

import "./styles/SwiperFLechas.styles.css"
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

interface IImage {
  id: number;
  name: string;
}

const images: IImage[] = [
  { id: 1, name: "/images/carrousel2.png" },
  { id: 2, name: "/images/carrousel2.png" },
  { id: 3, name: "/images/carrousel2.png" },
  { id: 4, name: "/images/carrousel2.png" },
  { id: 5, name: "/images/carrousel2.png" },
  { id: 6, name: "/images/carrousel2.png" },
  { id: 7, name: "/images/carrousel3.png" },
  { id: 8, name: "/images/carrousel3.png" },
  { id: 9, name: "/images/carrousel3.png" },
];

interface CarouselProps {
  imageIds: number[];
}

const StaticCarousel = ({ imageIds }: CarouselProps) => {
  const filteredImages = images.filter((img) => imageIds.includes(img.id));

  return (
    <div className="max-w-7xl mx-auto my-6">
    <Swiper
      className="relative w-full mx-6"
      pagination={{ clickable: true }}
      slidesPerView={1}
      spaceBetween={20}
      modules={[Pagination]}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {filteredImages.map((image, index) => (
        <SwiperSlide key={`${image.id}-${index}`} className="relative flex items-center justify-center">
          <figure className="flex justify-center">
            <Image
              className="object-contain rounded-lg shadow-lg"
              src={image.name}
              alt={`imagen-${image.id}-${index}`}
              loading="eager"
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
    </div>
  );
};

export default StaticCarousel;
