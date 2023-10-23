"use client";

import Image from "next/image";
import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import DiscoverIcon from "../Icons/DiscoverIcon";
import ProfileIcon from "../Icons/ProfileIcon";
import SignOutIcon from "../Icons/SignOutIcon";

const cx = classNames.bind(style);

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { userData, signOutUser } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();

  console.log("userdata", userData);

  return (
    <>
      <div className={cx("nav")}>
        <div className={cx("nav__bar")}>
          <Link className={cx("nav__home-mobile")} href={"/"}>
            Nova
          </Link>
          <div className={cx("nav__content")}>
            <Link
              className={cx(activeSegment === "dj" && "nav__active")}
              href={"/discover"}
            >
              Discover
            </Link>
            {!userData?.email ? (
              <Link href="/login">Sign In</Link>
            ) : (
              <>
                <Link href={`/discover/${userData?.uid}`}>
                  {!userData?.profile ? "LOGIN" : userData?.displayName}
                </Link>
                <button className={cx("nav__sign-out")} onClick={signOutUser}>
                  LOG
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
