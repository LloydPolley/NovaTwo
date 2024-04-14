"use client";

import classNames from "classnames/bind";
import style from "./Carousel.module.scss";
import Link from "next/link";
import { TrackType } from "../../types/tracks";

type CarouselTypes = {
  Component: React.ComponentType<{ item: TrackType }>;
  items: TrackType[];
  text?: string;
  url?: string;
};

const cx = classNames.bind(style);

const Carousel = ({ Component, items, text, url }: CarouselTypes) => {
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
              <div className={cx("carousel__item")}>
                <Component item={item} key={item?.uid} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
