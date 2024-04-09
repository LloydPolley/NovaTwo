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
};

const cx = classNames.bind(style);

const Hero = ({ title, img, user }: HeroProps) => {
  console.log("user", user);

  const { userData } = useLoginContext();

  console.log("userData", userData);

  const you = userData?.uid === user?.uid;

  return (
    <div className={cx("hero")}>
      <div className={cx("hero__gradient")} />
      <img src={img} />
      <div className={cx("hero__text")}>
        <h1>{title}</h1>
        <p>Techno, Melodic Techno</p>
      </div>
      {!you && (
        <div className={cx("hero__button")}>
          <button
            onClick={() => {
              console.log("follow someone");
              followUser({ follower: userData?.uid, followee: user });
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
