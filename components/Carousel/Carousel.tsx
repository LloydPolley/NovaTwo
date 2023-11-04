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

          return (
            <TrackSquare
              key={name}
              name={name}
              artist={artist}
              artwork={artworkFileLocation}
              audioFileLocation={audioFileLocation}
              date={date}
              trackName={trackName}
              uid={uid}
            />
          );
        })}
    </div>
  );
};

export default Carousel;
