"use client";

import classNames from "classnames/bind";
import style from "./ArtistHero.module.scss";
import { followUser } from "../../api/addFollower";
import { useLoginContext } from "../../context/LoginContext";
import { useFollowersContext } from "../../context/FollowersContext";
import { useEffect, useState } from "react";

import { usePalette } from "react-palette";

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
  const { followers } = useFollowersContext();
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (!followers) return;
    const follow = followers?.some((follower) => follower.uid === user?.uid);
    setIsFollowed(follow);
    console.log("is being followed", follow);
  }, [followers]);

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
              followUser({ follower: userData.uid, followee: user.uid });
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default AritstHero;
