"use client";

import Track from "../Track";
import { TrackType } from "../../../types/tracks";
import { ReleaseType } from "@/types/releases";

const TrackContainer = ({ tracks }) => {
  console.log("tracks", tracks);
  return (
    <div className="grid gap-5 w-full p-5 flex-grow flex-wrap grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
      {tracks?.map((track) => {
        return <Track key={track.id} item={track} releaseId={null} />;
      })}
    </div>
  );
};

export default TrackContainer;
