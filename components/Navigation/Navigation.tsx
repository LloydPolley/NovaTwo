"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import NavContent from "./NavContent";

const cx = classNames.bind(style);

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { userData, signOutUser } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();

  console.log("active", activeSegment, userData);

  const closeNav = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={cx("nav")}>
        <div className={cx("nav__bar")}>
          <Link className={cx("nav__home")} href={"/"}>
            Nova
          </Link>
          <NavContent open={open} closeNav={closeNav} />
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            menu
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
