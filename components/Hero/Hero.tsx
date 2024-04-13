"use client";

import classNames from "classnames/bind";
import style from "./Hero.module.scss";
import Image from "next/image";

const cx = classNames.bind(style);

const Hero = () => {
  return (
    <div className={cx("hero")}>
      <div className={cx("hero__content")}>
        <div className={cx("hero__text")}>
          <h1>Genesys II</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;

{
  /* <video autoPlay muted loop playsInline>
          <source src={"/anyma-30.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */
}
