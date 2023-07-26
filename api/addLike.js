import { db } from "../utils/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const addLikeList = async ({ trackId, track, userLikedUid }) => {
  try {
    const date = new Date().toLocaleString();
    await setDoc(doc(db, "likes", `${userLikedUid}-${trackId}`), {
      date,
      ...track,
      userLikedUid,
    });
  } catch (e) {
    console.log("caught", e);
    return false;
  }
};

const addLike = async ({ uid, trackId, track, userLikedUid }) => {
  const docRef = doc(db, "tracks", trackId);
  try {
    await setDoc(doc(docRef, "likes", uid), {
      like: true,
      userLikedUid,
    });
    await addLikeList({ uid, trackId, track, userLikedUid });
    toast.success(`Saved - ${track.name}`);
  } catch (e) {
    toast.error("Error");
  }
};

const deleteLike = async ({ uid, trackId }) => {
  const docRef = doc(db, "tracks", trackId);
  await deleteDoc(doc(docRef, "likes", uid));
};

const isLikedByUser = async ({ uid, trackId }) => {
  const docRef = doc(db, "tracks", trackId, "likes", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? true : false;
};

export { addLike, deleteLike, isLikedByUser };
