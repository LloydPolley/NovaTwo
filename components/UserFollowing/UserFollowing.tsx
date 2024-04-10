"use client";

import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./UserFollowing.module.scss";
import TrackSquare from "../Tracks/TrackSquare";
import { getAllArtists } from "../../api/getTracks";
import { getUserFollowers } from "../../api/addFollower";
import Link from "next/link";
import UserWidget from "../UserWidget";
import { useFollowersContext } from "../../context/FollowersContext";

const cx = classNames.bind(style);

const Carousel = ({ users, searchParams, hp }) => {
  const { followers, setNewFollower } = useFollowersContext();

  console.log("followers", followers);

  if (searchParams?.f !== "following") {
    return null;
  }

  return (
    <div className={cx("following")}>
      {users &&
        users?.map((user) => {
          return <UserWidget user={user} key={user?.uid} />;
        })}
    </div>
  );
};

export default Carousel;
