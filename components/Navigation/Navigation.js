"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import Burger from "../Icons/Burger";
import Close from "../Icons/Close";
import NavigationOverlay from "./NavigationOverlay";

const cx = classNames.bind(style);

const Navigation = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      <NavigationOverlay open={open} setOpen={setOpen} />
      <div className={cx("nav", open && "nav__open")}>
        <div className={cx("nav__bar")}>
          <Link className={cx("nav__home-mobile")} href={"/"}>
            Nova
          </Link>
          <p
            className={cx("nav__burger")}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <Close /> : <Burger />}
          </p>
        </div>
      </div>
    </>
  );
};

export default Navigation;
