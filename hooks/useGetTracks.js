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
  const [trackList, setTrackList] = useState(null);

  const getTracks = async () => {
    const snapshot = await getDocs(collection(db, "tracks"));
    const arr = [];
    await snapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setTrackList(arr);
  };

  const downloadTrack = async (file) => {
    const storageRef = ref(
      storage,
      `tracks/Kevin de Vries - Dance With Me.m4a`
    );

    getDownloadURL(
      ref(storageRef, "`tracks/Kevin de Vries - Dance With Me.m4a`")
    )
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        // Handle any errors
        console.log("eorror");
      });

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("uploaded", snapshot);
    });
  };

  return { trackList, getTracks };
}
