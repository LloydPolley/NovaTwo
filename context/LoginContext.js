import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  getDownloadURL,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export const LoginContext = createContext({
  registerUser: () => {},
  signIn: () => {},
  signOutUser: () => {},
  setAndUpdateUserDoc: () => {},
  readUser: () => {},
  isLoggedIn: false,
  userInfo: undefined,
  userData: undefined,
});

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  const [userData, setUserData] = useState(undefined);

  const setUserDoc = async ({ name, displayName, photoURL }) => {
    const { uid, email } = userInfo;
    console.log("set user", userInfo?.uid);
    try {
      const d = await setDoc(doc(db, "users", userInfo?.uid), {
        uid,
        email,
        ...(displayName ? { displayName } : {}),
        ...(photoURL ? { photoURL } : {}),
        ...(name ? { name } : {}),
      });
    } catch (e) {
      return { ...e };
    }
  };

  const registerUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      return { ...e };
    }
  };

  const signIn = (email, password) => {
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("catch");
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

  const updateUserDoc = async ({ displayName, photoURL, name }) => {
    try {
      updateDoc(doc(db, "users", userInfo?.uid), {
        ...(displayName ? { displayName } : {}),
        ...(photoURL ? { photoURL } : {}),
        ...(name ? { name } : {}),
        email: userInfo.email,
      });
    } catch (e) {
      return { ...e };
    }
  };

  const readUser = async (user) => {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const setAndUpdateUserDoc = (props) => {
    console.log("set and update", userData);
    if (!userData) {
      setUserDoc({ ...props });
    } else {
      updateUserDoc({ ...props });
    }
  };

  const watchUserStatus = () => {
    return onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        setIsLoggedIn(true);
        setUserInfo(user);
        readUser(user);
        console.log("user", user);
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    });
  };

  useEffect(() => {
    const unsub = watchUserStatus();
    return unsub;
  }, []);

  return (
    <LoginContext.Provider
      value={{
        registerUser,
        signIn,
        signOutUser,
        setAndUpdateUserDoc,
        isLoggedIn,
        userInfo,
        userData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);

export default LoginProvider;
