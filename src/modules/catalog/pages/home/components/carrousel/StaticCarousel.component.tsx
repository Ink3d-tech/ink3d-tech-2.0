"use client";

import "./styles/SwiperFLechas.styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";
import { API_BACK } from "@/shared/config/api/getEnv";
import { useRouter } from "next/navigation";
import CarouselSkeleton from "./SkeletonCarrousel";

interface Article {
  id: string;
  title: string;
  author: string;
  image: string;
  category: string;
}

interface CarouselProps {
  category: string;
}

const DynamicCarousel = ({ category }: CarouselProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [validCategory, setValidCategory] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BACK}/api/magazine`);
        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);

        const data: Article[] = await response.json();

        // Filtrar artículos por categoría
        const filteredArticles = data.filter(
          (article) => article.category === category
        );

        setValidCategory(filteredArticles.length > 0);

        // Limitar a los últimos 4 artículos
        setArticles(filteredArticles.slice(-4));
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  if (loading) return <CarouselSkeleton/>;
  
  if (!validCategory)
    return (
      <p className="text-center text-gray-500">
        La categoría {category} no existe.
      </p>
    );
  if (articles.length === 0)
    return (
      <p className="text-center text-gray-500">
        No hay imágenes en esta categoría.
      </p>
    );

  const handleImageClick = (id: string) => {
    router.push(`/magazine/${id}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-8xl">
        <Swiper
          loop={true}
          autoplay={{ delay: 4000 }}
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
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {articles.map((article) => (
            <SwiperSlide
              key={article.id}
              className="relative flex items-center justify-center cursor-pointer"
              onClick={() => handleImageClick(article.id)}
            >
              <figure className="flex justify-center">
                <Image
                  className="object-cover rounded-lg shadow-lg"
                  src={article.image}
                  alt={`imagen-${article.id}`}
                  loading="eager"
                  width={1920}
                  height={500}
                  style={{ maxHeight: "500px", minWidth: "300px" }}
                />
              </figure>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-4 text-white">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p>{article.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="custom-prev absolute left-4"></button>
        <button className="custom-next absolute right-4"></button>
      </div>
    </div>
  );
};

export default DynamicCarousel;
