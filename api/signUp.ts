import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, updateDoc, setDoc } from "firebase/firestore";

const registerUser = async ({ email, password, displayName }) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setUserDoc({ uid: createdUser?.user?.uid, email, displayName });
  } catch (e) {
    return { ...e };
  }
};

const setUserDoc = async ({ displayName, uid, email }) => {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,
      email,
      displayName,
    });
  } catch (e) {
    return { ...e };
  }
};

const updateUserDoc = async (uid, { displayName, profile }) => {
  try {
    updateDoc(doc(db, "users", uid), {
      ...(displayName ? { displayName } : {}),
      ...(profile ? { profile } : {}),
    });
  } catch (e) {
    return { ...e };
  }
};

export { registerUser, setUserDoc, updateUserDoc };
