"use client";

import classNames from "classnames/bind";
import style from "./UserWidget.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);

const UserWidget = ({ item }) => {
  return (
    <div className={cx("user")}>
      <Link className={cx("user__element")} href={`/${item?.uid}?f=all`}>
        <img src={item.profile} />
      </Link>
      <p>{item.displayName}</p>
    </div>
  );
};

export default UserWidget;
