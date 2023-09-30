"use client";

import { useEffect, useState, useRef } from "react";
import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useAudioContext } from "../../context/AudioContext";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

const cx = classNames.bind(style);

const AudioWidget = () => {
  const { isPlaying, playTrack, pause, url, name } = useAudioContext();
  const [layout, setLayout] = useState("horizontal-reverse");
  const player = useRef();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth < 700 ? "stacked" : "horizontal-reverse";
      setLayout(width);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("addevenb");
      window.addEventListener("pausePlayer", (event) => {
        console.log("I'm listening on a custom event");
        player.current.audio.current.pause();
      });
      window.addEventListener("playPlayer", (event) => {
        console.log("I'm listening on a custom event");
        player.current.audio.current.play();
      });
    }
  }, []);

  return (
    <div className={cx("audio-widget")}>
      <AudioPlayer
        style={{ borderRadius: "20px", color: "white", padding: "20px" }}
        // autoPlay
        src={url}
        onPlay={(e) => playTrack({ url, name })}
        onPause={() => {
          pause();
        }}
        showFilledProgress
        showFilledVolume
        showDownloadProgress
        header={name}
        layout={layout}
        ref={player}
      />
    </div>
  );
};

export default AudioWidget;
