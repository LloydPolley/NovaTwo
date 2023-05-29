import classNames from "classnames/bind";
import style from "./SwiperHero.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cx = classNames.bind(style);

const TrackSquare = ({}) => {
  return (
    <div className={cx("swiper-carousel")}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className={cx("hero")}>hello</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cx("hero")}>Goodbye</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TrackSquare;
