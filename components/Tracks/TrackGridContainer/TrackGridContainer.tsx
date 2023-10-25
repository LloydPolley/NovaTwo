import React, { forwardRef } from "react";
import classNames from "classnames/bind";
import style from "./TrackGridContainer.module.scss";
import TrackGrid from "./TrackGrid";
import { TrackListProps } from "../../../types/tracks";

const cx = classNames.bind(style);

const TrackList = forwardRef(({ tracks, height }, ref) => {
  if (tracks?.length < 0) {
    return null;
  }

  return (
    <div
      className={cx("track-grid")}
      style={{ minHeight: `${height}px` }}
      ref={ref}
    >
      {tracks &&
        tracks.map((track) => {
          if (!track.artist) return;

          const {
            artist,
            artworkFileLocation,
            audioFileLocation,
            uid,
            name,
            trackId,
            artwork,
          } = track;

          return (
            <TrackGrid
              key={name}
              name={name}
              artist={artist}
              artwork={artworkFileLocation || artwork}
              audioFileLocation={audioFileLocation}
              uid={uid}
              trackId={trackId}
            />
          );
        })}
    </div>
  );
});

export default TrackList;
