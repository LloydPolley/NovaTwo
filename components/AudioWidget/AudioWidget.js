"use client";

import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import { useAudioContext } from "../../context/AudioContext";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";

const cx = classNames.bind(style);

const AudioWidget = () => {
  const { isPlaying, setIsPlaying, trackContext } = useAudioContext();
  const audioRef = useRef();
  const progressBarRef = useRef();

  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [loadedTrack, setLoadedTrack] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("pausePlayer", pause);
      window.addEventListener("playPlayer", play);
    }
  }, []);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
    animateProgressBar();
    setLoadedTrack(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const animateProgressBar = () => {
    const updateProgressBar = () => {
      if (audioRef.current.currentTime < 1) return;
      const currentTimePercentage =
        (audioRef.current.currentTime / audioRef?.current?.duration) * 100;
      setProgress(currentTimePercentage);
      progressBarRef.current.style.setProperty(
        "--seek-before-width",
        `${currentTimePercentage}%`
      );
      setCurrentTime(formatTime(Math.floor(audioRef.current.currentTime)));
    };
    requestAnimationFrame(updateProgressBar);
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

  return (
    <div
      className={cx(
        "audio-widget",
        expanded && "audio-expanded",
        !loadedTrack && "audio-unloaded"
      )}
    >
      {/* <div
        className={cx("audio-widget__expand-button")}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        +
      </div> */}
      <audio
        ref={audioRef}
        src={trackContext?.audioFileLocation}
        onLoadedMetadata={loaded}
        onTimeUpdate={animateProgressBar}
      />
      <div className={cx("audio-widget__inner")}>
        <input
          className={cx("progress-bar")}
          type="range"
          onChange={changeRange}
          step={0.01}
          ref={progressBarRef}
          value={progress}
        />
        <div className={cx("controls")}>
          <button
            className={cx("controls__play")}
            onClick={() => {
              isPlaying ? pause() : play();
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className={cx("controls__track")}>
            <img
              src={trackContext?.artworkFileLocation || trackContext?.artwork}
            />
            <div className={cx("controls__details")}>
              <p>{trackContext?.artist || "Artist"}</p>
              <p>{trackContext?.name || "Track"}</p>
            </div>
          </div>
          {/* <div className={cx("controls__times")}>
          <div className={cx("controls__time")}>
            <p>{currentTime}</p>
          </div>
          <div className={cx("controls__time")}>
            <p>{duration}</p>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default AudioWidget;
