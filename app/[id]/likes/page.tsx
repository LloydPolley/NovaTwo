"use client";

import TrackContainer from "@/components/Music/TrackContainer";
import useLikesStore from "@/context/LikesStore";
import Header from "@/components/Header/Header";

export default function Likes() {
  const { likes } = useLikesStore((state) => state);

  return (
    <div className="rounded flex-grow">
      <Header title={"Likes"} />
      <TrackContainer trackList={likes} />
    </div>
  );
}
