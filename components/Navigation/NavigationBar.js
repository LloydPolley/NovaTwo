"use client";

import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import Burger from "../Icons/Burger";
import Close from "../Icons/Close";

const cx = classNames.bind(style);

const NavigationBar = () => {
  const { userData, signOutUser } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();

  return (
    <div className={cx("nav-bar")}>
      <Link
        className={cx(activeSegment === "dj" && "nav__active")}
        href={"/discover"}
      >
        Discover
      </Link>
      {!userData?.email ? (
        <Link href="/login">Log In</Link>
      ) : (
        <>
          <Link href={`/discover/${userData?.uid}`}>
            {userData?.displayName || "user"}
          </Link>
          <button onClick={signOutUser}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
