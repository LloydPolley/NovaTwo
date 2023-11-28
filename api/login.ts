import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

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
  } catch (error) {
    return { ...error };
  }
};

export { signOutUser, signIn };
