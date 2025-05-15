import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {
  getTrendingMovies,
  getImageUrlTMDB,
  type Movie,
} from "../api/movieService";

export const ShowSlider = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const data = await getTrendingMovies();
      setMovies(data);
      setIsLoading(false);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current) {
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div className="p-[24px] relative">
      <p className="text-[32px] text-white font-ysabeau font-bold mb-[24px] px-[12px]">
        Кінострічки які переглядають прямо зараз
      </p>

      <div className="relative w-full">
        <div
          ref={prevRef}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-4 rounded-r-lg"
        >
          <FaChevronLeft className="text-[32px] text-white hover:text-gray-400" />
        </div>

        <div className="mx-[60px]">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={5}
            loop={true}
            speed={200}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={setSwiper}
            className="w-full"
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <SwiperSlide key={`loading-${index}`}>
                    <div className="w-full h-[325px] bg-gray-800 animate-pulse rounded-lg"></div>
                  </SwiperSlide>
                ))
              : movies.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <div className="w-full h-[325px] overflow-hidden rounded-lg relative group cursor-pointer">
                      <img
                        src={getImageUrlTMDB(movie.poster_path || "")}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <h3 className="text-white font-semibold text-lg truncate">
                          {movie.title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {movie.release_date?.split("-")[0]}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        <div
          ref={nextRef}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-4 rounded-l-lg"
        >
          <FaChevronRight className="text-[32px] text-white hover:text-gray-400" />
        </div>
      </div>
    </div>
  );
};
