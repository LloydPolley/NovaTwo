"use client";

import { useEffect, useState, MouseEventHandler } from "react";
import classNames from "classnames/bind";
import styles from "./Play.module.scss";
import { useAudioContext } from "../../../context/AudioContext";
import PlayIcon from "../../Icons/PlayIcon";
import PauseIcon from "../../Icons/PauseIcon";

type PlayProps = {
  abso?: boolean;
  isPlayingAudio: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const cx = classNames.bind(styles);

function Play({ abso, isPlayingAudio, onClick }: PlayProps) {
  return (
    <button className={cx("play", abso && "play__abso")} onClick={onClick}>
      {!isPlayingAudio ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}

export default Play;
