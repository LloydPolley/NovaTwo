"use client";

import classNames from "classnames/bind";
import style from "./Hero.module.scss";

type HeroProps = {
  title: string;
  imgClass?: string;
};

const cx = classNames.bind(style);

const Hero = ({ title, imgClass }: HeroProps) => {
  return (
    <div className={cx("hero", imgClass)}>
      <h1>{title}</h1>
    </div>
  );
};

export default Hero;
