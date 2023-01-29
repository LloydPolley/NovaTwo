import classNames from "classnames/bind";
import style from "./TrackSquare.module.scss";
import Play from "../../Buttons/Play";

const cx = classNames.bind(style);

const TrackSquare = ({
  artist,
  artworkFileLocation,
  audioFileLocation,
  date,
  name,
  trackName,
}) => {
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
        <p>{`${artist}`}</p>
      </div>
      <Play trackUrl={audioFileLocation} />
    </div>
  );
};

export default TrackSquare;
