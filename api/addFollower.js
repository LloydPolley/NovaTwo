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

const deleteLikeTracksCollection = async ({ track, currentUser }) => {
  try {
    await deleteDoc(doc(db, "likes", `${track.trackId}-${currentUser}`));
  } catch (e) {
    return false;
  }
};

const followUser = async ({ followee, follower }) => {
  try {
    const date = new Date().toLocaleString();
    await setDoc(doc(db, "followers", `${followee?.uid}-${follower}`), {
      date,
      ...followee,
      follower,
    });
  } catch (e) {
    return false;
  }
};

const getUserFollowers = async (userId) => {
  const likesRef = collection(db, "followers");
  const querys = query(likesRef, where("follower", "==", userId));
  const querySnapshot = await getDocs(querys);

  const likesData = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    likesData.push(data);
  });

  return likesData;
};

export { followUser, getUserFollowers };
