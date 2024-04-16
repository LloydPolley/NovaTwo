"use client";

import classNames from "classnames/bind";
import style from "./Hero.module.scss";
import Image from "next/image";
import Link from "next/link";

const cx = classNames.bind(style);

const Hero = () => {
  return (
    <Link href={"/KywxSv3ue7aUrqyZJqcQGf14h683?f=all"}>
      <div className={cx("hero")}>
        <div className={cx("hero__content")}>
          <div className={cx("hero__text")}>
            <h1>Genesys II</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Hero;
