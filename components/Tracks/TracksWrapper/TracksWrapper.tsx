"use client";

import { useEffect, useRef, useState } from "react";
import { getAllLikedTracks } from "../../../api/getTracks";
import classNames from "classnames/bind";
import style from "./TracksWrapper.module.scss";
import TrackGridContainer from "../TrackGridContainer";
import { TrackWrapperProps } from "../../../types/tracks";

const cx = classNames.bind(style);

export default function TracksWrapper({
  tracks,
  uid,
  params,
}: TrackWrapperProps) {
  const [showTracks, setShowTracks] = useState(true);
  const [height, setHeight] = useState(0);
  const [likes, setLikes] = useState([]);
  const isUserProfile = uid === params?.id;
  const tracksContainerRef = useRef();

  const getLikes = async () => {
    setLikes(await getAllLikedTracks(uid));
  };

  useEffect(() => {
    console.log("tracksContainerRef");
    if (tracksContainerRef) {
      setHeight(tracksContainerRef?.current?.offsetHeight || 100);
    }
  }, [tracksContainerRef]);

  useEffect(() => {
    if (!showTracks) {
      getLikes();
    }
  }, [showTracks]);

  const trackType = showTracks ? tracks : likes;

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
            Releases
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
      <TrackGridContainer
        tracks={trackType}
        empty={"No posts"}
        height={height}
        ref={tracksContainerRef}
      />
    </div>
  );
}
