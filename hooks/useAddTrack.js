import { useEffect, useState } from "react";
import { db, storage } from "../utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytes,
  getBlob,
} from "firebase/storage";

export default function useAddTrack() {
  const [audioSrc, setAudioSrc] = useState(undefined);

  const addTrack = async ({
    name,
    artist,
    trackName,
    audioFileLocation,
    artworkFileLocation,
    label,
    uid,
  }) => {
    console.log("audio src", audioSrc);
    try {
      const date = new Date().toLocaleString();

      const docRef = await addDoc(collection(db, "tracks"), {
        name,
        artist,
        trackName,
        audioFileLocation,
        artworkFileLocation,
        date,
        uid,
        label,
      });
    } catch (e) {
      console.log("e", e);
      return { ...e };
    }
  };

  const uploadFile = async ({ type = "audio", artist, file, trackName }) => {
    console.log(`upload ${type} -----`);

    const { name } = file;
    const storageRef = ref(
      storage,
      `${artist}/tracks/${trackName}/${type}/${name}`
    );

    const snapShot = await uploadBytes(storageRef, file);
    console.log("snap", snapShot);
  };

  const uploadImg = async ({ artist, file }) => {
    console.log(`upload -----`, artist, file);

    const { name } = file;
    const storageRef = ref(storage, `${artist}/profile/${name}`);

    const snapShot = await uploadBytes(storageRef, file);
    console.log("snap____------_____---", snapShot);
  };

  const fetchFile = async (audioUrl) => {
    try {
      console.log("passed in ", audioUrl);
      const storage = await getStorage();
      const url = await getDownloadURL(ref(storage, audioUrl));
      return url;
    } catch (e) {
      console.log("fetch audio error", e);
    }
  };

  const readTracks = async () => {
    const snapshot = await getDocs(collection(db, "tracks"));
    const arr = [];
    snapshot.forEach((doc) => {
      arr.push(doc.data());
    });

    return arr;
  };

  return { addTrack, readTracks, uploadFile, fetchFile, uploadImg };
}
