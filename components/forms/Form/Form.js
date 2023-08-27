"use client";

import classNames from "classnames/bind";
import styles from "./Form.module.scss";
import Link from "next/link";
import Close from "../../Icons/Close";

const cx = classNames.bind(styles);

function Form({ title, children, classForm, url }) {
  return (
    <div className={cx("form", classForm)}>
      <div className={cx("form__header")}>
        <h1>{title}</h1>
        {url && (
          <Link className={cx("form__close")} href={url}>
            <Close />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

export default Form;
