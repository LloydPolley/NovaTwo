"use client";

import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import useGetTracks from "../hooks/useGetTracks";
import TrackSquare from "../components/Track/TrackSquare";
import { useQuery } from "@tanstack/react-query";
import SwiperHero from "../components/Swiper/SwiperHero";

const cx = classNames.bind(styles);

export default function Home() {
  const { getAllTracks, trackList } = useGetTracks();
  const { data, status } = useQuery(["getAllTracks"], getAllTracks);

  return (
    <div className={cx("home")}>
      <SwiperHero />
      <div className={cx("home__header")}>
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
    </div>
  );
}
