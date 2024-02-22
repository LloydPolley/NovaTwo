"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import { useAudioContext } from "../../context/AudioContext";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import dynamic from "next/dynamic";

const cx = classNames.bind(style);

const DynamicPlayer = dynamic(() => import("./widget"), {
  ssr: false,
});

const AudioWidget = () => {
  const { isPlaying, trackContext, audioRef } = useAudioContext();
  const [expanded, setExpanded] = useState(false);
  const [loadedTrack, setLoadedTrack] = useState(false);
  const [time, setTime] = useState();

  useEffect(() => {
    if (isPlaying) {
      setLoadedTrack(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    setTime(audioRef?.current?.currentTime);
  }, [audioRef]);

  useEffect(() => {
    if (audioRef && audioRef.current && audioRef.current.duration) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const percentage = (currentTime / duration) * 100;
      console.log(`Current Percentage: ${percentage.toFixed(2)}%`);
    }
  }, [audioRef, time]);

  useEffect(() => {
    console.log("audioRef 0---", audioRef); // Check if audioRef is set
    if (audioRef && audioRef.current && audioRef.current.duration) {
      console.log("audioRef.current", audioRef.current); // Check if audioRef.current is set
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const percentage = (currentTime / duration) * 100;
      console.log(`Current Percentage: ${percentage.toFixed(2)}%`);
    }
  }, [audioRef, time]);

  return (
    <div
      className={cx(
        "audio-widget",
        expanded && "audio-expanded",
        !loadedTrack && "audio-unloaded"
      )}
    >
      <div className={cx("audio-widget__flex")}>
        <div className={cx("audio-widget__track")}>
          <img
            src={trackContext?.artworkFileLocation || trackContext?.artwork}
          />
          <div className={cx("audio-widget__details")}>
            <p>{trackContext?.name || "Track"}</p>
            <p>{trackContext?.artist || "Artist"}</p>
          </div>
        </div>
        <DynamicPlayer audioRef={audioRef} />
      </div>
    </div>
  );
};

export default AudioWidget;
