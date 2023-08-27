"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  onIdTokenChanged,
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
import nookies from "nookies";

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
  const [user, setUser] = useState(undefined);

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

  const updateUserDoc = async ({ displayName, name, background, profile }) => {
    try {
      console.log("trying");
      updateDoc(doc(db, "users", userInfo?.uid), {
        ...(displayName ? { displayName } : {}),
        ...(background ? { background } : {}),
        ...(profile ? { profile } : {}),
        ...(name ? { name } : {}),
        email: userInfo.email,
      });
      console.log("complete");
    } catch (e) {
      console.log("catch", e);
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
        nookies.set(undefined, "uid", user.uid, { path: "/" });
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
        setUserData(null);
        nookies.set(undefined, "uid", "", { path: "/" });
      }
    });
  };

  const watchUserStatusToken = () => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
      } else {
        const token = await user.getIdToken();
        setUser(user);
      }
    });
  };

  useEffect(() => {
    const unsub = watchUserStatus();
    return unsub;
  }, []);

  useEffect(() => {
    const un = watchUserStatusToken();
    return un;
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
