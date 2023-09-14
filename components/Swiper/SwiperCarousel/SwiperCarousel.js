"use client";

import classNames from "classnames/bind";
import style from "./SwiperCarousel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar } from "swiper";
import TrackSquare from "../../Track/TrackSquare";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const cx = classNames.bind(style);

const SwiperCarousel = ({ data }) => {
  return (
    <div className={cx("swiper-carousel")}>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        navigation
        scrollbar={{ draggable: true }}
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
              <SwiperSlide key={`${artist}-${date}`}>
                <TrackSquare
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
