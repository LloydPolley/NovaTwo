"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";

const cx = classNames.bind(style);

const links = [
  { label: "Nova", path: "/", segement: null },
  { label: "Discover", path: "/dj", segement: "dj" },
];

const Navigation = () => {
  const { userData } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();

  return (
    <div className={cx("nav")}>
      <div className={cx("nav__content")}>
        <div className={cx("nav__music")}>
          {links.map((link) => (
            <Link
              className={cx(activeSegment === link.segement && "nav__active")}
              href={link.path}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className={cx("nav__profile")}>
          <span>
            {!userData?.email ? (
              <Link href="/profile">Log In</Link>
            ) : (
              <>
                <Link href="/profile">{userData?.displayName || "user"}</Link>
                <Link href="/upload">UPLOAD</Link>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
