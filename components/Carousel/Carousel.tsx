"use client";

import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "./Carousel.module.scss";
import TrackSquare from "../Tracks/TrackSquare";
import { getAllArtists } from "../../api/getTracks";

const cx = classNames.bind(style);

const Carousel = ({ data }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArtists = async () => {
    setLoading(true);
    const artists = await getAllArtists();
    setUsers(artists);
    setLoading(false);
  };

  useEffect(() => {
    getArtists();
  }, []);

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  if (loading) {
    return <div className={cx("loading")}>Loading</div>;
  }

  return (
    <div className={cx("carousel")}>
      {users &&
        !loading &&
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
              style={inlineStyle}
            >
              {/* <img src={user.profile} /> */}
              <p>{user.displayName}</p>
            </a>
          );
        })}
    </div>
  );
};

export default Carousel;
