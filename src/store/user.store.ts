import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface States {
  user: IUser | null;
}

interface Actions {
  setUser: (user: IUser | null) => void;
}

const useUserStore = create(
  persist<States & Actions>(
    (set) => ({
      user: null,
      setUser: (user: IUser | null) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
