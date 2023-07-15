import { useEffect, useState } from "react";
import { db, storage } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  getDownloadURL,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function useDjs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [djList, setDjList] = useState(null);

  const getDjs = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const arr = [];
    await snapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setDjList(arr);
  };

  const getDj = async (input) => {
    const { queryKey } = input;
    const docRef = doc(db, "users", queryKey[1]);
    try {
      const docSnap = await getDoc(docRef);
      return docSnap.data();
    } catch (e) {
      console.log("error", e);
    }
  };

  return { getDjs, getDj };
}
