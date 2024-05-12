"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import Favourite from "../../Icons/Favourite";
import FavouriteFilled from "../../Icons/FavouriteFilled";
import useLikesStore from "../../../context/LikesStore";
import useAuthStore from "../../../context/AuthStore";

const cx = classNames.bind(styles);

function Like({ track }) {
  const { trackId } = track || {};
  const [isLiked, setIsLiked] = useState(false);
  const { likes, addLike, removeLike } = useLikesStore((state) => state);

  const { userData } = useAuthStore((state) => state);

  const clickHandler = () => {
    const trackDetails = { ...track, currentUser: userData?.uid };
    console.log("isLiked", isLiked);
    !isLiked ? addLike(trackDetails) : removeLike(trackDetails);
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
