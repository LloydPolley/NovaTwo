import { db } from "../utils/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const getDjLikes = async (input) => {
  const docRef = doc(db, "users", input);
  const snapshot = await getDocs(collection(docRef, "Likes"));
  const arr = snapshot.docs.map((doc) => doc.data());
  return arr;
};

const getDj = async (input) => {
  const docRef = doc(db, "users", input);
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    console.log("error", e);
  }
};

export { getDj, getDjLikes };
