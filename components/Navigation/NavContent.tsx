"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import {
  useSelectedLayoutSegment,
  useRouter,
  usePathname,
} from "next/navigation";

const cx = classNames.bind(style);

const NavContent = ({ open, closeNav }) => {
  const { userData, signOutUser } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();
  const pathname = usePathname();

  useEffect(() => {
    closeNav();
  }, [pathname]);

  return (
    <div className={cx("nav-content", open && "nav-content__open")}>
      <div className={cx("nav-content__inner")}>
        <Link className={cx("nav__home")} href={"/"}>
          Nova
        </Link>
        <Link
          className={cx(activeSegment === "discover" && "nav-content__active")}
          href={"/discover"}
        >
          Discover
        </Link>
        {!userData?.email ? (
          <Link href="/login">Sign In</Link>
        ) : (
          <>
            <Link
              href={`/discover/${userData?.uid}/releases`}
              onClick={closeNav}
            >
              {!userData?.profile ? "LOGIN" : userData?.displayName}
            </Link>
            <button
              className={cx("nav-content__sign-out")}
              onClick={signOutUser}
            >
              LOG
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavContent;
