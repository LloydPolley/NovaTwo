"use client";

import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import { useAudioContext } from "../../context/AudioContext";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";
// import AudioPlayer, {
//   ActiveUI,
//   InterfaceGridTemplateArea,
//   PlayerPlacement,
//   PlayListPlacement,
//   ProgressUI,
//   VolumeSliderPlacement,
// } from "react-modern-audio-player";
import dynamic from "next/dynamic";

const cx = classNames.bind(style);

const DynamicPlayer = dynamic(() => import("./widget"), {
  ssr: false,
});

const AudioWidget = () => {
  const { isPlaying, setIsPlaying, trackContext, audioRef } = useAudioContext();
  const [expanded, setExpanded] = useState(false);
  const [loadedTrack, setLoadedTrack] = useState(false);

  const playList = [
    {
      name: "Welcome To The Opera",
      writer: "Anyma",
      img: "https://firebasestorage.googleapis.com/v0/b/novatwo-f3f41.appspot.com/o/Anyma%2Ftracks%2FWelcome%20To%20The%20Opera%2Fartwork%2Fanyma%20welcome%20to%20the%20opera.jpeg?alt=media&token=4eff78c0-1d0d-4e7c-abf2-52dea16abe23",
      src: `${trackContext?.audioFileLocation}`,
      id: 1,
    },
  ];

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
