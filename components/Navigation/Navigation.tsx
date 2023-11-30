"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import NavContent from "./NavContent";
import Burger from "../Icons/Burger";

const cx = classNames.bind(style);

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const closeNav = () => {
    setOpen(false);
  };

  return (
    <>
      <NavContent open={open} closeNav={closeNav} />
      <div className={cx("nav")}>
        <button
          className={cx("nav__burger")}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div
            className={cx("line", "line__1", open && "line__1--active")}
          ></div>
          <div
            className={cx("line", "line__2", open && "line__2--active")}
          ></div>
          <div
            className={cx("line", "line__3", open && "line__3--active")}
          ></div>
          {/* <Burger /> */}
        </button>
      </div>
    </>
  );
};

export default Navigation;
