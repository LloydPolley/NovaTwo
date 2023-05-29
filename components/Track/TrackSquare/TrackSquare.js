import classNames from "classnames/bind";
import style from "./TrackSquare.module.scss";
import Play from "../../Buttons/Play";
import Link from "next/link";

const cx = classNames.bind(style);

const TrackSquare = ({
  artist,
  artworkFileLocation,
  audioFileLocation,
  date,
  name,
  trackName,
  uid,
}) => {
  console.log("artist", artist, uid);
  return (
    <div
      className={cx("dj-square")}
      style={{
        backgroundImage: `url(${artworkFileLocation})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={cx("label")}>
        <p>{`${name}`}</p>
        <Link href={`/dj/${uid}`}>{artist}</Link>
      </div>
      <Play trackUrl={audioFileLocation} />
    </div>
  );
};

export default TrackSquare;
