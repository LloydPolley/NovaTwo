"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./UserFollowing.module.scss";
import UserWidget from "../UserWidget";
import { useFollowingContext } from "../../context/FollowersContext";
import { useLoginContext } from "../../context/LoginContext";
import { getUserFollowers } from "../../api/addFollower";

const cx = classNames.bind(style);

const Carousel = ({ searchParams, params }) => {
  const { following } = useFollowingContext();
  const { userData } = useLoginContext();
  const [users, setUsers] = useState([]);

  const fetchUserFollowers = async () => {
    const users = await getUserFollowers(params?.id);
    setUsers(users);
  };

  useEffect(() => {
    const isYou = params?.id === userData?.uid;
    if (isYou) {
      console.log("isyou", isYou);
      setUsers(following);
      return;
    }
    fetchUserFollowers();
  }, []);

  if (searchParams?.f !== "following") {
    return null;
  }

  return (
    <div className={cx("following")}>
      {users &&
        users?.map((user) => {
          return <UserWidget item={user} key={user?.uid} />;
        })}
    </div>
  );
};

export default Carousel;
