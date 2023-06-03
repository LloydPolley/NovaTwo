"use client";

import Head from "next/head";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import useDjs from "../../../hooks/useDjs";
import { useQuery } from "@tanstack/react-query";
import useGetTracks from "../../../hooks/useGetTracks";
import TrackSquare from "../../../components/Track/TrackSquare";

const cx = classNames.bind(styles);

export default function DjProfile({ params }) {
  const { getDj } = useDjs();
  const { getArtistTracks } = useGetTracks();
  const { data, status } = useQuery(["getDj", params?.id], getDj);
  const { data: tracks, status: trackLoading } = useQuery(
    ["getArtistTracks", params?.id],
    getArtistTracks
  );

  const loadingArist = status === "loading";

  console.log("data", data, tracks);
  return (
    <div className={cx("artist-page")}>
      <h1>{loadingArist ? "Loading" : data?.displayName}</h1>
      <div className={cx("artist-header")}>
        {tracks &&
          tracks.map((track) => {
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
