import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { isTokenExpired } from "@/utils/tokenChecker";
import { User } from "@/constants/types";

interface States {
  user: User | null;
  isInitialized: boolean;
  isLoggedIn: boolean;
  anonymous: boolean;
}

interface Actions {
  setUser: (user: User | null) => void;
  initializeAuth: (user: User | null) => void;
  checkToken: () => Promise<boolean>;
  setIsLoggedIn: (state: boolean) => void;
  setAnonymous: (state: boolean) => void;
}

const useUserStore = create(
  persist<States & Actions>(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isInitialized: false,
      anonymous: false,
      setUser: (user: User | null) => set({ user }),
      setInitialized: (initialized: boolean) =>
        set({ isInitialized: initialized }),
      setAnonymous: (state: boolean) => set({ anonymous: state }),
      setIsLoggedIn: (state: boolean) => set({ isLoggedIn: state }),
      initializeAuth: async (user: User | null) => {
        const token = Cookies.get("accessToken");
        if (token && user) {
          const isValid = await get().checkToken();
          if (isValid) {
            set({ user, isLoggedIn: true, isInitialized: true });
          } else {
            set({ user: null, isLoggedIn: false, isInitialized: true });
          }
        } else {
          set({ user: null, isLoggedIn: false, isInitialized: true });
        }
      },

      checkToken: async () => {
        const token = Cookies.get("accessToken");

        if (!token) {
          set({ isLoggedIn: false });
          return false;
        }

        try {
          const tokenExpired = isTokenExpired(token);

          if (tokenExpired) {
            Cookies.remove("accessToken");
            set({ isLoggedIn: false, user: null });
            return false;
          } else {
            set({ isLoggedIn: true });
            return true;
          }
        } catch (error) {
          console.error("Error checking token:", error);
          set({ isLoggedIn: false, user: null });
          return false;
        }
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
