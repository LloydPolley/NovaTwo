"use client";

import classNames from "classnames/bind";
import style from "./ArtistHero.module.scss";
import { useLoginContext } from "../../context/LoginContext";
import { useFollowingContext } from "../../context/FollowersContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileForm from "../forms/ProfileForm/ProfileForm";

type HeroProps = {
  title: string;
  img?: string;
  imgClass?: string;
  gradient?: boolean;
  childNode?: React.ReactNode;
  banner?: boolean;
  anim?: boolean;
  user?: any;
  overlay?: boolean;
  box?: boolean;
  imgBox?: string;
};

const cx = classNames.bind(style);

const AritstHero = ({ title, img, imgBox, user, overlay, box }: HeroProps) => {
  const { userData } = useLoginContext();
  const { following, setNewFollowing } = useFollowingContext();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (!following) return;
    const follow = following?.some((follower) => follower.uid === user?.uid);
    setIsFollowed(follow);
  }, [following]);

  const yourProfile = userData?.uid === user?.uid;

  return (
    <div
      className={cx(
        "artist-hero",
        overlay && "artist-hero__overlay",
        box && "artist-hero__box-container"
      )}
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      {box && (
        <div
          className={cx("artist-hero__box")}
          style={{
            backgroundImage: `url("${imgBox}")`,
          }}
        />
      )}
      <div className={cx("artist-hero__text")}>
        <p>Discover</p>
        <h1>{title}</h1>
        <p>Techno, Melodic Techno</p>
      </div>
      {yourProfile && <ProfileForm />}
      {userData &&
        !yourProfile &&
        Object.keys(user).length !== 0 &&
        !isFollowed && (
          <div className={cx("artist-hero__button")}>
            <button
              onClick={() => {
                setNewFollowing({ user: userData, following: user });
              }}
            >
              Follow
            </button>
          </div>
        )}
    </div>
  );
};

export default AritstHero;
