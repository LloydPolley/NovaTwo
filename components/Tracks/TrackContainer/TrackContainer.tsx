import React, { forwardRef, Ref, Suspense } from "react";
import classNames from "classnames/bind";
import style from "./TrackContainer.module.scss";
import Track from "../Track";
import LoadingGrid from "../../LoadingGrid";
import { TrackType } from "../../../types/tracks";

const cx = classNames.bind(style);

type TrackListProps = {
  tracks?: TrackType[];
};

const TrackContainer = async ({ tracks }: TrackListProps) => {
  return (
    <Suspense fallback={<LoadingGrid />}>
      {tracks?.length > 0 && tracks[0].name !== undefined ? (
        <div className={cx("track-grid")}>
          {tracks.map((track) => {
            if (!track.artist) return null;
            return <Track key={track.name} track={track} />;
          })}
        </div>
      ) : (
        <LoadingGrid />
      )}
    </Suspense>
  );
};

export default TrackContainer;
