import { create } from "zustand";
import {
  addLikeToCollection,
  deleteLikeTracksCollection,
  getUserLikes,
} from "../api/addLike";

interface LikesStore {
  likes: any[];
  setLikes: (userData: any) => Promise<void>;
  removeLike: (like: any) => Promise<void>;
  addLike: (like: any) => Promise<void>;
}

const useLikesStore = create<LikesStore>()((set) => ({
  likes: [],
  setLikes: async (userData) => {
    const userLikes = await getUserLikes(userData?.uid);
    if (userLikes) set(() => ({ likes: [...userLikes] }));
  },
  addLike: async (like) => {
    const success = await addLikeToCollection(like);
    if (success) set((state) => ({ likes: [...state.likes, like] }));
  },
  removeLike: async (likeToRemove) => {
    const success = await deleteLikeTracksCollection(likeToRemove);
    if (success) {
      set((state) => ({
        likes: state.likes.filter(
          (like) => like.trackId !== likeToRemove.trackId
        ),
      }));
    }
  },
}));

export default useLikesStore;
