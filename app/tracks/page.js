"use client";

import Head from "next/head";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Tracks.module.scss";
import useGetTracks from "../../hooks/useGetTracks";
import { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { useAudioContext } from "../../context/AudioContext";
import TrackSquare from "../../components/Track/TrackSquare";

const cx = classNames.bind(styles);

export default function Tracks() {
  const { getTracks, trackList } = useGetTracks();
  // const [djList, setDjList] = useState();

  // const { details, setDetails } = useLoginContext();

  const { setIsPlaying, setAudioSrc, isPlaying, play, fetchAudio } =
    useAudioContext();

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div className={cx("tracks-page")}>
      <h1>Tracks</h1>
      <div className={cx("header")}>
        <h2>New on Nova</h2>
      </div>
      <div className={cx("track-squares")}>
        {trackList &&
          trackList.map((track) => {
            if (!track.artist) return;
            console.log("track", track);
            const { artist, name, fileUrl } = track;
            // fetchAudio(fileUrl);
            return (
              <TrackSquare
                name={name}
                artist={artist}
                play={play}
                url={fileUrl}
                key={Math.random()}
              />
            );
          })}
      </div>
    </div>
  );
}
