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

function Form({ title, children, loading = false }: FormTypes) {
  return (
    <div className="form relative flex flex-col rounded-xl mb-40 lg:p-6 bg-widgetBlack-600 bg-opacity-80">
      <div className={cx("form__load", loading && "form__show-load")}>
        Loading...
      </div>
      <div className="mx-auto p-3 w-full max-w-[400px]">
        <h1 className="text-3xl font-bold my-5">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default Form;
