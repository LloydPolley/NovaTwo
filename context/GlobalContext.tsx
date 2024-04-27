"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useLoginContext } from "./LoginContext";
import useLikesStore from "./LikesStore";
import useFollowerStore from "./FollowerStore";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const { userData } = useLoginContext();
  const LikesStore = useLikesStore((state) => state);
  const FollowerStore = useFollowerStore((state) => state);

  useEffect(() => {
    // console.log("LikesStore", LikesStore);
    console.log("FollowerStore", FollowerStore);
  }, [LikesStore]);

  useEffect(() => {
    if (userData) {
      LikesStore.setLikes(userData);
      FollowerStore.setFollowing(userData);
    }
  }, [userData]);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
