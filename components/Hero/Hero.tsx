"use client";

import classNames from "classnames/bind";
import style from "./Hero.module.scss";
import { followUser } from "../../api/addFollower";
import { useLoginContext } from "../../context/LoginContext";

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

const Hero = ({ title, img, user }: HeroProps) => {
  const { userData } = useLoginContext();
  const yourProfile = userData?.uid === user?.uid;

  return (
    <div className={cx("hero")}>
      <div className={cx("hero__gradient")} />
      <img src={img} />
      <div className={cx("hero__text")}>
        <h1>{title}</h1>
        <p>Techno, Melodic Techno</p>
      </div>
      {userData && !yourProfile && user && (
        <div className={cx("hero__button")}>
          <button
            onClick={() => {
              console.log("follow someone");
              followUser({ follower: userData.uid, followee: user.uid });
            }}
          >
            Follow
          </button>
        </div>
      )}
    </div>
  );
};

export default Hero;
