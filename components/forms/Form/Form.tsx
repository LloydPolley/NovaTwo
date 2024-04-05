"use client";

import classNames from "classnames/bind";
import styles from "./Form.module.scss";

const cx = classNames.bind(styles);

type FormTypes = {
  title?: string;
  para?: string;
  children: React.ReactNode;
  classForm?: string;
  loading?: boolean;
};

function Form({ title, para, children, classForm, loading }: FormTypes) {
  return (
    <div className={cx("form", classForm)}>
      <div className={cx("form__load", loading && "form__show-load")}>
        Loading
      </div>
      <div className={cx("form__container")}>
        <div className={cx("form__header")}>
          <h1>{title}</h1>
          <p>{para}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Form;