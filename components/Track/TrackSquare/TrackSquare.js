import classNames from "classnames/bind";
import style from "./TrackSquare.module.scss";
import Play from "../../Buttons/Play";
import Link from "next/link";

const cx = classNames.bind(style);

const TrackSquare = ({
  artist,
  artwork,
  audioFileLocation,
  date,
  name,
  trackName,
  uid,
}) => {
  return (
    <div
      className={cx("dj-square")}
      style={{
        backgroundImage: `url(${artwork})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={cx("label")}>
        {name && <p>{`${name}`}</p>}
        <Link href={`/dj/${uid}`}>{artist}</Link>
      </div>
      {audioFileLocation && <Play trackUrl={audioFileLocation} />}
    </div>
  );
};

export default TrackSquare;
