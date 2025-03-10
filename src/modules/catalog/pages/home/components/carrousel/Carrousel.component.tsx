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

interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
}

const Carousel = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstSlide, setFirstSlide] = useState(true);
  
  const router = useRouter(); 

  const handleSlideChange = () => {
    if (firstSlide) {
      setFirstSlide(false);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BACK}/api/magazine/active`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando carrusel...</p>;

  const handleImageClick = (id: number) => {
    router.push(`/magazine/${id}`);
  };

  return (
    <div className="relative w-full mx-auto group">
      <Swiper
        loop={true}
        autoplay={{
          delay: firstSlide ? 1 : 4000,
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
        onSlideChange={handleSlideChange}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id} className="relative flex items-center justify-center">
            <figure className="flex justify-center">
              <a
                onClick={() => handleImageClick(article.id)} 
              >
                <Image
                  className="object-cover rounded-lg shadow-lg"
                  src={article.image}
                  alt={`imagen-${article.id}`}
                  loading="eager"
                  width={1920}
                  height={500}
                  style={{

                    maxHeight: "500px",
                    minWidth: "300px",
                  }}
                />
              </a>
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
  );
};

export default Carousel;
