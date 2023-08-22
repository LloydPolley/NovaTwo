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

  const handleNavigation = () => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  return (
    <div className={cx("nav-overlay", open && "nav-overlay__open")}>
      <div className={cx("nav-overlay__content-wrapper")}>
        <div className={cx("nav-overlay__content")}>
          <p
            className={cx("nav__burger")}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <Close />
          </p>
          <Link
            className={cx(activeSegment === "dj" && "nav__active")}
            href={"/"}
            onClick={handleNavigation}
          >
            Nova
          </Link>
          <Link
            className={cx(activeSegment === "dj" && "nav__active")}
            href={"/discover"}
            onClick={handleNavigation}
          >
            Discover
          </Link>
          {!userData?.email ? (
            <Link href="/login" onClick={handleNavigation}>
              Log In
            </Link>
          ) : (
            <>
              <Link
                href={`/discover/${userData?.uid}`}
                onClick={handleNavigation}
              >
                {userData?.displayName || "user"}
              </Link>
              <Link href="/upload" onClick={handleNavigation}>
                Upload
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
