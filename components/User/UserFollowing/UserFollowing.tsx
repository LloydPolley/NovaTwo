"use client";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./UserFollowing.module.scss";
import UserWidget from "../UserWidget";
import { getUserFollowers } from "../../../api/addFollower";
import useFollowerStore from "../../../context/FollowerStore";
import useAuthStore from "../../../context/AuthStore";

const cx = classNames.bind(style);

const Carousel = ({ searchParams, params }) => {
  const { following } = useFollowerStore((state) => state);
  const { userData } = useAuthStore((state) => state);
  const [users, setUsers] = useState([]);

  const fetchUserFollowers = async () => {
    const users = await getUserFollowers(params?.id);
    setUsers(users);
  };

  useEffect(() => {
    const isYou = params?.id === userData?.uid;
    if (isYou) {
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
