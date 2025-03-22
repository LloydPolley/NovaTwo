"use client";

import { Suspense } from "react";
import classNames from "classnames/bind";
import style from "./Navigation.module.scss";
import Link from "next/link";
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
  Plus,
} from "lucide-react";

type NavTypes = {
  open?: boolean;
  closeNav?: () => void;
};

const cx = classNames.bind(style);

const NavContent = ({ open, closeNav }: NavTypes) => {
  const { userData } = useAuthStore((state) => state);

  const loggedIn = [
    {
      icon: <CircleUserRound />,
      href: `/discover/${userData?.id}`,
      text: userData?.artist,
    },
    { icon: <Heart />, href: `/discover/${userData?.id}/likes`, text: "Likes" },
    // {
    //   icon: <UserCheck />,
    //   href: `/${userData?.id}/following`,
    //   text: "Following",
    // },
  ];

  const dashboard = [
    {
      icon: <LayoutDashboard />,
      href: `/dashboard`,
      text: "Profile",
    },
    {
      icon: <Plus />,
      href: `/dashboard/release?s=1`,
      text: "Create",
    },
    // {
    //   icon: <CloudUpload />,
    //   href: `/dashboard/releases`,
    //   text: "Releases",
    // },
  ];

  return (
    <Suspense>
      <div className={cx("nav-content", open && "nav-content__open")}>
        <div className={cx("nav-content__inner")}>
          <Link className={cx("nav-content__name")} href={"/"}>
            <Layers />
            <span>Nova</span>
          </Link>
          <p className={cx("nav-content__category")}>FEATURED</p>
          <Link href="/discover/releases">
            <Library /> <span>Releases</span>
          </Link>
          <Link href="/discover/mix">
            <Disc3 /> <span>Mix</span>
          </Link>
          <p className={cx("nav-content__category")}>MY MUSIC</p>
          {!userData?.email ? (
            <Link href="/auth/login">
              <CircleUserRound /> <span>Sign In</span>
            </Link>
          ) : (
            <>
              {loggedIn.map((item) => (
                <Link key={item.text} href={item.href}>
                  {item.icon} <span>{item.text}</span>
                </Link>
              ))}
            </>
          )}
          <p className={cx("nav-content__category")}>DASHBOARD</p>
          {dashboard.map((item) => (
            <Link key={item.text} href={item.href}>
              {item.icon} <span>{item.text}</span>
            </Link>
          ))}
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
