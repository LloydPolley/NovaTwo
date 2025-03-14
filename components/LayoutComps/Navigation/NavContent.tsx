"use client";

import { Suspense } from "react";
import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
import {
  useSelectedLayoutSegments,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { signOutUser } from "../../../api/login";
import useAuthStore from "../../../context/AuthStore";
import {
  Layers,
  Library,
  Disc3,
  CircleUserRound,
  Heart,
  UserCheck,
  LayoutDashboard,
  CloudUpload,
} from "lucide-react";

type NavTypes = {
  open?: boolean;
  closeNav?: () => void;
};

const cx = classNames.bind(style);

const NavContent = ({ open, closeNav }: NavTypes) => {
  const { userData } = useAuthStore((state) => state);
  const activeSegments = useSelectedLayoutSegments();
  const searchParams = useSearchParams();
  const search = searchParams.get("f");

  return (
    <Suspense>
      <div className={cx("nav-content", open && "nav-content__open")}>
        <div className={cx("nav-content__inner")}>
          <Link className={cx("nav-content__name")} href={"/"}>
            <Layers />
            <span>Nova</span>
          </Link>
          <p className={cx("nav-content__category")}>FEATURED</p>
          <Link
            className={cx(
              activeSegments.length === 0 &&
                search == "tracks" &&
                "nav-content__active"
            )}
            href="/discover/?f=releases"
          >
            <Library /> <span>Releases</span>
          </Link>
          <Link
            className={cx(
              activeSegments.length === 0 &&
                search === "mix" &&
                "nav-content__active"
            )}
            href="/discover?f=mix"
          >
            <Disc3 /> <span>Mix</span>
          </Link>
          <p className={cx("nav-content__category")}>MY MUSIC</p>
          {!userData?.email ? (
            <Link
              className={cx(
                activeSegments[0] == "login" && "nav-content__active"
              )}
              href="/login"
            >
              <CircleUserRound /> <span>Sign In</span>
            </Link>
          ) : (
            <>
              <Link
                className={cx(
                  activeSegments[0] === userData.id &&
                    activeSegments[1] === "all" &&
                    "nav-content__active"
                )}
                href={`/${userData?.id}?f=all`}
                onClick={closeNav}
              >
                <CircleUserRound /> <span>{userData?.artist}</span>
              </Link>
              <Link
                className={cx(
                  activeSegments[1] === "likes" && "nav-content__active"
                )}
                href={`/${userData?.id}/likes`}
              >
                <Heart />
                <span>Likes</span>
              </Link>
              {/* <Link
                className={cx(
                  activeSegments.length === 0 &&
                    search === "following" &&
                    "nav-content__active"
                )}
                href={`/${userData?.id}/following`}
              >
                <UserCheck /> <span>Following</span>
              </Link> */}
              <Link
                className={cx(
                  activeSegments[0] === "edit" && "nav-content__active"
                )}
                href={`/profile`}
              >
                <LayoutDashboard /> <span>Edit</span>
              </Link>
              <Link
                className={cx(
                  activeSegments[0] === "release" && "nav-content__active"
                )}
                href={`/dashboard/${userData?.id}/release?s=1`}
              >
                <CloudUpload /> <span>Release</span>
              </Link>
            </>
          )}
        </div>
        {!!userData && (
          <Link
            className='className="all-unset text-center mb-[20%] font-bold'
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
