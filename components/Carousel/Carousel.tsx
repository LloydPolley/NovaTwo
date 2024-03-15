"use client";

import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Carousel.module.scss";
import TrackSquare from "../Tracks/TrackSquare";
import { getAllArtists } from "../../api/getTracks";

const cx = classNames.bind(style);

const Carousel = ({ data }) => {
  const [users, setUsers] = useState([]);

  const getArtists = async () => {
    const artists = await getAllArtists();
    setUsers(artists);
  };

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  return (
    <div className={cx("carousel")}>
      {users &&
        users?.slice(0, 6).map((user) => {
          const inlineStyle = {
            backgroundImage: `url(${user.profile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          };
          return (
            <a
              key={user?.uid}
              className={cx("carousel__element")}
              href={`/${user?.uid}`}
            >
              <img src={user.profile} />
              <p>{user.displayName}</p>
            </a>
          );
        })}
    </div>
  );
};

export default Carousel;
