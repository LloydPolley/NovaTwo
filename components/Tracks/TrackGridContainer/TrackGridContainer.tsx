import React, { forwardRef, Ref, Suspense } from "react";
import classNames from "classnames/bind";
import style from "./TrackGridContainer.module.scss";
import TrackGrid from "./TrackGrid";
import { Track } from "../../../types/tracks";

const cx = classNames.bind(style);

type TrackListProps = {
  tracks: Track[];
  height?: number;
  isArtist?: boolean;
};

const TrackGridContainer = forwardRef<HTMLDivElement, TrackListProps>(
  ({ tracks, height, isArtist }, ref) => {
    if (!tracks || tracks.length === 0) {
      return null;
    }

    return (
      <Suspense fallback={<div className={cx("loading")}>loading</div>}>
        <div
          className={cx("track-grid", isArtist && "track-grid-artist")}
          style={{ minHeight: `${height}px` }}
          ref={ref}
        >
          {tracks.map((track) => {
            if (!track.artist) return null;

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
      </Suspense>
    );
  }
);

TrackGridContainer.displayName = "TrackGridContainer";

export default TrackGridContainer;
