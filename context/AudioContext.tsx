"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

export const AudioContext = createContext({
  isPlaying: false,
  setIsPlaying: () => {},
  track: {},
  playContext: (track) => {},
  pauseContext: () => {},
});

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState();

  const playContext = async (track) => {
    console.log("playing");
    await setTrack(track);
    await setIsPlaying(true);

    const myEvent = new CustomEvent("playPlayer", {
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    document.dispatchEvent(myEvent);
  };

  const pauseContext = async () => {
    await setIsPlaying(false);
    const myEvent = new CustomEvent("pausePlayer", {
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    document.dispatchEvent(myEvent);
  };

  return (
    <AudioContext.Provider
      value={{
        playContext,
        pauseContext,
        isPlaying,
        track,
        setIsPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
