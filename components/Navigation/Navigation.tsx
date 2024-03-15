"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import { useLoginContext } from "../../context/LoginContext";
import { useState, useEffect } from "react";
import NavContent from "./NavContent";
import Burger from "../Icons/Burger";
import Link from "next/link";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

const cx = classNames.bind(style);

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const closeNav = () => {
    setOpen(false);
  };

  useEffect(() => {
    closeNav();
    // router.refresh();
  }, [pathname, searchParams]);

  return (
    <>
      <div className={cx("nav-content-mobile")}>
        <NavContent open={open} closeNav={closeNav} />
      </div>
      <div className={cx("nav")}>
        <Link className={cx("nav__name")} href={"/"}>
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 275 274"
            width="1em"
            height="1em"
            // style="height: 22.5px; width: 22.5px;"
          >
            <path d="M8 8h258v258h-86v-86H94V94H8V8Z" fill="#fff"></path>
            <path d="M94 180v86H8v-86h86Z" fill="#fff"></path>
          </svg>
        </Link>
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
