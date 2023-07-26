"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Like.module.scss";
import Favourite from "../../Icons/Favourite";
import FavouriteFilled from "../../Icons/FavouriteFilled";
import { addLike, deleteLike, isLikedByUser } from "../../../api/addLike";
import { useLoginContext } from "../../../context/LoginContext";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Like({ uid, trackId, track }) {
  const [isLiked, setIsLiked] = useState(false);
  const { userData } = useLoginContext();

  // const notify = () => toast("Wow so easy!");

  const fetchLike = async () => {
    const f = await isLikedByUser({ uid, trackId });
    await setIsLiked(f);
  };

  const clickHandler = async () => {
    // notify();
    isLiked
      ? setIsLiked(await deleteLike({ uid, trackId }))
      : setIsLiked(
          await addLike({ uid, trackId, track, userLikedUid: userData?.uid })
        );
  };

  useEffect(() => {
    fetchLike();
  }, [isLiked]);

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
