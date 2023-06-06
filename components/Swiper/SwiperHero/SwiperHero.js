import classNames from "classnames/bind";
import style from "./SwiperHero.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectFade,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const cx = classNames.bind(style);

const TrackSquare = ({}) => {
  return (
    <div className={cx("swiper-carousel")}>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
        ]}
        slidesPerView={2}
        // navigation
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className={cx("hero")}>
            <h1>Maceo Plex</h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={cx("hero")}>
            <h1>Tale Of Us</h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default TrackSquare;
