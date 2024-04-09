"use client";

import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Carousel.module.scss";
import TrackSquare from "../Tracks/TrackSquare";
import { getAllArtists } from "../../api/getTracks";
import { getUserFollowers } from "../../api/addFollower";
import Link from "next/link";

const cx = classNames.bind(style);

const Carousel = ({ users, searchParams, hp }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);

  // // console.log("searchParams", searchParams);
  // // console.log("params", params);

  // const getArtists = async () => {
  //   setLoading(true);
  //   const artists = await getUserFollowers(params?.id);
  //   console.log("getArtists", artists);
  //   setUsers(artists);
  //   setLoading(false);
  // };

  if (searchParams?.f !== "following" && !hp) {
    return null;
  }

  return (
    <div className={cx("carousel-wrapper")}>
      <div className={cx("carousel")}>
        {users &&
          users?.slice(0, 11).map((user) => {
            return (
              <div className={cx("carousel__container")} key={user?.uid}>
                <Link
                  className={cx("carousel__element")}
                  href={`/${user?.uid}?f=all`}
                >
                  <img src={user.profile} />
                </Link>
                <p>{user.displayName}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
