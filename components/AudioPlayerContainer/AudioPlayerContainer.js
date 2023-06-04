"use client";

import classNames from "classnames/bind";
import style from "./AudioPlayerContainer.module.scss";
import { useState, useRef, useEffect } from "react";
import AudioProvider from "../../context/AudioContext";
import { useAudioContext } from "../../context/AudioContext";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

const cx = classNames.bind(style);

const AudioPlayerContainer = () => {
  const { isPlaying, audioToggle, url } = useAudioContext();

  // useEffect(() => {
  //   console.log("------------------");
  //   if (!isPlaying) {
  //     current?.play();
  //     setIsPlaying(!isPlaying);
  //   }
  // }, [isPlaying]);

  return (
    <div
      className={cx(
        "audio-player-container",
        isPlaying && "audio-player-container__active"
      )}
    >
      {/* <button onClick={audioToggle}>{isPlaying ? "Pause" : "►"}</button> */}
      <AudioPlayer
        style={{ borderRadius: "20px", color: "white", padding: "20px" }}
        autoPlay
        src={url}
        onPlay={(e) => console.log("onPlay")}
        showSkipControls={true}
        showJumpControls
        showFilledProgress
        showFilledVolume
        showDownloadProgress
        // header={`Now playing:`}
        layout="horizontal"
        // onClickPrevious={handleClickPrevious}
        // onClickNext={handleClickNext}
        // onEnded={handleClickNext}
      />
    </div>
  );
};

export default AudioPlayerContainer;
