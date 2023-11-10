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
  const { playContext, pauseContext, isPlaying, url } = useAudioContext();
  const isPlayingLocal = isPlaying && url === audioFileLocation;

  return (
    <div
      className={cx("dj-square")}
      style={{
        backgroundImage: `url(${artwork || artworkFileLocation})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => {
        !isPlayingLocal
          ? playContext({ url: audioFileLocation, name })
          : pauseContext();
      }}
    >
      <div className={cx("label")}>
        {name && <p>{`${name}`}</p>}
        <Link
          onClick={(e) => e.stopPropagation()}
          href={`/discover/${uid}/releases`}
        >
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
