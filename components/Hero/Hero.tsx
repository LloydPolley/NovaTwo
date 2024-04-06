import classNames from "classnames/bind";
import style from "./Hero.module.scss";

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

const Hero = ({
  title,
  gradient,
  img,
  imgClass,
  childNode,
  banner,
  anim,
}: HeroProps) => {
  const styleObject: React.CSSProperties = {
    textAlign: "center",
  };

  return (
    <div className={cx("hero")} style={styleObject}>
      <div className={cx("hero__gradient")} />
      <img src={img} />
      <div className={cx("hero__text")}>
        <h1>{title}</h1>
        <p>Techno, Melodic Techno</p>
        <button>Follow</button>
      </div>
      {childNode}
    </div>
  );
};

export default Hero;
