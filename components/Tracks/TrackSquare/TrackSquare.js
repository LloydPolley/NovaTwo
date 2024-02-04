"use client";

import classNames from "classnames/bind";
import style from "./TrackSquare.module.scss";
import Play from "../../Buttons/Play";
import Link from "next/link";
import { useAudioContext } from "../../../context/AudioContext";

const cx = classNames.bind(style);

const TrackSquare = ({ track }) => {
  const {
    artist,
    artworkFileLocation,
    audioFileLocation,
    artwork,
    date,
    name,
    trackName,
    uid,
  } = track;
  const { playContext, pauseContext, isPlaying, trackContext } =
    useAudioContext();
  const isPlayingLocal =
    isPlaying && trackContext?.audioFileLocation === audioFileLocation;

  return (
    <div
      className={cx("dj-square")}
      style={{
        backgroundImage: `url("${artworkFileLocation}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => {
        !isPlayingLocal ? playContext(track) : pauseContext();
      }}
    >
      <div className={cx("label")}>
        {name && <p>{`${name}`}</p>}
        <Link onClick={(e) => e.stopPropagation()} href={`/${uid}/releases`}>
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
