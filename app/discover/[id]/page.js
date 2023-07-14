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
import { useLoginContext } from "../../../context/LoginContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Edit from "../../../components/Icons/Edit";

const cx = classNames.bind(styles);

export default function DjProfile({ params }) {
  const { userData } = useLoginContext();

  const pathname = usePathname();
  const { getDj } = useDjs();
  const [isProfile, setIsProfile] = useState();
  const { data, status } = useQuery(["getDj", params?.id], getDj);
  const { data: tracks, status: trackLoading } = useQuery(
    ["getArtistTracks", params?.id],
    getArtistTracks
  );

  const loadingArist = status === "loading";

  useEffect(() => {
    if (userData?.uid === pathname.split("/")[2]) {
      setIsProfile(true);
    }
  }, [userData]);

  console.log("data", data, tracks);
  return (
    <div className={cx("artist")}>
      <div
        className={cx("artist__hero")}
        style={{
          backgroundImage: `url(${data?.photoURL})`,
        }}
      >
        {isProfile && <Edit />}
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
              audioFileLocation={track.audioFileLocation}
              artwork={track.artworkFileLocation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
