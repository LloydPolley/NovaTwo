import { create } from "zustand";
import {
  addLikeToCollection,
  deleteLikeTracksCollection,
  getUserLikes,
} from "../api/addLike";
import { getUserFollowers } from "../api/addFollower";
import { followUser } from "../api/addFollower";

interface FollowerStore {
  following: any[];
  setNewFollowing: (like: any) => Promise<void>;
  setFollowing: (following: any) => Promise<void>;
}

const useFollowerStore = create<FollowerStore>()((set) => ({
  following: [],
  setFollowing: async (userData) => {
    console.log("setFollowing", userData);
    const userFollowing = await getUserFollowers(userData?.uid);
    console.log("userFollowing", userFollowing);
    if (userFollowing) set(() => ({ following: [...userFollowing] }));
  },
  setNewFollowing: async (newFollowing) => {
    const follow = await followUser(newFollowing);
    if (follow)
      set((state) => ({ following: [...state.following, newFollowing] }));
  },
}));

export default useFollowerStore;
