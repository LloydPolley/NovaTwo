"use client";

import { useEffect, useState } from "react";
import { getDj } from "../../../api/getDjs";
import AritstHero from "../../../components/ArtistHero";
import LikesContainer from "../../../components/LikesContainer/LikesContainer";
import getUserLikes from "../../../api/likes/getUserLikes";

export default function Likes({ params }) {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const userId = params?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUser = await getDj(userId);
      setUser(fetchedUser);
    };

    const fetchLikesData = async () => {
      const fetchedLikes = await getUserLikes(userId);
      setLikes(fetchedLikes);
    };

    if (userId) {
      fetchUserData();
      fetchLikesData();
    }
  }, [userId]);

  return (
    <div className="rounded flex-grow">
      {user && (
        <AritstHero title={user.displayName} img={user.profile} user={user} />
      )}
      <LikesContainer uid={userId} likes={likes} />
    </div>
  );
}
