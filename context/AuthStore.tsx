import { create } from "zustand";

interface AuthStore {
  userData: any;
  getUser: (like: any) => Promise<void>;
}

const getUser = async (uid) => {
  const response = await fetch(`/api/users?uid=${uid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed fetching likes");
  return data;
};

const useAuthStore = create<AuthStore>()((set) => ({
  userData: null,
  getUser: async (uid) => {
    const { user } = await getUser(uid);
    set(() => ({ userData: user }));
  },
}));

export default useAuthStore;
