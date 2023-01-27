import { createContext, useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "../utils/firebase";
import useGetTracks from "../hooks/useGetTracks";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

export const AudioContext = createContext({
  isPlaying: false,
  audioSrc: undefined,
  setIsPlaying: () => {},
  setAudioSrc: () => {},
  audioToggle: () => {},
  play: () => {},
  fetchAudio: () => {},
});

const AudioProvider = ({ children }) => {
  const { audioUrl } = useGetTracks();

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/novatwo-f3f41.appspot.com/o/Innellea%2Ftracks%2FInnellea%20-%20Forced%20Adaptation.mp3?alt=media&token=0cdd4d23-ad97-4d2d-bf22-8da84ca16b14"
  );

  const musicPlayers =
    typeof Audio !== "undefined" ? new Audio(audioSrc) : undefined;
  const { current } = useRef(musicPlayers);

  useEffect(() => {
    console.log("playing changed");
  }, [isPlaying]);

  const audioToggle = () => {
    if (isPlaying) {
      current?.pause();
    } else {
      current?.play();
      console.log("play");
    }

    setIsPlaying(!isPlaying);
  };

  const play = async () => {
    if (isPlaying) {
      current?.pause();
    } else {
      current?.play();
      console.log("play");
    }

    setIsPlaying(!isPlaying);
  };

  const fetchAudio = async (urls) => {
    try {
      const storage = await getStorage();
      await getDownloadURL(ref(storage, urls)).then((url) => {
        console.log("url", url);
        setAudioSrc(url);
      });
    } catch (e) {
      // console.log("e", e);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        current,
        isPlaying,
        audioSrc,
        audioToggle,
        play,
        setIsPlaying,
        setAudioSrc,
        fetchAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
