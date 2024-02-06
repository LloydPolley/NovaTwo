"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

export const AudioContext = createContext({
  isPlaying: false,
  setIsPlaying: () => {},
  trackContext: { url: "", audioFileLocation: "" },
  playContext: (track) => {},
  pauseContext: () => {},
});

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackContext, setTrackContext] = useState();
  const [playlist, setPlaylist] = useState([]);
  const audioRef = useRef();

  const playContext = async (track) => {
    await setTrackContext(track);
    await setIsPlaying(true);

    audioRef.current.play();
  };

  const pauseContext = async () => {
    await setIsPlaying(false);
    audioRef.current.pause();
  };

  useEffect(() => {
    if (!audioRef?.current) return;
    audioRef.current.addEventListener("play", () => {
      setIsPlaying(true);
    });
    audioRef.current.addEventListener("pause", () => {
      setIsPlaying(false);
    });
  }, [isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        playContext,
        pauseContext,
        isPlaying,
        trackContext,
        setIsPlaying,
        audioRef,
        playlist,
        setPlaylist,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
