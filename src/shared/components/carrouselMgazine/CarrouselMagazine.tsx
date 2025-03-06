"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarrouselMagazine = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 10 },
  });

  // Estado para forzar render y actualizar las flechas
  const [, setForceRender] = useState(0);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6">
      {/* Flecha Izquierda */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
        onClick={() => {
          instanceRef.current?.prev();
          setForceRender((prev) => prev + 1);
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Carrusel */}
      <div ref={sliderRef} className="keen-slider">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="keen-slider__slide flex flex-col items-center">
            <Image
              src="/mazdaimg.png"
              alt={`Slide ${index + 1}`}
              width={300}
              height={200}
              className="w-[300px] h-[200px] object-cover rounded-lg"
            />
            <button className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition">
              Comprar ahora
            </button>
          </div>
        ))}
      </div>

      {/* Flecha Derecha */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition"
        onClick={() => {
          instanceRef.current?.next();
          setForceRender((prev) => prev + 1);
        }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CarrouselMagazine;
