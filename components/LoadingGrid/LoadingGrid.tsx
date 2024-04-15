import React from "react";
import classNames from "classnames/bind";
import style from "./LoadingGrid.module.scss";

const cx = classNames.bind(style);

const LoadingGrid = () => {
  const elements = Array.from({ length: 4 }, (_, index) => (
    <div key={index} className={cx("loading__element")}></div>
  ));

  return <div className={cx("loading")}>{elements}</div>;
};

export default LoadingGrid;
