import classNames from "classnames/bind";
import style from "./SwiperCarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const cx = classNames.bind(style);

const SwiperCarousel = ({}) => {
  return (
    <div className={cx("swiper-carousel")}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
