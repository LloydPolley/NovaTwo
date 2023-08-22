"use client";

import classNames from "classnames/bind";
import style from "./Modal.module.scss";

const cx = classNames.bind(style);

const Modal = ({ children }) => {
  return <div className={cx("modal")}>{children}</div>;
};

export default Modal;
