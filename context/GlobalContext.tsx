"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { auth, db } from "../utils/firebase";
import useLikesStore from "./LikesStore";
import useFollowerStore from "./FollowerStore";
import useAuthStore from "./AuthStore";
import useAudioStore from "./AudioStore";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const { userData } = useAuthStore((state) => state);
  const LikesStore = useLikesStore((state) => state);
  const FollowerStore = useFollowerStore((state) => state);
  const AuthStore = useAuthStore((state) => state);
  const { setAudioRef, audioRef, isPlaying, trackContext } = useAudioStore(
    (state) => state
  );

  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (userData) {
      LikesStore.setLikes(userData);
      FollowerStore.setFollowing(userData);
    }
  }, [userData]);

  const watchUserStatus = () => {
    return onAuthStateChanged(auth, (user) => {
      const info = user ? user?.uid : null;
      console.log("info", info);
      AuthStore.getUser(info);
    });
  };

  const watchUserStatusToken = () => {
    return onIdTokenChanged(auth, async (user) => {
      const info = user ? user?.uid : null;
      AuthStore.getUser(info);
    });
  };

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  const playContext = async (track) => {
    audioRef.current.play();
  };

  const pauseContext = async () => {
    audioRef.current.pause();
  };

  useEffect(() => {
    if (!audioRef?.current) return;
    audioRef.current.addEventListener("play", () => {
      playContext(trackContext);
    });
    audioRef.current.addEventListener("pause", () => {
      pauseContext();
    });
  }, [trackContext]);

  useEffect(() => {
    const status = watchUserStatus();
    const token = watchUserStatusToken();
    setAudioRef(audio);
    return () => {
      status();
      token();
    };
  }, []);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
