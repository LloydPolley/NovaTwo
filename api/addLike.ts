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
import { revalidatePath } from "next/cache";

const deleteLikeTracksCollection = async (track) => {
  try {
    await deleteDoc(doc(db, "likes", `${track.trackId}-${track.currentUser}`));
    console.log("delete");
    return true;
  } catch (e) {
    return false;
  }
};

const addLikeToCollection = async (track) => {
  try {
    const date = new Date().toLocaleString();
    await setDoc(doc(db, "likes", `${track.trackId}-${track.currentUser}`), {
      date,
      ...track,
    });
    console.log("add like");
    return true;
  } catch (e) {
    return false;
  }
};

export { addLikeToCollection, deleteLikeTracksCollection };
