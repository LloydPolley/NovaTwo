"use client";

import classNames from "classnames/bind";
import style from "./AudioPlayer.module.scss";
import { useState, useRef, useEffect } from "react";
import AudioProvider from "../../context/AudioContext";
import { useAudioContext } from "../../context/AudioContext";

const cx = classNames.bind(style);

const AudioPlayer = () => {
  const { isPlaying, setIsPlaying, audioSrc } = useAudioContext();

  const musicPlayers =
    typeof Audio !== "undefined" ? new Audio(audioSrc) : undefined;
  const { current } = useRef(musicPlayers);

  const audioToggle = () => {
    current?.play();

    console.log("toggle");
    // if (isPlaying) {
    //   current?.pause();
    // } else {
    //   console.log("play");
    // }

    // setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    console.log("------------------");
    if (isPlaying) {
      audioToggle();
    }
  }, [isPlaying]);

  return (
    <div className={cx("audio-player")}>
      <button onClick={audioToggle}>{isPlaying ? "Pause" : "►"}</button>
    </div>
  );
};

export default AudioPlayer;
