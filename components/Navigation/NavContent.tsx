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

  console.log("active", activeSegment);

  useEffect(() => {
    closeNav();
  }, [pathname]);

  return (
    <div className={cx("nav-content", open && "nav-content__open")}>
      <div className={cx("nav-content__inner")}>
        <Link
          className={cx(activeSegment === null && "nav-content__active")}
          href={"/"}
        >
          Home
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
            <Link
              className={cx(activeSegment === "edit" && "nav-content__active")}
              href={`/edit`}
              onClick={closeNav}
            >
              Edit
            </Link>
            <Link
              className={cx(
                activeSegment === "upload" && "nav-content__active"
              )}
              href={`/upload`}
              onClick={closeNav}
            >
              Upload
            </Link>
            <button
              className={cx("nav-content__sign-out")}
              onClick={signOutUser}
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavContent;
