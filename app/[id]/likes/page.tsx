"use client";

import { useEffect, useState } from "react";
import getUserLikes from "@/api/likes/getUserLikes";
import TrackContainer from "@/components/Music/TrackContainer";
import AritstHero from "@/components/ArtistHero";
import useLikesStore from "@/context/LikesStore";

export default function Likes({ params }) {
  const userId = params?.id;

  const { likes } = useLikesStore((state) => state);

  // console.log("LikesStore", LikesStore);

  console.log("likes", likes);

  return (
    <div className="rounded flex-grow">
      <AritstHero
        title={"Likes"}
        img={
          "https://images.pexels.com/photos/29708311/pexels-photo-29708311/free-photo-of-dynamic-orange-abstract-digital-art.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      />
      <TrackContainer trackList={likes} />
    </div>
  );
}
