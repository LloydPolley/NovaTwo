"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Play.module.scss";
import { useAudioContext } from "../../../context/AudioContext";

const cx = classNames.bind(styles);

function Play({ trackUrl }) {
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
      className={cx("play")}
      onClick={() => {
        !localPlaying ? play(trackUrl) : pause();
      }}
    >
      {!localPlaying ? "►" : "⏸︎"}
    </button>
  );
}

export default Play;
