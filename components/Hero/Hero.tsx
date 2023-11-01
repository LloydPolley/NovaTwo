"use client";

import classNames from "classnames/bind";
import style from "./Hero.module.scss";

type HeroProps = {
  title: string;
  img?: string;
  imgClass?: string;
  gradient?: boolean;
};

const cx = classNames.bind(style);

const Hero = ({ title, gradient, img, imgClass }: HeroProps) => {
  const styleObject: React.CSSProperties = {
    textAlign: "center",
  };

  if (!gradient) {
    styleObject.backgroundImage = `url(${img})`;
  }

  return (
    <div
      className={cx("hero", gradient && "hero-gradient", imgClass)}
      style={styleObject}
    >
      <h1>{title}</h1>
    </div>
  );
};

export default Hero;
