import classNames from "classnames/bind";
import style from "./TrackRow.module.scss";
import Play from "../../Buttons/Play";
import Like from "../../Buttons/Like";

const cx = classNames.bind(style);

const TrackRow = ({ artist, name, artwork, play, audio }) => {
  console.log("audio", audio);

  return (
    <div className={cx("track-row")} key={`${artist} - ${name}`}>
      <div className={cx("track-row__naming")}>
        <img className={cx("track-row__artwork")} src={artwork} />
        {artist && <p>{artist}</p>}
        <p>{name}</p>
      </div>
      <div className={cx("track-row__buttons")}>
        <Like />
        <Play />
      </div>
    </div>
  );
};

export default TrackRow;
