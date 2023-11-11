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

  const playContext = async (track) => {
    console.log("playing");
    await setTrackContext(track);
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
        trackContext,
        setIsPlaying,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
