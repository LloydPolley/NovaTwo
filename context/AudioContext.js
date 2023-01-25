import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  getDownloadURL,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export const AudioContext = createContext({
  isPlaying: false,
  audioSrc: undefined,
  setIsPlaying: () => {},
  setAudioSrc: () => {},
});

const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/novatwo-f3f41.appspot.com/o/Maceo%20Plex%2Ftracks%2Ftest?alt=media&token=0d6f84d6-1cb4-4b32-b130-d5b356d57753"
  );

  useEffect(() => {
    console.log("playing changed");
  }, [isPlaying]);

  // useEffect(() => {
  //   console.log("isPlaying", isPlaying);
  //   console.log("audioSrc", audioSrc);
  // }, [isPlaying, audioSrc]);

  return (
    <AudioContext.Provider
      value={{ isPlaying, audioSrc, setIsPlaying, setAudioSrc }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);

export default AudioProvider;
