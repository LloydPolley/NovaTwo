"use client";

import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import Link from "next/link";
import Close from "../../Icons/Close";

const cx = classNames.bind(styles);

function Form({ title, para, children, classForm, url, loading }) {
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

// {url && (
//   <Link className={cx("form__close")} href={url}>
//     <Close />
//   </Link>
// )}
