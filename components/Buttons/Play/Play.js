"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Play.module.scss";
import { useAudioContext } from "../../../context/AudioContext";
import PlayIcon from "../../Icons/PlayIcon";

const cx = classNames.bind(styles);

function Play({ trackUrl, abso }) {
  const { play, pause, isPlaying, url } = useAudioContext();
  const [localPlaying, setLocalPlaying] = useState();

  useEffect(() => {
    if (isPlaying && url === trackUrl) {
      setLocalPlaying(true);
      return;
    }
    setLocalPlaying(false);
  }, [isPlaying, url, trackUrl]);

  return (
    <button
      className={cx("play", abso && "play__abso")}
      onClick={() => {
        !localPlaying ? play(trackUrl) : pause();
      }}
    >
      {!localPlaying ? <PlayIcon /> : "⏸︎"}
    </button>
  );
}

export default Play;
