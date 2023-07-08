"use client";

import classNames from "classnames/bind";
import style from "./SwiperCarousel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import TrackSquare from "../../Track/TrackSquare";
import "swiper/css";
import "swiper/css/pagination";

const cx = classNames.bind(style);

const SwiperCarousel = ({ data }) => {
  return (
    <div className={cx("swiper-carousel")}>
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            centeredSlides: true,
          },
          500: {
            centeredSlides: true,
          },
          768: {
            width: 768,
            slidesPerView: 2.2,
          },
          1000: {
            width: 1000,
            slidesPerView: 2.2,
          },
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        navigation
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {data &&
          data.slice(0, 9).map((track) => {
            if (!track.artist) return;

            const {
              artist,
              artworkFileLocation,
              audioFileLocation,
              date,
              name,
              trackName,
              uid,
            } = track;

            return (
              <SwiperSlide>
                <TrackSquare
                  key={`${artist}-${date}`}
                  name={name}
                  artist={artist}
                  artwork={artworkFileLocation}
                  audioFileLocation={audioFileLocation}
                  date={date}
                  trackName={trackName}
                  uid={uid}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
