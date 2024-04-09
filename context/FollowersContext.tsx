"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { getUserLikes } from "../api/addLike";
import { useLoginContext } from "./LoginContext";

const initialState = {
  likes: [],
  newLike: {},
  setNewLike: (like) => {},
};

const likesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIKES":
      return { ...state, likes: action.payload };
    case "SET_NEW_LIKE":
      return { ...state, newLike: action.payload };
    default:
      return state;
  }
};

export const LikesContext = createContext(initialState);

const LikesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likesReducer, initialState);
  const { isLoggedIn, userData } = useLoginContext();

  const getLikes = async () => {
    const userLikes = await getUserLikes(userData?.uid);
    if (userLikes !== state.likes) {
      dispatch({ type: "SET_LIKES", payload: userLikes });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    getLikes();
  }, [userData, state.newLike, isLoggedIn]);

  const setNewLike = (likes) => {
    dispatch({ type: "SET_NEW_LIKE", payload: likes });
  };

  return (
    <LikesContext.Provider
      value={{
        likes: state.likes,
        newLike: {},
        setNewLike,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikesContext = () => useContext(LikesContext);

export default LikesProvider;
