"use client";

import React, { forwardRef, Ref, Suspense, useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./TrackContainer.module.scss";
import Track from "../Track";
import { TrackType } from "../../../types/tracks";
import Link from "next/link";

const cx = classNames.bind(style);

type TrackListProps = {
  tracks?: TrackType[];
};

const TrackContainerServer = ({ text, tracks, url }) => {
  return (
    <Suspense fallback={<div className={cx("track-grid")}>Loading</div>}>
      <div className={cx("track-container")}>
        <div className={cx("track-container__text")}>
          <h2>{text}</h2>
          {url && <Link href={`discover?${url}`}>See more</Link>}
        </div>

        {tracks?.length > 0 && tracks[0].name !== undefined ? (
          <div className={cx("track-grid")}>
            {tracks.map((track) => {
              if (!track.artist) return null;
              return <Track key={track.name} item={track} type="both" />;
            })}
          </div>
        ) : (
          <p>No Tracks here...</p>
        )}
      </div>
    </Suspense>
  );
};

export default TrackContainerServer;
