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

const cx = classNames.bind(style);

type TrackListProps = {
  tracks?: TrackType[];
};

const TrackContainer = ({ searchParams, params }) => {
  const [tracks, setTracks] = useState([]);
  const { order } = searchParams;

  console.log("searchPara", searchParams);
  console.log("params", params);

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
    fetchingTracks();
  }, [searchParams.f]);

  return (
    <Suspense fallback={<p>Loading</p>}>
      {tracks?.length > 0 && tracks[0].name !== undefined ? (
        <div className={cx("track-grid")}>
          {tracks.map((track) => {
            if (!track.artist) return null;
            return <Track key={track.name} track={track} />;
          })}
        </div>
      ) : (
        <p>No Tracks here...</p>
      )}
    </Suspense>
  );
};

export default TrackContainer;
