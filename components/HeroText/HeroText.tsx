import classNames from "classnames/bind";
import style from "./HeroText.module.scss";
import Link from "next/link";

type HeroProps = {
  title?: string;
  img?: string;
  imgClass?: string;
  gradient?: boolean;
  childNode?: React.ReactNode;
  banner?: boolean;
  anim?: boolean;
  text?: string;
};

const cx = classNames.bind(style);

const HeroText = ({
  title,
  gradient,
  img,
  imgClass,
  childNode,
  banner,
  anim,
  text,
}: HeroProps) => {
  return (
    <div className={cx("hero")}>
      <h1>{text}</h1>
      <div className={cx("hero__buttons")}>
        <Link className={cx("hero__button")} href={"/discover?type=sets"}>
          DJ Sets
        </Link>
        <Link className={cx("hero__button")} href={"/discover?type=sets"}>
          Tracks
        </Link>
      </div>
    </div>
  );
};

export default HeroText;
