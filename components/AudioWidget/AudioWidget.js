"use client";

import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import { useAudioContext } from "../../context/AudioContext";

const cx = classNames.bind(style);

const AudioWidget = () => {
  const { isPlaying, playContext, pauseContext, track, setIsPlaying } =
    useAudioContext();
  const audioRef = useRef();
  const progressBarRef = useRef();

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("addevenb");
      window.addEventListener("pausePlayer", (event) => {
        console.log("I'm listening on a custom event");
        audioRef.current.pause();
      });
      window.addEventListener("playPlayer", (event) => {
        console.log("I'm listening on a custom event");
        audioRef.current.play();
      });
    }

    console.log("pro", progressBarRef);
  }, []);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);

    const returnMins = minutes < 10 ? `0${minutes}` : minutes;
    const returnSecs = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMins} : ${returnSecs}`;
  };

  const changeRange = () => {
    const percentage = progressBarRef.current.value;
    const targetTime = (percentage / 100) * audioRef.current.duration;
    audioRef.current.currentTime = targetTime;
    setCurrentTime(formatTime(Math.floor(targetTime)));
  };

  const loaded = () => {
    const seconds = Math.floor(audioRef?.current?.duration);
    const time = formatTime(seconds);
    setDuration(time);
  };

  const onTimeUpdate = () => {
    if (audioRef.current.currentTime < 1) return;
    var currentTimePercentage =
      (audioRef.current.currentTime / audioRef?.current?.duration) * 100;
    setProgress(currentTimePercentage);
    setCurrentTime(formatTime(Math.floor(audioRef.current.currentTime)));
  };

  return (
    <div className={cx("audio-widget")}>
      <audio
        ref={audioRef}
        src={track?.audioFileLocation}
        onLoadedMetadata={loaded}
        onTimeUpdate={onTimeUpdate}
      />
      <div className={cx("controls")}>
        <p>{currentTime}</p>
        <input
          type="range"
          defaultValue={0}
          onChange={changeRange}
          step={0.01}
          ref={progressBarRef}
        />
        <p>{duration}</p>
      </div>

      <button
        className={cx("control-play")}
        onClick={() => {
          isPlaying ? pause() : play();
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default AudioWidget;
