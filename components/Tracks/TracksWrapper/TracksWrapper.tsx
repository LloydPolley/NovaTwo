"use client";

import { Suspense, useEffect, useRef, useState } from "react";
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
  isArtist,
}: TrackWrapperProps) {
  const [showTracks, setShowTracks] = useState(true);
  const [height, setHeight] = useState(0);
  const [likes, setLikes] = useState([]);
  const isUserProfile = uid === params?.id;
  const tracksContainerRef = useRef<HTMLInputElement>();

  const getLikes = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const getLike = await getAllLikedTracks(uid);
    console.log("set");
    setLikes(getLike);
  };

  useEffect(() => {
    if (tracksContainerRef) {
      setHeight(tracksContainerRef?.current?.offsetHeight || 100);
    }
  }, [tracksContainerRef]);

  useEffect(() => {
    if (!showTracks) {
      console.log("get likes");
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
      <Suspense
        key={showTracks ? "showTracks" : "likes"}
        fallback={<div className={cx("loading")}>loading</div>}
      >
        <TrackGridContainer
          tracks={trackType}
          ref={tracksContainerRef}
          isArtist={isArtist}
        />
      </Suspense>
    </div>
  );
}
