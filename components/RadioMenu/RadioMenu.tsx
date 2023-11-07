"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./RadioMenu.module.scss";
import { TrackWrapperProps } from "../../types/tracks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const cx = classNames.bind(style);

export default function RadioMenu() {
  const url = usePathname();
  const isReleases = url.includes("releases");
  const lastSlashIndex = url.lastIndexOf("/");
  const updatedUrl = url.substring(0, lastSlashIndex);

  return (
    <div className={cx("radio")}>
      <Link
        className={cx("radio__toggle", isReleases && "radio__active")}
        href={`${updatedUrl}/releases`}
      >
        Releases
      </Link>
      <Link
        className={cx("radio__toggle", !isReleases && "radio__active")}
        href={`${updatedUrl}/likes`}
      >
        Likes
      </Link>
    </div>
  );
}
