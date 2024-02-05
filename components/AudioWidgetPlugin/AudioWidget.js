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
  const { isPlaying, setIsPlaying, trackContext } = useAudioContext();
  const audioRef = useRef();
  const progressBarRef = useRef();

  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [loadedTrack, setLoadedTrack] = useState(false);

  const [progressType, setProgressType] = useState("waveform");
  const [playerPlacement, setPlayerPlacement] = useState("bottom");
  const [interfacePlacement, setInterfacePlacement] = useState({
    artwork: "row1-2",
    playList: "row1-3",
    trackInfo: "row2-2",
    trackTimeCurrent: "row3-1",
    progress: "row3-2",
    trackTimeDuration: "row3-3",
    playButton: "row4-2",
    repeatType: "row4-1",
    volume: "row4-3",
  });
  const [playListPlacement, setPlayListPlacement] = useState("top");
  const [volumeSliderPlacement, setVolumeSliderPlacement] = useState();
  const [theme, setTheme] = useState("dark" || "light" || undefined);
  const [width, setWidth] = useState("100%");
  const [activeUI, setActiveUI] = useState({ all: true });

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
      <DynamicPlayer />
    </div>
  );
};

export default AudioWidget;
