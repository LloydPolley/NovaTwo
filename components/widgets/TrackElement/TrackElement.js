import Image from "next/image";
import classNames from "classnames/bind";
import style from "./TrackElement.module.scss";
import hero from "./nova-2-tale.png";

const cx = classNames.bind(style);

const TrackElement = ({ track }) => {
  return (
    <div className={cx("track-element")}>
      <div className={cx("track-element__image")}>
        <Image src={hero} />
      </div>
      <div>
        <p>{track.name}</p>
        <p>{track.artist}</p>
      </div>
      <button>Play</button>
    </div>
  );
};

export default TrackElement;
