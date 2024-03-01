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
  useSearchParams,
} from "next/navigation";
import { signOutUser } from "../../api/login";

type NavTypes = {
  open?: boolean;
  closeNav?: () => void;
};

const cx = classNames.bind(style);

const NavContent = ({ open, closeNav }: NavTypes) => {
  const { userData } = useLoginContext();
  const router = useRouter();
  const activeSegments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("f");

  return (
    <>
      <div className={cx("nav-content", open && "nav-content__open")}>
        <div className={cx("nav-content__inner")}>
          <Link className={cx("nav__name")} href={"/"}>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 275 274"
              width="1em"
              height="1em"
              // style="height: 22.5px; width: 22.5px;"
            >
              <path d="M8 8h258v258h-86v-86H94V94H8V8Z" fill="#fff"></path>
              <path d="M94 180v86H8v-86h86Z" fill="#fff"></path>
            </svg>
          </Link>
          <p className={cx("nav-content__category")}>FEATURED</p>
          <Link
            className={cx(
              activeSegments.length === 0 &&
                search == "tracks" &&
                "nav-content__active"
            )}
            href="/?f=tracks"
          >
            Tracks
          </Link>
          <Link
            className={cx(
              activeSegments.length === 0 &&
                search === "mix" &&
                "nav-content__active"
            )}
            href="/?f=mix"
          >
            Mix
          </Link>
          <p className={cx("nav-content__category")}>MY MUSIC</p>
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
                  activeSegments[0] === userData.uid &&
                    activeSegments[1] === "all" &&
                    "nav-content__active"
                )}
                href={`/${userData?.uid}?f=all`}
                onClick={closeNav}
              >
                {userData?.displayName}
              </Link>
              <Link
                className={cx(
                  activeSegments[1] === "likes" && "nav-content__active"
                )}
                href={`/${userData?.uid}?f=likes`}
                onClick={() => {
                  console.log("refresh");
                  router.refresh();
                }}
              >
                Likes
              </Link>
              <Link
                className={cx(
                  activeSegments[0] === "edit" && "nav-content__active"
                )}
                href={`/edit`}
              >
                Edit
              </Link>
              <Link
                className={cx(
                  activeSegments[0] === "upload" && "nav-content__active"
                )}
                href={`/upload`}
              >
                Upload
              </Link>
            </>
          )}
        </div>
        <button className={cx("nav-content__sign-out")} onClick={signOutUser}>
          SIGN OUT
        </button>
      </div>
    </>
  );
};

export default NavContent;
