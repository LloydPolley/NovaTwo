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

const AudioProvider = ({ children, player }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState(null);
  const [name, setName] = useState("");
  const audioPlayer = useRef();

  const playTrack = async ({ url, name }) => {
    console.log("playing");
    await setUrl(url);
    await setIsPlaying(true);
    await setName(name);
    const myEvent = new CustomEvent("playPlayer", {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    document.dispatchEvent(myEvent);
  };

  const pause = async () => {
    await setIsPlaying(false);
    const myEvent = new CustomEvent("pausePlayer", {
      detail: {},
      bubbles: true,
      cancelable: true,
      composed: false,
    });
    document.dispatchEvent(myEvent);
    console.log("my event", myEvent);
  };

  const pauseFunc = (player) => {
    player.current.audio.current.pause();
  };

  return (
    <AudioContext.Provider
      value={{
        playTrack,
        pause,
        isPlaying,
        url,
        name,
        pauseFunc,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (test) => useContext(AudioContext);

export default AudioProvider;
