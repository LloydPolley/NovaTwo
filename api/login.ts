import { auth, db } from "../utils/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    return { ...e };
  }
};

const signOutUser = () => {
  try {
    signOut(auth);
  } catch (e) {
    return { ...e };
  }
};

export { signOutUser, signIn };
