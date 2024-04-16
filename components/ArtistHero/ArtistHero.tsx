"use client";

import classNames from "classnames/bind";
import style from "./ArtistHero.module.scss";
import { useLoginContext } from "../../context/LoginContext";
import { useFollowingContext } from "../../context/FollowersContext";
import { useEffect, useState } from "react";

type HeroProps = {
  title: string;
  img?: string;
  imgClass?: string;
  gradient?: boolean;
  childNode?: React.ReactNode;
  banner?: boolean;
  anim?: boolean;
  user?: any;
};

const cx = classNames.bind(style);

const AritstHero = ({ title, img, user }: HeroProps) => {
  const { userData } = useLoginContext();
  const { following, setNewFollowing } = useFollowingContext();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (!following) return;
    const follow = following?.some((follower) => follower.uid === user?.uid);
    setIsFollowed(follow);
    console.log("is being followed", follow);
  }, [following]);

  const yourProfile = userData?.uid === user?.uid;

  return (
    <div
      className={cx("artist-hero")}
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      <div className={cx("artist-hero__text")}>
        <h1>{title}</h1>
        <p>Techno, Melodic Techno</p>
      </div>
      {userData && !yourProfile && user && !isFollowed && (
        <div className={cx("artist-hero__button")}>
          <button
            onClick={() => {
              console.log("follow someone");
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
