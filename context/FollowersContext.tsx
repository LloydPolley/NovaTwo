"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { getUserFollowers } from "../api/addFollower";
import { useLoginContext } from "./LoginContext";

const initialState = {
  followers: [],
  newFollower: {},
  setNewFollower: (follower) => {},
};

const likesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FOLLOWERS":
      return { ...state, likes: action.payload };
    case "ADD_NEW_FOLLOWER":
      return { ...state, newLike: action.payload };
    default:
      return state;
  }
};

export const FollowersContext = createContext(initialState);

const FollowersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likesReducer, initialState);
  const { isLoggedIn, userData } = useLoginContext();

  const getFollowers = async () => {
    const followers = await getUserFollowers(userData?.uid);
    if (followers !== state.likes) {
      console.log("followers", followers);
      dispatch({ type: "SET_FOLLOWERS", payload: followers });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    getFollowers();
  }, [userData, state.newLike, isLoggedIn]);

  const setNewFollower = (likes) => {
    dispatch({ type: "ADD_NEW_FOLLOWER", payload: likes });
  };

  return (
    <FollowersContext.Provider
      value={{
        followers: state.likes,
        newFollower: {},
        setNewFollower,
      }}
    >
      {children}
    </FollowersContext.Provider>
  );
};

export const useFollowersContext = () => useContext(FollowersContext);

export default FollowersProvider;
