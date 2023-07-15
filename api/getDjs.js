import { db } from "../utils/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const getDjs = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  const arr = [];
  await snapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  setDjList(arr);
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

export { getDjs, getDj };
