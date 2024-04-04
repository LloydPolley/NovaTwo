"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import Favourite from "../../Icons/Favourite";
import FavouriteFilled from "../../Icons/FavouriteFilled";
import {
  addLikeToCollection,
  deleteLikeTracksCollection,
} from "../../../api/addLike";
import { useLoginContext } from "../../../context/LoginContext";

const cx = classNames.bind(styles);

function Like({ track, isLikedContext, setLocalLikes }) {
  const [isLiked, setIsLiked] = useState(false);
  const { userData } = useLoginContext();

  const clickHandler = async () => {
    const obj = { track, currentUser: userData?.uid };

    setIsLiked(
      !isLiked
        ? await addLikeToCollection(obj)
        : await deleteLikeTracksCollection(obj)
    );
    setLocalLikes(obj);
  };

  useEffect(() => {
    console.log("fetching like", isLikedContext);
    setIsLiked(isLikedContext);
  }, [isLikedContext, isLiked]);

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
