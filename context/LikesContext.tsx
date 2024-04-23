"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { getUserLikes } from "../api/addLike";
import { useLoginContext } from "./LoginContext";
import {
  addLikeToCollection,
  deleteLikeTracksCollection,
} from "../api/addLike";

const initialState = {
  likes: [],
  newLike: {},
  addLike: (like) => {},
  removeLike: (like) => {},
};

const likesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIKES":
      return { ...state, likes: action.payload };
    case "ADD_LIKE":
      return { ...state, newLike: action.payload };
    case "REMOVE_LIKE":
      return { ...state, newLike: action.payload };
    default:
      return state;
  }
};

export const LikesContext = createContext(initialState);

const LikesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likesReducer, initialState);
  const { userData } = useLoginContext();

  const getLikes = async () => {
    const userLikes = await getUserLikes(userData?.uid);
    if (userLikes !== state.likes) {
      dispatch({ type: "SET_LIKES", payload: userLikes });
    }
  };

  useEffect(() => {
    if (userData === null) return;
    getLikes();
  }, [userData, state.newLike, !userData]);

  const addLike = async (track) => {
    const success = await addLikeToCollection(track);
    if (success) dispatch({ type: "ADD_LIKE", payload: track });
  };

  const removeLike = async (track) => {
    const success = await deleteLikeTracksCollection(track);
    if (success) dispatch({ type: "REMOVE_LIKE", payload: track });
  };

  return (
    <LikesContext.Provider
      value={{
        likes: state.likes,
        newLike: {},
        addLike,
        removeLike,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikesContext = () => useContext(LikesContext);

export default LikesProvider;
