import { create } from "zustand";
import {
  addLikeToCollection,
  deleteLikeTracksCollection,
} from "../api/addLike";
import getUserLikes from "../api/likes/getUserLikes";
import { v4 } from "uuid";

interface LikesStore {
  likes: any[];
  setLikes: (userData: any) => Promise<void>;
  removeLike: (like: any) => Promise<void>;
  addLike: (like: any, userData: any) => Promise<void>;
}

const addLikeNeon = async ({ uid, trackId }) => {
  const response = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: v4(),
      uid,
      trackId,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to like song");
  return data;
};

const fetchLikes = async (uid) => {
  const response = await fetch(`/api/likes?uid=${uid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed fetching likes");
  return data;
};

const useLikesStore = create<LikesStore>()((set) => ({
  likes: [],
  setLikes: async (userData) => {
    const allUserLikes = await fetchLikes(userData?.uid);
    console.log("allUserLikes", allUserLikes);
    if (allUserLikes?.likes) set(() => ({ likes: [allUserLikes?.likes] }));
  },
  addLike: async (like, userData) => {
    const success = await addLikeNeon({
      uid: userData?.uid,
      trackId: like.id,
    });

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
