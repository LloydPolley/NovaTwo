import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const getAllTracks = async () => {
  const snapshot = await getDocs(collection(db, "tracks"));
  const arr = [];
  await snapshot.forEach((doc) => {
    arr.push({ ...doc.data(), trackId: doc.id });
  });
  return arr;
};

const getAllLikedTracks = async (uid) => {
  const arr = [];
  const q = query(collection(db, "likes"), where("userLikedUid", "==", uid));
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), trackId: doc.id });
  });
  return arr;
};

const getTracksWhere = async (type, input) => {
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
