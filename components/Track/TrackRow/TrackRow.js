import classNames from "classnames/bind";
import style from "./TrackRow.module.scss";

const cx = classNames.bind(style);

const TrackRow = ({ artist, name, play }) => {
  return (
    <div className={cx("dj-widget")} key={`${artist} - ${name}`}>
      <p>{`${artist} - ${name}`}</p>
      <button
        onClick={() => {
          play();
          console.log("track row play");
        }}
      >
        Play
      </button>
    </div>
  );
};

export default TrackRow;
