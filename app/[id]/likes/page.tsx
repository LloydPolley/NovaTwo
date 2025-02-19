"use client";

import { useEffect, useState } from "react";
import getUserLikes from "@/api/likes/getUserLikes";
import TrackContainer from "@/components/Music/TrackContainer";
import AritstHero from "@/components/ArtistHero";

export default function Likes({ params }) {
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
      <AritstHero
        title={"Likes"}
        img={
          "https://images.pexels.com/photos/29708311/pexels-photo-29708311/free-photo-of-dynamic-orange-abstract-digital-art.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        box
      />
      <TrackContainer trackList={likes} />
    </div>
  );
}
