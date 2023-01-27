"use client";

import classNames from "classnames/bind";
import style from "./AudioPlayer.module.scss";
import { useState, useRef, useEffect } from "react";
import AudioProvider from "../../context/AudioContext";
import { useAudioContext } from "../../context/AudioContext";

const cx = classNames.bind(style);

const AudioPlayer = () => {
  const { isPlaying, audioToggle } = useAudioContext();

  // useEffect(() => {
  //   console.log("------------------");
  //   if (!isPlaying) {
  //     current?.play();
  //     setIsPlaying(!isPlaying);
  //   }
  // }, [isPlaying]);

  return (
    <div className={cx("audio-player")}>
      <button onClick={audioToggle}>{isPlaying ? "Pause" : "►"}</button>
    </div>
  );
};

export default AudioPlayer;
