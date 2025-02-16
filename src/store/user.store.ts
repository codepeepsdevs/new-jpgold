import { User } from "@/api/type";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface States {
  user: User | null;
}

interface Actions {
  setUser: (user: User | null) => void;
}

const useUserStore = create(
  persist<States & Actions>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
