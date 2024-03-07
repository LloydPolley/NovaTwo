"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { getUserLikes } from "../api/addLike";
import { useLoginContext } from "./LoginContext";

export const LikesContext = createContext({
  likes: [],
});

const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);
  const { isLoggedIn, userData } = useLoginContext();

  const getLikes = async () => {
    const userLikes = await getUserLikes(userData?.uid);
    setLikes(userLikes);
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    getLikes();
  }, [userData]);

  return (
    <LikesContext.Provider
      value={{
        likes,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikesContext = () => useContext(LikesContext);

export default LikesProvider;
