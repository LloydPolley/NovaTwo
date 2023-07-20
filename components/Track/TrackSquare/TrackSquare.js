"use client";

import classNames from "classnames/bind";
import style from "./TrackSquare.module.scss";
import Play from "../../Buttons/Play";
import Link from "next/link";
import { useAudioContext } from "../../../context/AudioContext";

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
  const { playTrack, pause, isPlaying, url } = useAudioContext();
  const isPlayingLocal = isPlaying && url === audioFileLocation;

  return (
    <div
      className={cx("dj-square")}
      style={{
        backgroundImage: `url(${artwork})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => {
        !isPlayingLocal ? playTrack(audioFileLocation) : pause();
      }}
    >
      <div className={cx("label")}>
        {name && <p>{`${name}`}</p>}
        <Link onClick={(e) => e.stopPropagation()} href={`/discover/${uid}`}>
          {artist}
        </Link>
      </div>
      {audioFileLocation && (
        <Play
          trackUrl={audioFileLocation}
          isPlayingAudio={isPlayingLocal}
          abso
        />
      )}
    </div>
  );
};

export default TrackSquare;
