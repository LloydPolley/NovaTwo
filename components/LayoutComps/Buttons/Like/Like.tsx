"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import useLikesStore from "../../../../context/LikesStore";
import useAuthStore from "../../../../context/AuthStore";
import { Heart } from "lucide-react";

const cx = classNames.bind(styles);

function Like({ track }) {
  const { id } = track || {};
  const [isLiked, setIsLiked] = useState(false);
  const { likes, addLike, removeLike } = useLikesStore((state) => state);

  const { userData } = useAuthStore((state) => state);

  const clickHandler = async () => {
    const trackDetails = { ...userData, ...track, currentUser: userData?.id };
    isLiked
      ? removeLike(trackDetails, userData)
      : addLike(trackDetails, userData);
  };

  useEffect(() => {
    const isLikedByUser = likes?.find((like) => like.id === id);
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
      {isLiked ? <Heart fill="white" /> : <Heart />}
    </button>
  );
}

export default Like;
