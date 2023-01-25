"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";

const cx = classNames.bind(style);

const Navigation = () => {
  const { userData } = useLoginContext();

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
            {!userData?.email ? (
              <Link href="/profile">Log In</Link>
            ) : (
              <>
                <Link href="/profile">{userData?.displayName || "user"}</Link>
                <Link href="/upload">UPLOAD</Link>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
