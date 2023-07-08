"use client";

import Head from "next/head";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./artist.module.scss";
import useDjs from "../../../hooks/useDjs";
import { useQuery } from "@tanstack/react-query";
import { getArtistTracks } from "../../../api/getTracks";
import TrackSquare from "../../../components/Track/TrackSquare";
import TrackRow from "../../../components/Track/TrackRow/TrackRow";

const cx = classNames.bind(styles);

export default function DjProfile({ params }) {
  const { getDj } = useDjs();
  const { data, status } = useQuery(["getDj", params?.id], getDj);
  const { data: tracks, status: trackLoading } = useQuery(
    ["getArtistTracks", params?.id],
    getArtistTracks
  );

  const loadingArist = status === "loading";

  console.log("data", data, tracks);
  return (
    <div className={cx("artist")}>
      <div
        className={cx("artist__hero")}
        style={{
          backgroundImage: `url(${data?.photoURL})`,
        }}
      >
        <h1>{loadingArist ? "Loading" : data?.displayName}</h1>
      </div>
      <div className={cx("artist__tracks")}>
        <h2>TRACKS</h2>
        <div className={cx("artist__track-list")}>
          {tracks?.map((track) => (
            <TrackRow
              key={track.name}
              name={track.name}
              artist={track.artist}
              audio={track.audioFileLocation}
              artwork={track.artworkFileLocation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
