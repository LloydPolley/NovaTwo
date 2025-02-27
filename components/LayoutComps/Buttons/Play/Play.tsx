"use client";

import { MouseEventHandler } from "react";
import classNames from "classnames/bind";
import styles from "./Play.module.scss";
import PlayIcon from "../../../Icons/PlayIcon";
import PauseIcon from "../../../Icons/PauseIcon";
import { Pause, Play } from "lucide-react";

type PlayProps = {
  abso?: boolean;
  isPlayingAudio: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const cx = classNames.bind(styles);

function PlayButton({ abso, isPlayingAudio, onClick }: PlayProps) {
  return (
    <button className={cx("play", abso && "play__abso")} onClick={onClick}>
      {!isPlayingAudio ? <Play /> : <Pause />}
    </button>
  );
}

export default PlayButton;
