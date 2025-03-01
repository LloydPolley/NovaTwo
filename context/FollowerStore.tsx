import { create } from "zustand";
import { v4 } from "uuid";

interface LikesStore {
  followers: any[];
  setFollowers: (userData: any) => Promise<void>;
  // removeLike: (like: any, userData: any) => Promise<void>;
  addFollower: ({
    uid,
    artist,
    followingId,
  }: {
    uid: string;
    artist: string;
    followingId: string;
  }) => Promise<void>;
}

const addFollower = async ({ uid, artist, followingId }) => {
  const response = await fetch("/api/followers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: v4(),
      artist,
      uid,
      followingId,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to like song");
  return data;
};

// const removeFollower = async ({ track, userData }) => {
//   const response = await fetch("/api/likes", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       trackId: track.id,
//       uid: userData.uid,
//     }),
//   });

//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error || "Failed to like song");
//   return data;
// };

const fetchFollowers = async (uid) => {
  console.log("uid", uid);
  const response = await fetch(`/api/followers?uid=${uid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed fetching likes");
  return data;
};

const useFollowerStore = create<LikesStore>()((set) => ({
  followers: [],
  setFollowers: async (uid) => {
    const followers = await fetchFollowers(uid);
    if (followers) set(() => followers);
  },
  addFollower: async ({ uid, artist, followingId }) => {
    const follower = await addFollower({
      uid,
      artist,
      followingId,
    });
    if (follower)
      set((state) => {
        console.log("state", state);
        return { followers: [...state.followers, follower] };
      });
  },
  // removeLike: async (track, userData) => {
  //   const success = await removeFollower({ track, userData });
  //   if (success) {
  //     set((state) => ({
  //       likes: state.likes.filter((like) => like.id !== track.id),
  //     }));
  //   }
  // },
}));

export default useFollowerStore;
