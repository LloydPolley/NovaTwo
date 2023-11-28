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
  console.log("tracks", tracks.length);

  return (
    <Suspense fallback={<LoadingGrid />}>
      {tracks?.length > 0 ? (
        <div className={cx("track-grid")}>
          {console.log("runnings", tracks?.length, tracks)}
          {tracks.map((track) => {
            if (!track.artist) return null;
            return <Track key={track.name} track={track} />;
          })}
        </div>
      ) : (
        <LoadingGrid />
      )}

      {/* <div className={cx("track-grid")}>
        {tracks?.length > 0 ? (
          tracks.map((track) => {
            if (!track.artist) return null;
            return <Track key={track.name} track={track} />;
          })
        ) : (
          <LoadingGrid />
        )}
      </div> */}
    </Suspense>
  );
};

export default TrackContainer;
