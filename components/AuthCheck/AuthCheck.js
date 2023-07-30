"use client";

import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";

import "react-h5-audio-player/src/styles.scss";

const cx = classNames.bind(style);

const AudioWidget = ({ children }) => {
  return <>{children}</>;
};

export default AudioWidget;
