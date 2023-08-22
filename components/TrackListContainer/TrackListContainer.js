"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import style from "./TrackListContainer.module.scss";
import TrackList from "../TrackList/TrackList";

const cx = classNames.bind(style);

export default function TrackListContainer({ tracks, likes, uid, params }) {
  const [showTracks, setShowTracks] = useState(true);
  const isUserProfile = uid === params?.id;

  return (
    <div className={cx("track-list-container")}>
      <div className={cx("track-list-container__toggles")}>
        <button
          className={cx(showTracks && "track-list-container__active")}
          onClick={() => {
            setShowTracks(true);
          }}
        >
          Posts
        </button>
        {isUserProfile && (
          <button
            className={cx(!showTracks && "track-list-container__active")}
            onClick={() => {
              setShowTracks(false);
            }}
          >
            Likes
          </button>
        )}
      </div>
      {showTracks ? (
        <TrackList tracks={tracks} empty={"No posts"} />
      ) : (
        <>{isUserProfile && <TrackList tracks={likes} empty={"No likes"} />}</>
      )}
    </div>
  );
}
