"use client";

import classNames from "classnames/bind";
import style from "./ArtistHero.module.scss";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import useFollowerStore from "../../context/FollowerStore";
import useAuthStore from "../../context/AuthStore";

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
  const { userData } = useAuthStore((state) => state);
  const { setNewFollowing, following } = useFollowerStore((state) => state);

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
      {userData &&
        !yourProfile &&
        Object.keys(user).length !== 0 &&
        !following?.some((follower) => follower.uid === user?.uid) && (
          <div className={cx("artist-hero__button")}>
            <button
              onClick={() => {
                const { displayName, uid } = userData;
                const newFollowing = {
                  userName: displayName,
                  user: uid,
                  ...user,
                };
                setNewFollowing(newFollowing);
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
