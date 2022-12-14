"use client";

import classNames from "classnames/bind";
import style from "./AudioPlayer.module.scss";
import { useState, useRef } from "react";

const cx = classNames.bind(style);

const music =
  "https://alhyfjsgghatgfbnsbtw.supabase.co/storage/v1/object/sign/tracks/Kevin%20de%20Vries%20-%20Dance%20With%20Me.m4a?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0cmFja3MvS2V2aW4gZGUgVnJpZXMgLSBEYW5jZSBXaXRoIE1lLm00YSIsImlhdCI6MTY1OTczNTA2MywiZXhwIjoxOTc1MDk1MDYzfQ.iK9-P47ZdjOCUE1Yr6Zu9Xz91aHp20BJHvGwdIUZtVw";

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const musicPlayers =
    typeof Audio !== "undefined" ? new Audio(music) : undefined;
  const { current } = useRef(musicPlayers);

  const audioToggle = () => {
    console.log("toggle");
    if (playing) {
      current?.pause();
    } else {
      current?.play();
    }

    setPlaying(!playing);
  };

  return (
    <div className={cx("audio-player")}>
      <button onClick={audioToggle}>{playing ? "Pause" : "►"}</button>
    </div>
  );
};

export default AudioPlayer;
