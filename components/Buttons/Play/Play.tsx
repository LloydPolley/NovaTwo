"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Play.module.scss";
import { useAudioContext } from "../../../context/AudioContext";
import PlayIcon from "../../Icons/PlayIcon";
import PauseIcon from "../../Icons/PauseIcon";

type PlayProps = {
  abso?: boolean;
  isPlayingAudio: boolean;
};

const cx = classNames.bind(styles);

function Play({ abso, isPlayingAudio }: PlayProps) {
  return (
    <button className={cx("play", abso && "play__abso")}>
      {!isPlayingAudio ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}

export default Play;
