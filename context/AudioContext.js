"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "../utils/firebase";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

export const AudioContext = createContext({
  isPlaying: false,
  url: "",
  playTrack: () => {},
  pause: () => {},
});

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState(null);
  const audioPlayer = useRef();

  useEffect(() => {
    console.log("is playing updated", isPlaying);
  }, [isPlaying]);

  const playTrack = async (trackUrl) => {
    await setUrl(trackUrl);
    // audioPlayer.current.play();
    setIsPlaying(true);
  };

  const pause = async () => {
    // audioPlayer.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider
      value={{
        playTrack,
        pause,
        isPlaying,
        url,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
