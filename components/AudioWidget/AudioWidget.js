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
  }, []);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);

    const returnMins = minutes < 10 ? `0${minutes}` : minutes;
    const returnSecs = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMins} : ${returnSecs}`;
  };

  const loaded = () => {
    const seconds = Math.floor(audioRef?.current?.duration);
    const time = formatTime(seconds);
    setDuration(time);
  };

  return (
    <div className={cx("audio-widget")}>
      <audio
        ref={audioRef}
        src={track?.audioFileLocation}
        onLoadedMetadata={loaded}
        onTimeUpdate={() => {
          if (audioRef.current.currentTime < 1) return;
          var currentTimePercentage =
            (audioRef.current.currentTime / audioRef?.current?.duration) * 100;
          setProgress(currentTimePercentage);
          setCurrentTime(Math.floor(audioRef.current.currentTime));
        }}
      />
      <div className={cx("controls")}>
        <p>{currentTime}</p> <input type="range" value={progress} />
        <p>{duration}</p>
      </div>

      <button
        className={cx("control-play")}
        onClick={() => {
          isPlaying ? audioRef.current.pause() : audioRef.current.play();
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default AudioWidget;
