"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./TracksWrapper.module.scss";
import TrackListContainer from "../TrackListContainer";
import TrackGridContainer from "../TrackGridContainer";

const cx = classNames.bind(style);

export default function TracksWrapper({ tracks, likes, uid, params }) {
  const [showTracks, setShowTracks] = useState(true);
  const [width, setWidth] = useState(0);
  const isUserProfile = uid === params?.id;
  const trackType = showTracks ? tracks : likes;

  console.log("likes", likes);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("running", window.width);

      setWidth(window.innerWidth);
    }
  }, []);

  useEffect(() => {}, []);

  return (
    <div className={cx("tracks-wrapper")}>
      {!!params && (
        <div className={cx("tracks-wrapper__toggles")}>
          <button
            className={cx(showTracks && "tracks-wrapper__active")}
            onClick={() => {
              setShowTracks(true);
            }}
          >
            TRACKS
          </button>
          {isUserProfile && (
            <button
              className={cx(!showTracks && "tracks-wrapper__active")}
              onClick={() => {
                setShowTracks(false);
              }}
            >
              Likes
            </button>
          )}
        </div>
      )}
      {width < 700 ? (
        <TrackListContainer tracks={trackType} empty={"No posts"} />
      ) : (
        <TrackGridContainer tracks={trackType} empty={"No posts"} />
      )}
    </div>
  );
}
