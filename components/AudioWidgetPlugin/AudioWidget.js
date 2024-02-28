"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import { useAudioContext } from "../../context/AudioContext";
import PlayIcon from "../Icons/PlayIcon";
import PauseIcon from "../Icons/PauseIcon";
import dynamic from "next/dynamic";
import Play from "../Buttons/Play";

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
          <div className={cx("audio-widget__btn")}>
            <Play
              onClick={() => {
                isPlaying ? audioRef.current.pause() : audioRef.current.play();
              }}
              isPlayingAudio={isPlaying}
            />
          </div>
        </div>
        <DynamicPlayer audioRef={audioRef} />
      </div>
    </div>
  );
};

export default AudioWidget;
