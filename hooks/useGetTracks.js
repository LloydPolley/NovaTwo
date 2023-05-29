import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function useGetTracks() {
  const [trackList, setTrackList] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const getAllTracks = async () => {
    const snapshot = await getDocs(collection(db, "tracks"));
    const arr = [];
    await snapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    return arr;
  };

  const getArtistTracks = async (input) => {
    const { queryKey } = input;
    const arr = [];
    const q = query(
      collection(db, "tracks"),
      where("uid", "==", queryKey[1].toString())
    );
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    return arr;
  };

  return { getAllTracks, getArtistTracks, audioUrl };
}
