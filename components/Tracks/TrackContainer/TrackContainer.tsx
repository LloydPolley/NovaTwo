"use client";

import React, { forwardRef, Ref, Suspense, useState, useEffect } from "react";
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
import { getUserLikes } from "../../../api/addLike";
import Link from "next/link";

const cx = classNames.bind(style);

type TrackListProps = {
  searchParams: {
    f: string;
    order: string;
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
}: TrackListProps) => {
  const [tracks, setTracks] = useState([]);
  const { order } = searchParams;

  const fetchingTracks = async () => {
    switch (searchParams.f) {
      case "likes":
        setTracks(await getUserLikes(params?.id));
        break;
      case "tracks":
        setTracks(await getTracksWhere("mix", false, params.id));
        break;
      case "mix":
        setTracks(await getTracksWhere("mix", true, params.id));
        break;
      case "all":
        setTracks(await getArtistTracks(params?.id));
        break;
      default:
        setTracks(await getAllTracksOrdered(order));
        break;
    }
  };

  useEffect(() => {
    setTracks([]);
    if (searchParams.f !== "following" && !trackList) {
      fetchingTracks();
    } else if (trackList) {
      setTracks(trackList);
    }
  }, [searchParams.f]);

  if (searchParams?.f === "following") {
    return null;
  }

  return (
    <Suspense fallback={<LoadingGrid />}>
      <div className={cx("track-container")}>
        {text && (
          <div className={cx("track-container__text")}>
            <h2>{text}</h2>
            {url && <Link href={`discover?${url}`}>See more</Link>}
          </div>
        )}
        {tracks?.length > 0 && tracks[0].name !== undefined && (
          <div className={cx("track-grid")}>
            {tracks.map((track) => {
              if (!track.artist) return null;
              return <Track key={track.name} item={track} type="both" />;
            })}
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default TrackContainer;
