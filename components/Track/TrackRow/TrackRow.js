"use client";

import classNames from "classnames/bind";
import style from "./TrackRow.module.scss";
import Play from "../../Buttons/Play";
import Like from "../../Buttons/Like";
import Link from "next/link";
import { useAudioContext } from "../../../context/AudioContext";

const cx = classNames.bind(style);

const TrackRow = ({ artist, name, artwork, play, audio, uid }) => {
  const { playTrack, pause, isPlaying, url } = useAudioContext();
  const isPlayingLocal = isPlaying && url === audio;

  console.log("------------------------------");
  console.log("name", name);
  console.log("isPlaying", isPlaying);
  console.log("url === audio", url === audio);
  return (
    <div
      className={cx("track-row")}
      key={`${artist} - ${name}`}
      onClick={() => {
        !isPlayingLocal ? playTrack(audio) : pause();
      }}
    >
      <div className={cx("track-row__naming")}>
        <img className={cx("track-row__artwork")} src={artwork} />
        <div className={cx("track-row__text")}>
          <p className={cx("track-row__name")}>{name}</p>
          {artist && (
            <Link
              className={cx("track-row__artist")}
              onClick={(e) => e.stopPropagation()}
              href={`/discover/${uid}`}
            >
              {artist}
            </Link>
          )}
        </div>
      </div>
      <div className={cx("track-row__buttons")}>
        <Like />
        <Play isPlayingAudio={isPlayingLocal} />
      </div>
    </div>
  );
};

export default TrackRow;
