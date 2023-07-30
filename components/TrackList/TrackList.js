"use client";

import classNames from "classnames/bind";
import style from "./TrackList.module.scss";
import { useLoginContext } from "../../context/LoginContext";
import TrackRow from "../Track/TrackRow";
import { getAllLikedTracks } from "../../api/getTracks";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);

export default function TrackList() {
  const { userData } = useLoginContext();
  const [tracks, setTracks] = useState();

  const handleTrackFetch = async () => {
    if (!userData?.uid) return;
    const tracksData = await getAllLikedTracks(userData?.uid);
    setTracks(tracksData);
  };

  useEffect(() => {
    handleTrackFetch();
  }, [userData]);

  if (tracks?.length < 0) {
    return null;
  }

  console.log("tracks", tracks);

  return (
    <div className={cx("track-list")}>
      {tracks?.map((track) => (
        <TrackRow
          key={track.name}
          name={track.name}
          artist={track.artist}
          audioFileLocation={track.audioFileLocation}
          artwork={track.artwork}
          uid={track.uid}
          trackId={track.trackId}
        />
      ))}
    </div>
  );
}
