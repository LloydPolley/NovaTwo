"use client";

import classNames from "classnames/bind";
import styles from "./Tracks.module.scss";
import useGetTracks from "../hooks/useGetTracks";
import { useEffect } from "react";
import TrackSquare from "../components/Track/TrackSquare";
import { useQuery } from "@tanstack/react-query";
import SwiperHero from "../components/Swiper/SwiperHero";

const cx = classNames.bind(styles);

export default function Tracks() {
  const { getAllTracks, trackList } = useGetTracks();
  const { data, status } = useQuery(["getAllTracks"], getAllTracks);

  return (
    <div className={cx("tracks-page")}>
      <SwiperHero />
      <div className={cx("header")}>
        <h2>Featured</h2>
      </div>
      <div className={cx("track-squares")}>
        {data &&
          data.slice(0, 9).map((track) => {
            if (!track.artist) return;

            const {
              artist,
              artworkFileLocation,
              audioFileLocation,
              date,
              name,
              trackName,
              uid,
            } = track;

            return (
              <TrackSquare
                key={`${artist}-${date}`}
                name={name}
                artist={artist}
                artwork={artworkFileLocation}
                audioFileLocation={audioFileLocation}
                date={date}
                trackName={trackName}
                uid={uid}
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
