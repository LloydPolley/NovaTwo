"use client";

import { Suspense, useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { signOutUser } from "../../api/login";
import Favourite from "../Icons/Favourite";
import ProfileIcon from "../Icons/ProfileIcon";
import FileIcon from "../Icons/FileIcon";
import FollowerIcon from "../Icons/FollowerIcon";
import UploadIcon from "../Icons/UploadIcon";
import TracksIcon from "../Icons/TracksIcon";
import MixIcon from "../Icons/MixIcon";
import useAuthStore from "../../context/AuthStore";
import Edit from "../Icons/Edit";

type NavTypes = {
  open?: boolean;
  closeNav?: () => void;
};

const cx = classNames.bind(style);

const NavContent = ({ open, closeNav }: NavTypes) => {
  const { userData } = useAuthStore((state) => state);
  const router = useRouter();
  const activeSegments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("f");

  return (
    <Suspense>
      <div className={cx("nav-content", open && "nav-content__open")}>
        <div className={cx("nav-content__inner")}>
          <Link className={cx("nav-content__name")} href={"/"}>
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 275 274"
              width="1em"
              height="1em"
            >
              <path d="M8 8h258v258h-86v-86H94V94H8V8Z" fill="#fff"></path>
              <path d="M94 180v86H8v-86h86Z" fill="#fff"></path>
            </svg>
            <span>Nova</span>
          </Link>
          <p className={cx("nav-content__category")}>FEATURED</p>
          <Link
            className={cx(
              activeSegments.length === 0 &&
                search == "tracks" &&
                "nav-content__active"
            )}
            href="/discover/?f=tracks"
          >
            <TracksIcon /> <span>Tracks</span>
          </Link>
          <Link
            className={cx(
              activeSegments.length === 0 &&
                search === "mix" &&
                "nav-content__active"
            )}
            href="/discover?f=mix"
          >
            <MixIcon /> <span>Mix</span>
          </Link>
          <p className={cx("nav-content__category")}>MY MUSIC</p>
          {!userData?.email ? (
            <Link
              className={cx(
                activeSegments[0] == "login" && "nav-content__active"
              )}
              href="/login"
            >
              <ProfileIcon /> <span>Sign In</span>
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
                <ProfileIcon /> <span>{userData?.displayName}</span>
              </Link>
              <Link
                className={cx(
                  activeSegments[1] === "likes" && "nav-content__active"
                )}
                href={`/${userData?.uid}?f=likes`}
              >
                <Favourite />
                <span>Likes</span>
              </Link>
              <Link
                className={cx(
                  activeSegments.length === 0 &&
                    search === "following" &&
                    "nav-content__active"
                )}
                href={`/${userData?.uid}?f=following`}
              >
                <FollowerIcon /> <span>Following</span>
              </Link>
              <Link
                className={cx(
                  activeSegments[0] === "upload" && "nav-content__active"
                )}
                href={`/profile`}
              >
                <Edit /> <span>Edit</span>
              </Link>
              <Link
                className={cx(
                  activeSegments[0] === "upload" && "nav-content__active"
                )}
                href={`/upload`}
              >
                <UploadIcon /> <span>Upload</span>
              </Link>
            </>
          )}
        </div>
        {!!userData && (
          <Link
            className={cx("nav-content__sign-out")}
            href={`/`}
            onClick={signOutUser}
          >
            SIGN OUT
          </Link>
        )}
      </div>
    </Suspense>
  );
};

export default NavContent;
