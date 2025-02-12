"use client";

import { useEffect, useState } from "react";
import getUserLikes from "@/api/likes/getUserLikes";
import TrackContainer from "@/components/Music/TrackContainer";
import AritstHero from "@/components/ArtistHero";

export default function Likes({ params }) {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const userId = params?.id;

  useEffect(() => {
    const fetchLikesData = async () => {
      const fetchedLikes = await getUserLikes(userId);
      setLikes(fetchedLikes);
    };

    if (userId) {
      fetchLikesData();
    }
  }, [userId]);

  return (
    <div className="rounded flex-grow">
      <AritstHero title={"Likes"} imgBox={"./3.jpg"} overlay box />
      <TrackContainer trackList={likes} />
    </div>
  );
}
