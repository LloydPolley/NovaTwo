import React, { forwardRef, Ref, Suspense } from "react";
import classNames from "classnames/bind";
import style from "./TrackGridContainer.module.scss";
import TrackGrid from "./TrackGrid";
import LoadingGrid from "../../LoadingGrid";
import { Track } from "../../../types/tracks";

const cx = classNames.bind(style);

type TrackListProps = {
  tracks?: Track[];
};

const TrackGridContainer = async ({ tracks }: TrackListProps) => {
  return (
    <Suspense fallback={<LoadingGrid />}>
      <div className={cx("track-grid")}>
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
};

export default TrackGridContainer;
