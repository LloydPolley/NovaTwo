"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { getUserLikes } from "../api/addLike";
import { useLoginContext } from "./LoginContext";

export const LikesContext = createContext({
  likes: [],
  setLocalLikes: (like) => {},
});

const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);
  const [localLikes, setLocalLikes] = useState({});
  const { isLoggedIn, userData } = useLoginContext();

  const getLikes = async () => {
    const userLikes = await getUserLikes(userData?.uid);
    if (userLikes !== likes) {
      setLikes(userLikes);
      return;
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    getLikes();
  }, [userData, localLikes]);

  return (
    <LikesContext.Provider
      value={{
        likes,
        setLocalLikes,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikesContext = () => useContext(LikesContext);

export default LikesProvider;
