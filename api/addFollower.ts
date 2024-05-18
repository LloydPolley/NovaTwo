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

const followUser = async (newFollowing) => {
  try {
    const date = new Date().toLocaleString();
    await setDoc(
      doc(db, "followers", `${newFollowing?.user}-${newFollowing?.uid}`),
      {
        date,
        ...newFollowing,
      }
    );
    return true;
  } catch (e) {
    return false;
  }
};

const getUserFollowers = async (userId) => {
  const followersRef = collection(db, "followers");
  const querys = query(followersRef, where("user", "==", userId));
  const querySnapshot = await getDocs(querys);

  const followerData = [];

  querySnapshot.forEach((doc) => {
    followerData.push(doc.data());
  });

  return followerData;
};

export { followUser, getUserFollowers };
