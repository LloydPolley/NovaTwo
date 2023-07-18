"use client";

import classNames from "classnames/bind";
import style from "./Loading.module.scss";

const cx = classNames.bind(style);

const Loading = ({ isLoading }) => {
  return <>{isLoading && <div className={cx("loading")}>LOADING</div>}</>;
};

export default Loading;
