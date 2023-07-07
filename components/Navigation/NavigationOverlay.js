"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import Burger from "../Icons/Burger";
import Close from "../Icons/Close";

const cx = classNames.bind(style);

const Navigation = ({ open, setOpen }) => {
  const { userData } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div className={cx("nav-overlay", open && "nav-overlay__open")}>
      <p
        className={cx("nav__burger")}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Close />
      </p>
      <div className={cx("nav-overlay__content")}>
        <Link
          className={cx(activeSegment === "dj" && "nav__active")}
          href={"/"}
        >
          Nova
        </Link>
        <Link
          className={cx(activeSegment === "dj" && "nav__active")}
          href={"/dj"}
        >
          Discover
        </Link>
        {!userData?.email ? (
          <Link href="/profile">Log In</Link>
        ) : (
          <>
            <Link href="/profile">{userData?.displayName || "user"}</Link>
            <Link href="/upload">Upload</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
