"use client";

import EP from "../EP";
import { ReleaseType } from "@/types/releases";

type TrackListProps = {
  releases: ReleaseType[];
};

const MusicWrapper = ({ releases }: TrackListProps) => {
  return (
    <div className="flex-1">
      {releases?.length > 0 ? (
        <div className="grid gap-6 w-full grid-cols-1 items-start">
          {releases.map((release) => {
            if (release.tracks.length === 0) return;
            return <EP key={release.id} release={release} />;
          })}
        </div>
      ) : (
        <p className="text-center min-h-[300px] flex flex-col justify-center">
          No Tracks here
        </p>
      )}
    </div>
  );
};

export default MusicWrapper;
