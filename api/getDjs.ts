import { db } from "../utils/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const getDj = async (input) => {
  const docRef = doc(db, "users", input);
  console.log("input", input);
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (e) {
    return e;
  }
};

export { getDj };
