import { db } from "../utils/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const deleteLikeTracksCollection = async (track) => {
  try {
    await deleteDoc(doc(db, "likes", `${track.trackId}-${track.currentUser}`));
    return true;
  } catch (e) {
    return false;
  }
};

const addLikeToCollection = async (track) => {
  console.log("track", track);
  try {
    const date = new Date().toLocaleString();
    await setDoc(doc(db, "likes", `${track.trackId}-${track.currentUser}`), {
      date,
      ...track,
    });
    return true;
  } catch (e) {
    return false;
  }
};

const getUserLikes = async (userId) => {
  const likesRef = collection(db, "likes");
  const querys = query(likesRef, where("currentUser", "==", userId));
  const querySnapshot = await getDocs(querys);

  const likesData = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    likesData.push(data);
  });

  return likesData;
};

export { addLikeToCollection, getUserLikes, deleteLikeTracksCollection };
