import classNames from "classnames/bind";
import style from "./Carousel.module.scss";
import TrackSquare from "../Tracks/TrackSquare";

const cx = classNames.bind(style);

const Carousel = ({ data }) => {
  return (
    <div className={cx("carousel")}>
      {data &&
        data.slice(0, 9).map((track) => {
          if (!track.artist) return;

          const {
            artist,
            artworkFileLocation,
            audioFileLocation,
            date,
            name,
            trackName,
            uid,
          } = track;

          return <TrackSquare key={name} track={track} />;
        })}
    </div>
  );
};

export default Carousel;
