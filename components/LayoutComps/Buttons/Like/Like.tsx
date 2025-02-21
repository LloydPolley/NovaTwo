"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import Favourite from "../../../Icons/Favourite";
import FavouriteFilled from "../../../Icons/FavouriteFilled";
import useLikesStore from "../../../../context/LikesStore";
import useAuthStore from "../../../../context/AuthStore";

const addLikeNeon = async () => {
  const response = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "123",
      uid: "TdoZ6leQFIWqYJD5S1yG1uE3y7S2",
      trackid: "123",
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to like song");
  return data;
};

const cx = classNames.bind(styles);

function Like({ track }) {
  const { trackId } = track || {};
  const [isLiked, setIsLiked] = useState(false);
  const { likes, addLike, removeLike } = useLikesStore((state) => state);

  const { userData } = useAuthStore((state) => state);

  const clickHandler = async () => {
    const trackDetails = { ...track, currentUser: userData?.uid };
    !isLiked ? addLike(trackDetails) : removeLike(trackDetails);

    await addLikeNeon();
  };

  useEffect(() => {
    const isLikedByUser = likes.find(
      (likedTrack) => likedTrack.trackId === trackId
    );
    setIsLiked(!!isLikedByUser);
  }, [likes]);

  return (
    <button
      className={cx("play")}
      onClick={async (e) => {
        e.stopPropagation();
        clickHandler();
      }}
    >
      {!isLiked ? <Favourite /> : <FavouriteFilled />}
    </button>
  );
}

export default Like;
