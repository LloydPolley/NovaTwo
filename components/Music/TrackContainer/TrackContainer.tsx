"use client";

import React from "react";
import Track from "../Track";
import { TrackType } from "../../../types/tracks";

type TrackListProps = {
  trackList?: TrackType[];
};

const TrackContainer = ({ trackList }: TrackListProps) => {
  return (
    <div className="p-5 flex-1">
      <div className="grid gap-5 w-full flex-grow flex-wrap grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {trackList?.map((track) => {
          console.log("track", track);
          if (!track.artist) return null;
          return <Track key={track.name} item={track} />;
        })}
      </div>
    </div>
  );
};

export default TrackContainer;
