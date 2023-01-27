import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function useAddTrack() {
  const [trackList, setTrackList] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const getTracks = async () => {
    const snapshot = await getDocs(collection(db, "tracks"));
    const arr = [];
    await snapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setTrackList(arr);
  };

  return { trackList, getTracks, audioUrl };
}
