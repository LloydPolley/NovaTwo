import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import nookies from "nookies";

const getAllTracks = async () => {
  const snapshot = await getDocs(collection(db, "tracks"));
  const arr = [];
  await snapshot.forEach((doc) => {
    arr.push({ ...doc.data(), trackId: doc.id });
  });
  return arr;
};

const getAllLikedTracks = async (uid) => {
  console.log("likes");
  const arr = [];
  const q = query(collection(db, "likes"), where("currentUser", "==", uid));
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data() });
  });
  return arr;
};

const getTracksWhere = async (type, input) => {
  if (input === "recent" || undefined) {
    return getAllTracks();
  }
  const arr = [];
  const q = query(collection(db, "tracks"), where(type, "==", input));
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), trackId: doc.id });
  });
  return arr;
};

const getArtistTracks = async (input) => {
  const arr = [];
  const q = query(collection(db, "tracks"), where("uid", "==", input));
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), trackId: doc.id });
  });
  return arr;
};

export { getAllTracks, getArtistTracks, getTracksWhere, getAllLikedTracks };
