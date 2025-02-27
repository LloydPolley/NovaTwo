"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import useLikesStore from "../../../../context/LikesStore";
import useAuthStore from "../../../../context/AuthStore";
import { Heart } from "lucide-react";

const cx = classNames.bind(styles);

function Like({ track }) {
  const { trackId } = track || {};
  const [isLiked, setIsLiked] = useState(false);
  const { likes, addLike, removeLike } = useLikesStore((state) => state);

  const { userData } = useAuthStore((state) => state);

  const clickHandler = async () => {
    const trackDetails = { ...userData, ...track, currentUser: userData?.uid };
    console.log("trackDetails", trackDetails);
    !isLiked ? addLike(trackDetails, userData) : removeLike(trackDetails);

    console.log("trackDetails", trackDetails);
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
      {!isLiked ? <Heart /> : <Heart fill="white" />}
    </button>
  );
}

export default Like;
