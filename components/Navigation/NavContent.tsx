"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
  useRouter,
  usePathname,
} from "next/navigation";
import { signOutUser } from "../../api/login";

const cx = classNames.bind(style);

const NavContent = ({ open, closeNav }) => {
  const { userData } = useLoginContext();
  const activeSegments = useSelectedLayoutSegments();
  const pathname = usePathname();

  useEffect(() => {
    closeNav();
  }, [pathname]);

  return (
    <>
      <div
        className={cx("nav-overlay", open && "nav-overlay__open")}
        onClick={closeNav}
      />
      <div className={cx("nav-content", open && "nav-content__open")}>
        <div className={cx("nav-content__inner")}>
          <Link
            className={cx(activeSegments.length === 0 && "nav-content__active")}
            href={"/"}
          >
            Home
          </Link>
          <Link
            className={cx(
              activeSegments[0] === "discover" &&
                activeSegments.length === 1 &&
                "nav-content__active"
            )}
            href={"/discover"}
          >
            Discover
          </Link>
          {!userData?.email ? (
            <Link
              className={cx(
                activeSegments[0] == "login" && "nav-content__active"
              )}
              href="/login"
            >
              Sign In
            </Link>
          ) : (
            <>
              <Link
                className={cx(
                  activeSegments[1] === userData.uid &&
                    activeSegments[2] === "releases" &&
                    "nav-content__active"
                )}
                href={`/discover/${userData?.uid}/releases`}
                onClick={closeNav}
              >
                {!userData?.profile ? "LOGIN" : userData?.displayName}
              </Link>
              <Link
                className={cx(
                  activeSegments[2] === "likes" && "nav-content__active"
                )}
                href={`/discover/${userData?.uid}/likes`}
                onClick={closeNav}
              >
                Likes
              </Link>
              <Link
                className={cx(
                  activeSegments[0] === "edit" && "nav-content__active"
                )}
                href={`/edit`}
                onClick={closeNav}
              >
                Edit
              </Link>
              <Link
                className={cx(
                  activeSegments[0] === "upload" && "nav-content__active"
                )}
                href={`/upload`}
                onClick={closeNav}
              >
                Upload
              </Link>
              <button
                className={cx("nav-content__sign-out")}
                onClick={signOutUser}
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NavContent;
