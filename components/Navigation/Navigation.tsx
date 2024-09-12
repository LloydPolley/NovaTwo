"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import { useState, useEffect, Suspense } from "react";
import NavContent from "./NavContent";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Logo from "../Icons/Logo";

const cx = classNames.bind(style);

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeNav = () => {
    setOpen(false);
  };

  useEffect(() => {
    closeNav();
  }, [pathname, searchParams]);

  return (
    <Suspense>
      <div className={cx("nav-content-mobile")}>
        <NavContent open={open} closeNav={closeNav} />
      </div>
      <div className={cx("nav")}>
        <Link className={cx("nav__name")} href={"/"}>
          <Logo />
        </Link>
        <p className={cx("nav__title")}>NOVA</p>
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
    </Suspense>
  );
};

export default Navigation;
