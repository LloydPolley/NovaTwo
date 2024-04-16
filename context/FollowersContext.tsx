"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { getUserFollowers } from "../api/addFollower";
import { followUser } from "../api/addFollower";
import { useLoginContext } from "./LoginContext";

const initialState = {
  following: [],
  newFollowing: {},
  setNewFollowing: (following) => {},
};

const followingReducer = (state, action) => {
  switch (action.type) {
    case "SET_FOLLOWING":
      return { ...state, following: action.payload };
    case "ADD_NEW_FOLLOWING":
      return { ...state, newFollowing: action.payload };
    default:
      return state;
  }
};

export const FollowingContext = createContext(initialState);

const FollowingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(followingReducer, initialState);
  const { isLoggedIn, userData } = useLoginContext();

  const getFollowing = async () => {
    const following = await getUserFollowers(userData?.uid);
    if (following !== state.following) {
      dispatch({ type: "SET_FOLLOWING", payload: following });
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    getFollowing();
  }, [userData, state.newFollowing, isLoggedIn]);

  const setNewFollowing = async ({ user, following }) => {
    const follow = await followUser({ user, following });

    if (follow) {
      dispatch({ type: "ADD_NEW_FOLLOWING", payload: following });
    }
  };

  return (
    <FollowingContext.Provider
      value={{
        following: state.following,
        newFollowing: {},
        setNewFollowing,
      }}
    >
      {children}
    </FollowingContext.Provider>
  );
};

export const useFollowingContext = () => useContext(FollowingContext);

export default FollowingProvider;
