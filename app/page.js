"use client";

import classNames from "classnames/bind";
import styles from "./Tracks.module.scss";
import useGetTracks from "../hooks/useGetTracks";
import { useEffect } from "react";
import TrackSquare from "../components/Track/TrackSquare";

const cx = classNames.bind(styles);

export default function Tracks() {
  const { getTracks, trackList } = useGetTracks();

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div className={cx("tracks-page")}>
      <div className={cx("header")}>
        <h2>Featured</h2>
      </div>
      <div className={cx("track-squares")}>
        {trackList &&
          trackList.map((track) => {
            if (!track.artist) return;

            const {
              artist,
              artworkFileLocation,
              audioFileLocation,
              date,
              name,
              trackName,
            } = track;

            return (
              <TrackSquare
                key={`${artist}-${date}`}
                name={name}
                artist={artist}
                artworkFileLocation={artworkFileLocation}
                audioFileLocation={audioFileLocation}
                date={date}
                trackName={trackName}
              />
            );
          })}
      </div>
      <div className={cx("header")}>
        <h2>Recent releases</h2>
      </div>
    </div>
  );
}
