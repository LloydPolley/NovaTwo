"use client";

import classNames from "classnames/bind";
import style from "./Footer.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);

const AudioWidget = () => {
  return (
    <div className={cx("footer")}>
      {/* <div className={cx("footer__left")}>
        <p className={cx("footer__date")}>2023</p>
        <p>Nova Sounds</p>
      </div>
      <div className={cx("footer__right")}>
        <p>Sign up</p>
      </div> */}
    </div>
  );
};

export default AudioWidget;
