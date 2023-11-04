import React from "react";
import classNames from "classnames/bind";
import style from "./LoadingGrid.module.scss";

const cx = classNames.bind(style);

const LoadingGrid = () => {
  const elements = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className={cx("track-grid__element")}></div>
  ));

  return <div className={cx("track-grid")}>{elements}</div>;
};

export default LoadingGrid;
