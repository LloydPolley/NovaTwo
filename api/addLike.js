import { db } from "../utils/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const deleteLikeTracksCollection = async ({ trackId, track, currentUser }) => {
  try {
    await deleteDoc(doc(db, "likes", `${currentUser}-${trackId}`));
  } catch (e) {
    console.log("caught", e);
    return false;
  }
};

const deleteLikeFromTracks = async ({ uid, trackId, currentUser }) => {
  const docRef = doc(db, "tracks", trackId);
  await deleteDoc(doc(docRef, "likes", currentUser));
  await deleteLikeTracksCollection({ uid, trackId, currentUser });
  return false;
};

const addLikeTracksCollection = async ({ trackId, track, currentUser }) => {
  try {
    const date = new Date().toLocaleString();
    await setDoc(doc(db, "likes", `${currentUser}-${trackId}`), {
      date,
      ...track,
      currentUser,
    });
  } catch (e) {
    console.log("caught", e);
    return false;
  }
};

const addLikeToTracks = async ({ uid, trackId, track, currentUser }) => {
  const docRef = doc(db, "tracks", trackId);
  try {
    await setDoc(doc(docRef, "likes", currentUser), {
      like: true,
      currentUser,
    });
    await addLikeTracksCollection({ uid, trackId, track, currentUser });
    toast.success(`Saved - ${track.name}`);
    return true;
  } catch (e) {
    toast.error("Error");
  }
};

const isLikedByUser = async ({ currentUser, trackId }) => {
  const docRef = doc(db, "tracks", trackId, "likes", currentUser);
  const docSnap = await getDoc(docRef);
  // console.log("docsnap", docSnap.data());
  return docSnap.exists() ? true : false;
};

export { addLikeToTracks, deleteLikeFromTracks, isLikedByUser };
