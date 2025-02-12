"use client";

import classNames from "classnames/bind";
import style from "./Hero.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);

const Hero = () => {
  return (
    <Link href={"/bxD1nSsSGHecXzH6tQWUCRSlGok1"}>
      <div className={cx("hero")}>
        <div className={cx("hero__content")}>
          <div className={cx("hero__text")}>
            <h1>End of Genesys</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Hero;
