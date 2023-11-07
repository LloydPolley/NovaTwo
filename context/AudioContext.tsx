"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

export const AudioContext = createContext({
  isPlaying: false,
  url: "",
  name: "",
  playTrack: ({ url, name }) => {},
  pause: () => {},
});

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState(null);
  const [name, setName] = useState("");

  const playTrack = async ({ url, name }) => {
    await setUrl(url);
    await setIsPlaying(true);
    await setName(name);
    const myEvent = new CustomEvent("playPlayer", {
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    document.dispatchEvent(myEvent);
  };

  const pause = async () => {
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
        playTrack,
        pause,
        isPlaying,
        url,
        name,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
