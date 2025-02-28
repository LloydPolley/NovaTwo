"use client";

import TrackContainer from "@/components/Music/TrackContainer";
import AritstHero from "@/components/ArtistHero";
import useLikesStore from "@/context/LikesStore";

export default function Likes() {
  const { likes } = useLikesStore((state) => state);

  return (
    <div className="rounded flex-grow">
      <div className="px-5 pt-5 lg:pt-10">
        <h1 className="text-6xl font-black">Likes</h1>
      </div>
      <TrackContainer trackList={likes} />
    </div>
  );
}
