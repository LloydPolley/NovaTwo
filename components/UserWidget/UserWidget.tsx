"use client";

import classNames from "classnames/bind";
import style from "./UserWidget.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);

const UserWidget = ({ user }) => {
  return (
    <div className={cx("user")}>
      <Link className={cx("user__element")} href={`/${user?.uid}?f=all`}>
        <img src={user.profile} />
      </Link>
      <p>{user.displayName}</p>
    </div>
  );
};

export default UserWidget;
