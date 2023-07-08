"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Play.module.scss";
import { useAudioContext } from "../../../context/AudioContext";
import PlayIcon from "../../Icons/PlayIcon";
import PauseIcon from "../../Icons/PauseIcon";

const cx = classNames.bind(styles);

function Play({ trackUrl, abso, isPlayingAudio }) {
  const { playTrack, pause, isPlaying, url } = useAudioContext();

  return (
    <button className={cx("play", abso && "play__abso")}>
      {!isPlayingAudio ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}

export default Play;
