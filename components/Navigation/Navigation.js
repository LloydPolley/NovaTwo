"use client";

import Image from "next/image";
import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";
import DiscoverIcon from "../Icons/DiscoverIcon";
import ProfileIcon from "../Icons/ProfileIcon";
import SignOutIcon from "../Icons/SignOutIcon";

const cx = classNames.bind(style);

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { userData, signOutUser } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();

  console.log("user", userData);

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [open]);

  return (
    <>
      <div className={cx("nav", open && "nav__open")}>
        <div className={cx("nav__bar")}>
          <Link className={cx("nav__home-mobile")} href={"/"}>
            Nova
          </Link>
          <div className={cx("nav__content")}>
            <Link
              className={cx(activeSegment === "dj" && "nav__active")}
              href={"/discover"}
            >
              <DiscoverIcon />
            </Link>
            {!userData?.email ? (
              <Link href="/login">
                <ProfileIcon />
              </Link>
            ) : (
              <>
                <Link href={`/discover/${userData?.uid}`}>
                  {!userData?.profile ? (
                    <ProfileIcon />
                  ) : (
                    <div className={cx("nav__profile-container")}>
                      <Image
                        className={cx("nav__profile-photo")}
                        src={userData?.profile}
                        layout={"fill"}
                        alt="Picture of the author"
                      />
                    </div>
                  )}
                </Link>
                <button className={cx("nav__sign-out")} onClick={signOutUser}>
                  <SignOutIcon />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
