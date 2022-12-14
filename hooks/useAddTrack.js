import { useEffect, useState } from "react";
import { db, storage } from "../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function useSignIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const addUser = async (trackName, artistName, trackUrl) => {
    try {
      const docRef = await addDoc(collection(db, "tracks"), {
        trackName,
        artistName,
        trackUrl,
      });
      console.log("doc written", docRef);
    } catch (e) {
      console.log("e", e);
      return { ...e };
    }
  };

  const uploadTrack = async (file) => {
    const storageRef = ref(storage, "tracks/test");

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("uploaded", snapshot);
    });
  };

  const readUser = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    snapshot.forEach((doc) => {
      console.log("data", doc.data());
    });
  };

  return { addUser, readUser, uploadTrack };
}
