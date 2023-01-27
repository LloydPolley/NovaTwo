import classNames from "classnames/bind";
import style from "./TrackSquare.module.scss";
import useGetTracks from "../../../hooks/useGetTracks";
import { useEffect } from "react";

const cx = classNames.bind(style);

const TrackSquare = ({ artist, name, play, url }) => {
  // const { fetchAudio, audioUrl } = useGetTracks();

  // useEffect(() => {
  //   fetchAudio(url);
  // }, []);

  return (
    <div className={cx("dj-square")}>
      <div className={cx("label")}>
        <p>{`${artist} - ${name}`}</p>
      </div>
      <button
        onClick={() => {
          play();
        }}
      >
        ►
      </button>
    </div>
  );
};

export default TrackSquare;
