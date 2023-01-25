"use client";

import Head from "next/head";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Tracks.module.scss";
import useGetTracks from "../../hooks/useGetTracks";
import { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { useAudioContext } from "../../context/AudioContext";

const cx = classNames.bind(styles);

export default function Tracks() {
  const { getTracks, trackList } = useGetTracks();
  // const [djList, setDjList] = useState();

  // const { details, setDetails } = useLoginContext();

  const { setIsPlaying, setAudioSrc, isPlaying } = useAudioContext();

  useEffect(() => {
    getTracks();
  }, []);

  const handlePlay = () => {
    setAudioSrc(
      "https://firebasestorage.googleapis.com/v0/b/novatwo-f3f41.appspot.com/o/Maceo%20Plex%2Ftracks%2Ftest?alt=media&token=0d6f84d6-1cb4-4b32-b130-d5b356d57753"
    );
    setIsPlaying(!isPlaying);
    console.log("play button hit");
  };

  return (
    <div className={cx("tracks-page")}>
      <h1>Tracks</h1>
      <div className={cx("track-list")}>
        {trackList &&
          trackList.map((track) => {
            // console.log("tracj", track);
            if (!track.artist) return;

            const { artist, name } = track;

            return (
              <div className={cx("dj-widget")} key={`${artist} - ${name}`}>
                <p>{`${artist} - ${name}`}</p>
                <button onClick={handlePlay}>Play</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
