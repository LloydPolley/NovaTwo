"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";
import nookies from "nookies";

type User = {
  displayName?: string;
  background?: string;
  profile?: string;
  name?: string;
  email: string;
  uid: string;
};

type LoginContextProps = {
  readUser: (user: User | null) => Promise<void>;
  isLoggedIn: boolean;
  userData: User | null;
};

export const LoginContext = createContext<LoginContextProps>({
  readUser: async () => {},
  isLoggedIn: false,
  userData: null,
});

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(undefined);

  const readUser = async (user) => {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const watchUserStatus = () => {
    return onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        setIsLoggedIn(true);
        readUser(user);
        nookies.set(undefined, "uid", user.uid, { path: "/" });
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        nookies.set(undefined, "uid", "", { path: "/" });
      }
    });
  };

  const watchUserStatusToken = () => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUserData(null);
      } else {
        setUserData(user);
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

  console.log("user data", userData);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        userData,
        readUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);

export default LoginProvider;
