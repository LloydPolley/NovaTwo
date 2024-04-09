import classNames from "classnames/bind";
import style from "./Wrapper.module.scss";

const cx = classNames.bind(style);

const Wrapper = ({ children }) => {
  return (
    <>
      <div className={cx("wrapper")}>{children}</div>
      <p className={cx("footer")}>Nova 2024</p>
    </>
  );
};

export default Wrapper;
