"use client";

import classNames from "classnames/bind";
import style from "./RadioMenu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const cx = classNames.bind(style);

export default function RadioMenu() {
  const url = usePathname();
  const isTracks = url.includes("tracks");
  const lastSlashIndex = url.lastIndexOf("/");
  const updatedUrl = url.substring(0, lastSlashIndex);

  return (
    <div className={cx("radio")}>
      <Link
        className={cx("radio__toggle", isTracks && "radio__active")}
        href={`${updatedUrl}/tracks`}
      >
        Tracks
      </Link>
      <Link
        className={cx("radio__toggle", !isTracks && "radio__active")}
        href={`${updatedUrl}/likes`}
      >
        Likes
      </Link>
    </div>
  );
}
