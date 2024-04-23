"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { auth, db } from "../utils/firebase";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

type User = {
  displayName?: string;
  background?: string;
  profile?: string;
  name?: string;
  email: string;
  uid: string;
};

type LoginContextProps = {
  userData: User | null;
};

const initialState = {
  userData: null,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "READ_USER":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export const LoginContext = createContext<LoginContextProps>({
  userData: null,
});

const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const readUser = async (user) => {
    const docRef = doc(db, "users", user?.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch({ type: "READ_USER", payload: docSnap.data() });
    } else {
      return null;
    }
  };

  const watchUserStatus = () => {
    return onAuthStateChanged(auth, (user) => {
      if (user && user.uid) {
        readUser(user);
      } else {
        dispatch({ type: "READ_USER", payload: null });
      }
    });
  };

  const watchUserStatusToken = () => {
    return onIdTokenChanged(auth, async (user) => {
      console.log("token change 2");
      if (!user) {
        dispatch({ type: "READ_USER", payload: null });
      } else {
        readUser(user);
      }
    });
  };

  useEffect(() => {
    const status = watchUserStatus();
    const token = watchUserStatusToken();
    return () => {
      status();
      token();
    };
  }, []);

  return (
    <LoginContext.Provider
      value={{
        userData: state.userData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);

export default LoginProvider;
