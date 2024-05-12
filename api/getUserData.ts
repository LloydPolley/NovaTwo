import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
};
