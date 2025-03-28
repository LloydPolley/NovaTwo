"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import dynamic from "next/dynamic";
import Play from "../LayoutComps/Buttons/Play";
import useAudioStore from "../../context/AudioStore";

const cx = classNames.bind(style);

const DynamicPlayer = dynamic(() => import("./widget"), {
  ssr: false,
});

const AudioWidget = () => {
  const { isPlaying, trackContext, audioRef, playContext, pauseContext } =
    useAudioStore();
  const [expanded, setExpanded] = useState(false);
  const [loadedTrack, setLoadedTrack] = useState(false);

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
          <img src={trackContext?.artwork} />
          <div className={cx("audio-widget__details")}>
            <p>{trackContext?.title || "Track"}</p>
            <p>{trackContext?.artist || "Artist"}</p>
          </div>
          <div className={cx("audio-widget__btn")}>
            <Play
              onClick={() => {
                console.log("isplaying", isPlaying);
                isPlaying ? pauseContext() : playContext(trackContext);
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
