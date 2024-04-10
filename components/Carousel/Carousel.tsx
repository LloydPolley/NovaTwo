"use client";

import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Carousel.module.scss";
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

  if (searchParams?.f !== "following" && !hp) {
    return null;
  }

  return (
    <div className={cx("carousel")}>
      <h1>Favourite Artists</h1>
      <div className={cx("carousel__inner")}>
        {users &&
          users?.slice(0, 11).map((user) => {
            return <UserWidget user={user} key={user?.uid} />;
          })}
      </div>
    </div>
  );
};

export default Carousel;
