"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import Favourite from "../../Icons/Favourite";
import FavouriteFilled from "../../Icons/FavouriteFilled";
import { useLoginContext } from "../../../context/LoginContext";
import { useLikesContext } from "../../../context/LikesContext";

const cx = classNames.bind(styles);

function Like({ track }) {
  const { trackId } = track || {};
  const [isLiked, setIsLiked] = useState(false);
  const { likes, addLike, removeLike } = useLikesContext();
  const { userData } = useLoginContext();

  const clickHandler = () => {
    const obj = { track, currentUser: userData?.uid };
    !isLiked ? addLike(obj) : removeLike(obj);
  };

  useEffect(() => {
    const isLikedByUser = likes.find(
      (likedTrack) => likedTrack.trackId === trackId
    );
    setIsLiked(isLikedByUser);
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
