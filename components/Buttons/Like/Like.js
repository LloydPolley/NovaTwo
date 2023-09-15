"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import Favourite from "../../Icons/Favourite";
import FavouriteFilled from "../../Icons/FavouriteFilled";
import {
  addLikeToTracks,
  deleteLikeFromTracks,
  isLikedByUser,
} from "../../../api/addLike";
import { useLoginContext } from "../../../context/LoginContext";

const cx = classNames.bind(styles);

function Like({ uid, trackId, track, currentUser }) {
  const [isLiked, setIsLiked] = useState(false);
  const { userData } = useLoginContext();

  const fetchLike = async () => {
    const f = await isLikedByUser({ currentUser, trackId });
    await setIsLiked(f);
  };

  const clickHandler = async () => {
    console.log("click handler", isLiked ? "delete" : "add");
    const obj = { uid, trackId, track, currentUser: userData?.uid };
    setIsLiked(
      isLiked ? await deleteLikeFromTracks(obj) : await addLikeToTracks(obj)
    );
  };

  useEffect(() => {
    fetchLike();
  }, []);

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
