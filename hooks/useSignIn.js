"use client";

import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

export default function useSignIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signIn = (email, password) => {
    try {
      console.log("trying");
      signInWithEmailAndPassword(auth, email, password);
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

  const updateUserProfile = (displayName, photoURL) => {
    try {
      updateProfile(auth.currentUser, {
        ...(displayName ? { displayName } : {}),
        ...(photoURL ? { photoURL } : {}),
      });
    } catch (error) {
      return { ...error };
    }
  };

  const watchUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserInfo(user);
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    });
  };

  useEffect(() => {
    watchUserStatus();
  }, []);

  return {
    registerUser,
    signIn,
    signOutUser,
    updateUserProfile,
    isLoggedIn,
    userInfo,
  };
}
