import { useEffect, useState } from "react";
import { db, storage } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDownloadURL,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function useAddTrack() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const addTrack = async ({ name, artist, fileName }) => {
    try {
      const docRef = await addDoc(collection(db, "tracks"), {
        name,
        artist,
        fileUrl: `${artist}/tracks/${fileName}`,
      });
      console.log("doc written", docRef);
    } catch (e) {
      console.log("e", e);
      return { ...e };
    }
  };

  const uploadTrack = async ({ artist, file }) => {
    const { name } = file;
    const storageRef = ref(storage, `${artist}/tracks/${name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("uploaded", snapshot);
    });
  };

  const readTracks = async () => {
    const snapshot = await getDocs(collection(db, "tracks"));
    const arr = [];
    snapshot.forEach((doc) => {
      arr.push(doc.data());
    });

    return arr;
  };

  return { addTrack, readTracks, uploadTrack };
}
