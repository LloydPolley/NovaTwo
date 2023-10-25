import classNames from "classnames/bind";
import style from "./PageWrapper.module.scss";

const cx = classNames.bind(style);

const PageWrapper = ({ children, className }) => {
  return <div className={cx("page-wrapper", className)}>{children}</div>;
};

export default PageWrapper;
