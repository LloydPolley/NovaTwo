"use client";

import classNames from "classnames/bind";
import style from "./HeroArtist.module.scss";

type HeroProps = {
  title: string;
  imgClass?: string;
  img?: string;
};

const cx = classNames.bind(style);

const Hero = ({ title, imgClass, img }: HeroProps) => {
  return (
    <div
      className={cx("hero", imgClass)}
      style={{ backgroundImage: `url(${img})` }}
    >
      <h1>{title}</h1>
    </div>
  );
};

export default Hero;
