import { create } from "zustand";

interface States {
  authEmail: string;
}

interface Actions {
  setAuthEmail: (email: string) => void;
}

const useAuthEmailStore = create<States & Actions>()((set) => ({
  authEmail: "",
  setAuthEmail: (authEmail: string) => {
    set({ authEmail });
  },
}));

export default useAuthEmailStore;
