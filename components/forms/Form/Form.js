"use client";

import classNames from "classnames/bind";
import styles from "./Form.module.scss";

const cx = classNames.bind(styles);

function Form({ title, children, classForm }) {
  return (
    <div className={cx("form", classForm)}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default Form;
