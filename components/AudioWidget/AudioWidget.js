"use client";

import classNames from "classnames/bind";
import style from "./AudioWidget.module.scss";
import Link from "next/link";
import { useLoginContext } from "../../context/LoginContext";
import { useSelectedLayoutSegment } from "next/navigation";
import { useAudioContext } from "../../context/AudioContext";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

const cx = classNames.bind(style);

const links = [
  { label: "Nova", path: "/", segement: null },
  { label: "Discover", path: "/dj", segement: "dj" },
];

const AudioWidget = () => {
  const { userData } = useLoginContext();
  const activeSegment = useSelectedLayoutSegment();
  console.log("active", activeSegment);
  const { isPlaying, audioToggle, url } = useAudioContext();

  return (
    <div className={cx("audio-widget", isPlaying && "audio-widget__active")}>
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
        layout="vertical"
        // onClickPrevious={handleClickPrevious}
        // onClickNext={handleClickNext}
        // onEnded={handleClickNext}
      />
    </div>
  );
};

export default AudioWidget;
