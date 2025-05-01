import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export const ShowSlider = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

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
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-4 rounded-r-lg transition-colors hover:bg-gray-800/30"
        >
          <FaChevronLeft className="text-[32px] text-white" />
        </div>

        <div className="mx-[60px]">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={5}
            loop={true}
            speed={800}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onSwiper={setSwiper}
            className="w-full"
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[325px] bg-gray-800 transition-transform cursor-pointer"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div
          ref={nextRef}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-4 rounded-l-lg transition-colors hover:bg-gray-800/30"
        >
          <FaChevronRight className="text-[32px] text-white" />
        </div>
      </div>
    </div>
  );
};
