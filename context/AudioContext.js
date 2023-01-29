import { createContext, useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "../utils/firebase";
import useGetTracks from "../hooks/useGetTracks";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

export const AudioContext = createContext({
  isPlaying: false,
  url: "",
  play: () => {},
  pause: () => {},
});

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState(null);
  const audioPlayer = useRef();

  const play = async (trackUrl) => {
    await setUrl(trackUrl);
    audioPlayer.current.play();
    setIsPlaying(true);
  };

  const pause = async () => {
    audioPlayer.current.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider
      value={{
        play,
        pause,
        isPlaying,
        url,
      }}
    >
      <audio ref={audioPlayer} src={url || null} />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
