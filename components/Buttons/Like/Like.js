"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import { useAudioContext } from "../../../context/AudioContext";
import Favourite from "../../Icons/Favourite";

const cx = classNames.bind(styles);

function Like({ trackUrl, abso }) {
  // const { play, pause, isPlaying, url } = useAudioContext();
  // const [localPlaying, setLocalPlaying] = useState();

  // useEffect(() => {
  //   if (isPlaying && url === trackUrl) {
  //     setLocalPlaying(true);
  //     return;
  //   }
  //   setLocalPlaying(false);
  // }, [isPlaying, url, trackUrl]);

  return (
    <button className={cx("play", abso && "play__abso")}>
      {/* {!localPlaying ? <Favourite /> : "⏸︎"} */}
      <Favourite />
    </button>
  );
}

export default Like;
