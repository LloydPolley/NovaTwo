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
    <div className="form relative flex flex-col flex-grow lg:p-6 min-h-[100vh]">
      <div className={cx("form__load", loading && "form__show-load")}>
        Loading...
      </div>
      <div className="mx-auto p-3 w-full max-w-[40rem]">
        <h1 className="text-4xl font-bold mb-8 text-center mt-[45px]">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}

export default Form;
