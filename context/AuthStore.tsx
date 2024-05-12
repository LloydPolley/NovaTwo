import { create } from "zustand";
import { getUserData } from "../api/getUserData";

interface AuthStore {
  userData: any;
  getUser: (like: any) => Promise<void>;
}

const useAuthStore = create<AuthStore>()((set) => ({
  userData: null,
  getUser: async (uid) => {
    const isUser = uid ? await getUserData(uid) : null;
    set(() => ({ userData: isUser }));
  },
}));

export default useAuthStore;
