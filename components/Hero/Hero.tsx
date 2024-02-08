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
    <div
      className={cx(
        "hero",
        gradient && "hero-gradient",
        imgClass,
        banner && "banner",
        anim && "anim"
      )}
      style={styleObject}
    >
      <img src={img} />
      <h1>{title}</h1>
      {childNode}
    </div>
  );
};

export default Hero;
