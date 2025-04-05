"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import { useState, useEffect } from "react";
import NavContent from "./NavContent";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CircleX, Menu, SquareChevronUp, SquareMenu, X } from "lucide-react";

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
    <>
      <div className="lg:hidden">
        <NavContent open={open} closeNav={closeNav} />
      </div>
      <div className={cx("nav")}>
        <Link className="p-0" href={"/"}>
          <p className="m-0 font-bold">NOVA</p>
        </Link>
        <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </>
  );
};

export default Navigation;
