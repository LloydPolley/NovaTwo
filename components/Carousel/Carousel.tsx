"use client";

import classNames from "classnames/bind";
import style from "./Carousel.module.scss";
import Link from "next/link";
import { TrackType } from "../../types/tracks";

type CarouselTypes = {
  Component: React.ComponentType<{ item: TrackType; type?: string }>;
  items: TrackType[];
  text?: string;
  url?: string;
  type?: string;
};

const cx = classNames.bind(style);

const Carousel = ({ Component, items, text, url, type }: CarouselTypes) => {
  return (
    <div className={cx("carousel")}>
      <div className={cx("carousel__text")}>
        <h2>{text}</h2>
        {url && <Link href={`discover?${url}`}>See more</Link>}
      </div>
      <div className={cx("carousel__inner")}>
        {items &&
          items.map((item) => {
            return (
              <div
                className={cx("carousel__item")}
                key={item?.trackId || item?.uid}
              >
                <Component item={item} type={type} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
