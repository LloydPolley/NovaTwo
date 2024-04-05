"use client";

import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import { useAudioContext } from "../../context/AudioContext";

import AudioPlayer from "react-modern-audio-player";

const cx = classNames.bind(style);

const AudioWidget = ({ audioRef }) => {
  const { isPlaying, trackContext } = useAudioContext();

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
    <AudioPlayer
      audioRef={audioRef}
      playList={playList}
      audioInitialState={{
        muted: false,
        volume: 1,
        curPlayId: 1,
        isPlaying: isPlaying,
      }}
      placement={{
        player: "bottom",
      }}
      activeUI={{
        playButton: false,
        prevNnext: false,
        volume: false,
        volumeSlider: false,
        repeatType: false,
        trackTime: false,
        progress: "bar",
        artwork: false,
      }}
      rootContainerProps={{
        colorScheme: "dark",
      }}
    />
  );
};

export default AudioWidget;
