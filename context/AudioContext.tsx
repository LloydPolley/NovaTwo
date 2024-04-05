"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

export const AudioContext = createContext({
  isPlaying: false,
  trackContext: {
    url: "",
    audioFileLocation: "",
    artworkFileLocation: "",
    artwork: "",
    name: "",
    artist: "",
  },
  playContext: (track) => {},
  pauseContext: () => {},
  audioRef: { current: { play: () => {}, pause: () => {} } },
});

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackContext, setTrackContext] = useState<any>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        audioRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
