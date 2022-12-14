import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import useSignIn from "../../hooks/useSignIn";
// import { FaSearch, FaDiceD6 } from "react-icons/fa";

const cx = classNames.bind(style);

const Navigation = () => {
  // const { signIn, userInfo } = useSignIn();
  const userInfo = null;
  // console.log("user", userInfo);
  return (
    <div className={cx("nav")}>
      <div className={cx("nav__content")}>
        <div className={cx("nav__music")}>
          <Link href="/">Home</Link>
          <Link href="/dj">DJs</Link>
          <Link href="/tracks">tracks</Link>
        </div>
        <div className={cx("nav__profile")}>
          <span>
            {!userInfo?.email ? (
              <Link href="/profile">Log In</Link>
            ) : (
              <Link href="/profile">userInfo.email</Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
