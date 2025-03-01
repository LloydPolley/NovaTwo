import { create } from "zustand";
import { v4 } from "uuid";

interface LikesStore {
  likes: any[];
  setLikes: (userData: any) => Promise<void>;
  removeLike: (like: any, userData: any) => Promise<void>;
  addLike: (like: any, userData: any) => Promise<void>;
}

const addLike = async ({ uid, trackId }) => {
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

const removeLike = async ({ track, userData }) => {
  const response = await fetch("/api/likes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trackId: track.id,
      uid: userData.uid,
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
  likes: null,
  setLikes: async (userData) => {
    const likes = await fetchLikes(userData?.uid);
    if (likes?.likes) set(() => ({ likes: likes?.likes }));
  },
  addLike: async (like, userData) => {
    const success = await addLike({
      uid: userData?.uid,
      trackId: like.id,
    });
    if (success)
      set((state) => {
        return { likes: [...state.likes, like] };
      });
  },
  removeLike: async (track, userData) => {
    const success = await removeLike({ track, userData });
    if (success) {
      set((state) => ({
        likes: state.likes.filter((like) => like.id !== track.id),
      }));
    }
  },
}));

export default useLikesStore;
