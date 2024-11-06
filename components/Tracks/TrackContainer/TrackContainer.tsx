"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./TrackContainer.module.scss";
import Track from "../Track";
import LoadingGrid from "../../LoadingGrid";
import { TrackType } from "../../../types/tracks";
import {
  getAllTracksOrdered,
  getArtistTracks,
  getTracksWhere,
} from "../../../api/getTracks";
import Link from "next/link";

import useBearStore from "../../../context/LikesStore";

const cx = classNames.bind(style);

type TrackListProps = {
  searchParams: {
    f?: string;
    order?: string;
  };
  params: {
    id: string;
  };
  text?: string;
  trackList?: TrackType[];
  url?: string;
};

const TrackContainer = ({
  searchParams,
  params,
  text,
  trackList,
  url,
  page,
}: TrackListProps) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const type = page ? "page" : "both";

  useEffect(() => {
    setLoading(false);
  }, [tracks]);

  if (searchParams?.f === "following") {
    return null;
  }

  if (loading) {
    return <p className={cx("loading")}>Loading</p>;
  }

  return (
    <div className={cx("track-container")}>
      {text && (
        <div className={cx("track-container__text")}>
          <h2>{text}</h2>
          {url && <Link href={`discover?${url}`}>See more</Link>}
        </div>
      )}
      {trackList?.length > 0 ? (
        <div
          className={cx(
            "track-grid",
            type === "page" && "track-grid__discover"
          )}
        >
          {trackList?.map((track) => {
            if (!track.artist) return null;
            return <Track key={track.name} item={track} type={type} />;
          })}
        </div>
      ) : (
        <p className={cx("loading")}>No Tracks here</p>
      )}
    </div>
  );
};

export default TrackContainer;
