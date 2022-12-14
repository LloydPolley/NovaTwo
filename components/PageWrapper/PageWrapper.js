import type { ReactNode } from "react";
import classNames from "classnames/bind";
import style from "./PageWrapper.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

const cx = classNames.bind(style);

const PageWrapper = ({ children, className }: Props) => {
  return <div className={cx("page-wrapper", className)}>{children}</div>;
};

export default PageWrapper;
