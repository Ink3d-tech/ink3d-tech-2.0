"use client";

import "./styles/SwiperFLechas.styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";

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
  
  // Estado para controlar el primer movimiento del carrusel
  const [firstSlide, setFirstSlide] = useState(true);

  const handleSlideChange = () => {
    if (firstSlide) {
      setFirstSlide(false);
    }
  };

  return (
    <div className="relative w-full mx-auto group">
      <Swiper
        loop={true}
        autoplay={{
          delay: firstSlide ? 1 : 4000,  // Primer slide con autoplay de 1ms (instantáneo)
          reverseDirection: true,
        }}
        speed={500}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={20}
        keyboard={{ enabled: true }}
        modules={[Pagination, Navigation, Autoplay]}
        observer={true}
        observeParents={true}
        onSlideChange={handleSlideChange} // Detecta el primer movimiento
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
                className="object-cover rounded-lg shadow-lg"
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

      {/* Botones de navegación personalizados */}
      <button className="custom-prev absolute left-4"></button>
      <button className="custom-next absolute right-4"></button>
    </div>
  );
};

export default Carousel;
