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

  console.log("search", search);

  return (
    <>
      <div className={cx("nav-content", open && "nav-content__open")}>
        <div className={cx("nav-content__inner")}>
          <p className={cx("nav-content__category")}>FEATURED</p>
          <Link
            className={cx(
              activeSegments.length === 0 &&
                search === "mix" &&
                "nav-content__active"
            )}
            href="/?f=mix"
          >
            Live Mix
          </Link>
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
                    activeSegments[1] === "tracks" &&
                    "nav-content__active"
                )}
                href={`/${userData?.uid}?f=tracks`}
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
